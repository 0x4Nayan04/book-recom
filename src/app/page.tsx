'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/footer';
import type { Book } from '@/types';

function ensureHttps(url: string): string {
  if (!url) return '';
  return url.replace(/^http:/, 'https:');
}

export default function Page() {
  const [prompt, setPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setBooks([]);
    setSubmittedPrompt(prompt);

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get recommendations');
      }

      if (!data.books || data.books.length === 0) {
        throw new Error('No books found matching your criteria');
      }

      // Ensure all image URLs use HTTPS
      const secureBooks = data.books.map((book: Book) => ({
        ...book,
        cover: ensureHttps(book.cover),
      }));

      setBooks(secureBooks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setBooks([]);
    setSubmittedPrompt('');
    setPrompt('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      <main className="container mx-auto px-4 py-16 sm:py-24 flex-grow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <BookOpen className="h-16 w-16 text-primary" />
          </motion.div>
          <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground">
            RecomBooks
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto mt-6 max-w-xl text-xl text-primary/80 leading-relaxed tracking-wide"
          >
            Smart Book Recommendations for Every Reader
          </motion.p>
        </motion.div>

        {/* Search Form */}
        {!books.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl group-hover:blur-2xl transition-all opacity-20"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/60" />
                  <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Search for books or genres you love..."
                    className="w-full pl-12 pr-4 py-6 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent text-lg shadow-lg transition-shadow hover:shadow-xl"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading || !prompt.trim()}
                size="lg"
                className="w-full py-6 text-lg font-medium"
              >
                {loading ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
                    Finding Books...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Get Recommendations
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        )}

        {/* Error Message */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 p-4 bg-destructive/10 text-destructive rounded-lg max-w-2xl mx-auto text-center"
            >
              <p>{error}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetSearch}
                className="mt-2"
              >
                Try Again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence mode="wait">
          {books.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Submitted Prompt Display */}
              <div className="mt-8 text-center max-w-2xl mx-auto">
                <div className="bg-primary/5 rounded-lg p-6">
                  <h2 className="text-lg font-medium text-primary mb-2">
                    Your Request:
                  </h2>
                  <p className="text-muted-foreground">{submittedPrompt}</p>
                  <div className="mt-6">
                    <Button
                      variant="default"
                      size="lg"
                      onClick={resetSearch}
                      className="group relative overflow-hidden w-full sm:w-auto px-8 py-6 rounded-xl bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shine" />
                      <div className="absolute inset-0 rounded-xl bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      <div className="relative flex items-center justify-center gap-3">
                        <Search className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-lg font-medium">
                          Start New Search
                        </span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Book Grid */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {books.map((book, index) => (
                  <motion.div
                    key={`${book.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-card rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="aspect-[3/4] relative overflow-hidden">
                      {book.cover ? (
                        <div className="relative w-full h-full">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                            loading={index < 3 ? 'eager' : 'lazy'}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-muted-foreground/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-xl text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {book.title}
                        </h3>
                        {book.rating > 0 && (
                          <div className="flex items-center space-x-1 shrink-0">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium text-muted-foreground">
                              {book.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-primary/80 mb-2">{book.author}</p>
                      {book.ratingsCount > 0 && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {book.ratingsCount.toLocaleString()} ratings
                        </p>
                      )}
                      <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-4">
                        {book.description}
                      </p>
                      <div className="space-y-2">
                        <a
                          href={book.bestPrice?.link || book.buyingLinks.amazon}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Buy from {book.bestPrice?.store || 'Amazon'}
                        </a>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <a
                            href={book.buyingLinks.barnesNoble}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            Barnes & Noble
                          </a>
                          <a
                            href={book.buyingLinks.bookshop}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            Bookshop.org
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
