import { NextResponse } from 'next/server';
import axios from 'axios';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function getBookRecommendations(prompt: string): Promise<string[]> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not defined in environment variables');
    }

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
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
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
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error?.message || error.message;
      throw new Error(`Gemini API error: ${error.response?.status} ${errorMessage}`);
    }
    throw error;
  }
}

async function getBookDetails(title: string) {
  try {
    if (!process.env.GOOGLE_BOOKS_API_KEY) {
      throw new Error('GOOGLE_BOOKS_API_KEY is not defined in environment variables');
    }

    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        title
      )}&orderBy=relevance&maxResults=1&key=${process.env.GOOGLE_BOOKS_API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.data?.items?.[0]) {
      console.warn(`No results found for book: ${title}`);
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
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching details for book ${title}: ${error.response?.status} ${error.response?.statusText || error.message}`);
    } else {
      console.error(`Error fetching details for book: ${title}`, error);
    }
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: 'Please provide a search query' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.GEMINI_API_KEY || !process.env.GOOGLE_BOOKS_API_KEY) {
      return NextResponse.json(
        { error: 'API configuration missing. Check environment variables.' },
        { status: 500 }
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
    return NextResponse.json(
      { error: `Failed to get recommendations: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
