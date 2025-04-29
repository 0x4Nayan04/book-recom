import { Search } from "lucide-react";
import { Button as MovingButton } from "@/components/ui/moving-border";
import { motion } from "framer-motion";
import type { Book } from "@/types/book";
import { BookCard } from "@/components/ui/BookCard";

interface ResultsSectionProps {
  books: Book[];
  submittedPrompt: string;
  onResetSearch: () => void;
}

export function ResultsSection({ books, submittedPrompt, onResetSearch }: ResultsSectionProps) {
  return (
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
              onClick={onResetSearch}
              className="bg-gradient-to-r from-primary/90 to-primary text-white hover:from-primary hover:to-primary/90 relative overflow-hidden group/btn"
              containerClassName="w-auto mx-auto"
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] animate-shine"></div>
              <div className="relative flex items-center justify-center gap-3 px-8 py-3">
                <div className="relative">
                  <Search className="h-5 w-5 transition-transform duration-300 group-hover/btn:scale-110" />
                  <div className="absolute inset-0 blur-sm opacity-50 animate-pulse"></div>
                </div>
                <span className="font-medium tracking-wide">New Search</span>
              </div>
            </MovingButton>
          </div>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {books.map((book, index) => (
          <BookCard key={book.id} book={book} index={index} />
        ))}
      </div>
    </motion.div>
  );
} 