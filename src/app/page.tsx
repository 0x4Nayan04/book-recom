'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Star, ShoppingCart } from 'lucide-react';
import { Button as MovingButton } from '@/components/ui/moving-border';
import Footer from '@/components/footer';
import type { Book } from '@/types';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { WordFadeIn } from '@/components/ui/word-fade-in';

const ANIMATION_DELAY_PER_ITEM = 0.05;
const MAX_CONCURRENT_ANIMATIONS = 6;

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
    },
    [prompt]
  );

  const resetSearch = useCallback(() => {
    setBooks([]);
    setSubmittedPrompt('');
    setPrompt('');
    setError('');
  }, []);

  const bookGrid = useMemo(
    () => (
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {books.map((book, index) => (
          <motion.div
            key={`${book.id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay:
                Math.min(index, MAX_CONCURRENT_ANIMATIONS) *
                ANIMATION_DELAY_PER_ITEM,
              duration: 0.3,
            }}
            className="group bg-card rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden will-change-transform"
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
    ),
    [books]
  );

  return (
    <AuroraBackground>
      <main className="container mx-auto px-4 py-16 sm:py-24 flex-grow">
        {/* Header - Always visible */}
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
          <WordFadeIn
            words="RecomBooks"
            className="font-playfair text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto mt-6 max-w-xl text-xl text-primary/80 leading-relaxed tracking-wide"
          >
            Smart Book Recommendations for Every Reader
          </motion.p>
        </motion.div>

        {/* Initial Search Form - Only visible when no results */}
        {!books.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/10 rounded-lg blur-xl group-hover:blur-2xl transition-all opacity-20"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/60" />
                  <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Search for books or genres you love..."
                    className="w-full pl-12 pr-4 py-6 rounded-lg bg-white/80 dark:bg-black/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border-none text-lg shadow-lg transition-all hover:shadow-xl"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <MovingButton
                type="submit"
                disabled={loading || !prompt.trim()}
                className="w-full h-[60px] py-4 text-lg font-medium bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                containerClassName="w-full h-[60px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Finding Books...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      <span>Get Recommendations</span>
                    </>
                  )}
                </div>
              </MovingButton>
            </form>
          </motion.div>
        )}

        {/* Results Section */}
        {books.length > 0 && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-16 space-y-16"
          >
            {/* Search Results Header */}
            <div className="mt-8 text-center max-w-3xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 animate-gradient"></div>
                <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-md"></div>
                <div className="relative px-8 py-12 border border-white/20 dark:border-white/10">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 px-8 py-2.5 bg-primary/10 rounded-b-2xl backdrop-blur-sm border-x border-b border-primary/20">
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-primary" />
                      <h2 className="text-lg font-medium bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        Your Search Query
                      </h2>
                    </div>
                  </div>
                  <p className="text-xl text-foreground/90 font-medium mt-6 mb-8 italic">
                    "{submittedPrompt}"
                  </p>
                  <MovingButton
                    onClick={resetSearch}
                    className="bg-gradient-to-r from-primary/90 to-primary text-white hover:from-primary hover:to-primary/90 relative overflow-hidden group/btn"
                    containerClassName="w-auto mx-auto"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] animate-shine"></div>
                    <div className="relative flex items-center justify-center gap-3 px-8 py-3">
                      <div className="relative">
                        <Search className="h-5 w-5 transition-transform duration-300 group-hover/btn:scale-110" />
                        <div className="absolute inset-0 blur-sm opacity-50 animate-pulse"></div>
                      </div>
                      <span className="font-medium tracking-wide">
                        New Search
                      </span>
                    </div>
                  </MovingButton>
                </div>
              </div>
            </div>

            {/* Book Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
              {books.map((book, index) => (
                <motion.div
                  key={`${book.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay:
                      Math.min(index, MAX_CONCURRENT_ANIMATIONS) *
                      ANIMATION_DELAY_PER_ITEM,
                    duration: 0.3,
                  }}
                  className="group relative bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 dark:border-white/10 hover:border-primary/20 dark:hover:border-primary/20"
                >
                  <div className="aspect-[3/4] relative overflow-hidden rounded-t-3xl">
                    {book.cover ? (
                      <div className="relative w-full h-full">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          loading={index < 3 ? 'eager' : 'lazy'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                        <BookOpen className="h-20 w-20 text-primary/30" />
                      </div>
                    )}
                    {book.rating > 0 && (
                      <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-white">
                          {book.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="font-bold text-2xl text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-3">
                      {book.title}
                    </h3>
                    <p className="text-primary/80 font-medium mb-4">
                      {book.author}
                    </p>
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-8">
                      {book.description}
                    </p>
                    <div>
                      <a
                        href={book.bestPrice?.link || book.buyingLinks.amazon}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/button flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl hover:from-primary/95 hover:to-primary/85 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-0.5"
                      >
                        <ShoppingCart className="h-5 w-5 mr-2.5 transition-transform duration-300 group-hover/button:scale-110" />
                        <span className="font-medium">Buy Now</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </AuroraBackground>
  );
}
