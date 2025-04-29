import { motion } from "framer-motion";
import { BookOpen, ShoppingCart, Star } from "lucide-react";
import type { Book } from "@/types/book";
import { ANIMATION_DELAY_PER_ITEM, MAX_CONCURRENT_ANIMATIONS } from "@/utils/book";

interface BookCardProps {
  book: Book;
  index: number;
}

export function BookCard({ book, index }: BookCardProps) {
  return (
    <motion.div
      key={`${book.id}-${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index, MAX_CONCURRENT_ANIMATIONS) * ANIMATION_DELAY_PER_ITEM,
        duration: 0.3,
      }}
      className="group relative bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 dark:border-white/10 hover:border-primary/20 dark:hover:border-primary/20"
    >
      <div className="min-h-64 height-64 bg-primary/5 flex justify-center items-center relative overflow-hidden rounded-t-3xl">
        {book.cover ? (
          <div className="relative w-full h-64">
            <img
              src={book.cover}
              alt={book.title}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              loading={index < 3 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
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
        <p className="text-primary/80 font-medium mb-4">{book.author}</p>
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
  );
} 