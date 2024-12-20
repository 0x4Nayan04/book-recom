# RecomBooks - AI-Powered Book Recommendations

## Overview

RecomBooks is an intelligent book recommendation platform that leverages the power of Google's Gemini AI and Google Books API to provide personalized book suggestions. Built with Next.js 14 and React, it offers a modern, responsive, and intuitive user experience for book discovery.

## Key Features

- **AI-Powered Recommendations:** Utilizes Google Gemini AI for intelligent book suggestions based on user preferences
- **Real-time Book Data:** Integration with Google Books API for accurate and up-to-date book information
- **Price Comparison:** Automatically compares prices across major book retailers
- **Responsive Design:** Seamless experience across all devices with a modern, animated interface
- **Smart Search:** Natural language processing for better understanding of user preferences
- **Multiple Buying Options:** Links to various book retailers including Amazon, Barnes & Noble, and Bookshop.org

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript
- **Styling:** Tailwind CSS, Framer Motion for animations
- **APIs:** Google Gemini AI, Google Books API
- **UI Components:** Custom components with Radix UI primitives
- **Fonts:** Playfair Display, Inter, Geist Sans

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/0x4Nayan04/book-recom
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:

   ```plaintext
   GEMINI_API_KEY=your_gemini_api_key
   GOOGLE_BOOKS_API_KEY=your_google_books_api_key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

```
src/
├── app/           # Next.js app directory
│   ├── api/      # API routes
│   ├── components/ # React components
│   └── lib/      # Utility functions
├── types/         # TypeScript type definitions
└── styles/        # Global styles
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- [Google Books API](https://developers.google.com/books)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
