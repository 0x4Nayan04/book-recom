import { NextResponse } from 'next/server';
import axios from 'axios';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

async function getBookRecommendations(prompt: string): Promise<string[]> {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are a book recommendation expert. Based on these preferences, recommend exactly 3 bestselling and highly-rated books (4+ stars on Goodreads). Return ONLY the book titles in a simple array format like this: ["Title 1", "Title 2", "Title 3"]. NO other text or explanation. Here are the preferences: ${prompt}`,
              },
            ],
          },
        ],
      }
    );

    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response from Gemini API');
    }

    const text = response.data.candidates[0].content.parts[0].text.trim();

    // Try to extract titles using various methods
    try {
      // Try direct JSON parsing
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        return parsed.slice(0, 3);
      }
    } catch (e) {
      // If JSON parsing fails, try to extract quoted strings
      const titles = text.match(/"([^"]+)"/g);
      if (titles && titles.length > 0) {
        return titles
          .map((title: string) => title.replace(/"/g, ''))
          .filter(Boolean)
          .slice(0, 3);
      }

      // If that fails too, split by newlines and clean up
      const lines = text
        .split(/\n/)
        .map((line: string) => line.trim())
        .filter((line: string) => line.length > 0)
        .map((line: string) => line.replace(/^\d+\.\s*/, ''))
        .map((line: string) => line.replace(/^["']|["']$/g, ''))
        .filter(Boolean)
        .slice(0, 3);

      if (lines.length > 0) {
        return lines;
      }
    }

    throw new Error('Could not parse book recommendations');
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
}

async function getBookDetails(title: string) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        title
      )}&orderBy=relevance&maxResults=1&key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );

    if (!response.data?.items?.[0]) {
      return null;
    }

    const book = response.data.items[0];
    const volumeInfo = book.volumeInfo || {};
    const saleInfo = book.saleInfo || {};

    // Ensure HTTPS for cover image
    let coverUrl = '';
    if (volumeInfo.imageLinks?.thumbnail) {
      coverUrl = volumeInfo.imageLinks.thumbnail.replace(/^http:/, 'https:');
    }

    // Generate store links
    const searchQuery = encodeURIComponent(
      `${title} ${volumeInfo.authors?.[0] || ''}`
    );
    const buyingLinks = {
      amazon: `https://www.amazon.com/s?k=${searchQuery}`,
      barnesNoble: `https://www.barnesandnoble.com/s/${encodeURIComponent(
        title
      )}`,
      bookshop: `https://bookshop.org/search?keywords=${encodeURIComponent(
        title
      )}`,
    };

    return {
      id: book.id,
      title: volumeInfo.title || title,
      author: volumeInfo.authors?.[0] || 'Unknown Author',
      cover: coverUrl,
      description: volumeInfo.description || '',
      rating: volumeInfo.averageRating || 0,
      ratingsCount: volumeInfo.ratingsCount || 0,
      buyingLinks,
      price: {
        amount: saleInfo.retailPrice?.amount || 0,
        currency: saleInfo.retailPrice?.currencyCode || 'USD',
      },
      bestPrice: {
        store: 'Amazon',
        amount: 0,
        currency: 'USD',
        link: buyingLinks.amazon,
      },
    };
  } catch (error) {
    console.error(`Error fetching details for book: ${title}`, error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Please provide a valid search prompt' },
        { status: 400 }
      );
    }

    // Get book recommendations
    const titles = await getBookRecommendations(prompt);

    if (!titles || titles.length === 0) {
      return NextResponse.json(
        { error: 'No book recommendations found' },
        { status: 404 }
      );
    }

    // Get details for each book
    const detailsPromises = titles.map((title) => getBookDetails(title));
    const booksWithDetails = await Promise.all(detailsPromises);
    const validBooks = booksWithDetails.filter(Boolean);

    if (validBooks.length === 0) {
      return NextResponse.json(
        { error: 'Could not find details for any of the recommended books' },
        { status: 404 }
      );
    }

    return NextResponse.json({ books: validBooks });
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
