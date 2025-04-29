"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { WordFadeIn } from "@/components/ui/word-fade-in";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import type { Book } from "@/types/book";
import { SearchForm } from "@/components/ui/SearchForm";
import { ResultsSection } from "@/components/ui/ResultsSection";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ensureHttps } from "@/utils/book";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!prompt.trim()) return;

      setLoading(true);
      setError("");
      setBooks([]);
      setSubmittedPrompt(prompt);

      try {
        const response = await fetch("/api/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to get recommendations");
        }

        if (!data.books || data.books.length === 0) {
          throw new Error("No books found matching your criteria");
        }

        const secureBooks = data.books.map((book: Book) => ({
          ...book,
          cover: ensureHttps(book.cover),
        }));

        setBooks(secureBooks);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    },
    [prompt]
  );

  const resetSearch = useCallback(() => {
    setBooks([]);
    setSubmittedPrompt("");
    setPrompt("");
    setError("");
  }, []);

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
          <SearchForm
            prompt={prompt}
            loading={loading}
            onPromptChange={setPrompt}
            onSubmit={handleSubmit}
          />
        )}

        {/* Results Section */}
        {books.length > 0 && (
          <ResultsSection
            books={books}
            submittedPrompt={submittedPrompt}
            onResetSearch={resetSearch}
          />
        )}

        {/* Error Message */}
        {error && <ErrorMessage error={error} onReset={resetSearch} />}

        {/* Loading Skeleton */}
        {loading && <LoadingSkeleton />}
      </main>
    </AuroraBackground>
  );
}
