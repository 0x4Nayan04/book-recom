import { Search } from "lucide-react";
import { Button as MovingButton } from "@/components/ui/moving-border";
import { motion } from "framer-motion";

interface SearchFormProps {
  prompt: string;
  loading: boolean;
  onPromptChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SearchForm({ prompt, loading, onPromptChange, onSubmit }: SearchFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="mt-12 max-w-2xl mx-auto"
    >
      <form onSubmit={onSubmit} className="flex flex-col space-y-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/10 rounded-lg blur-xl group-hover:blur-2xl transition-all opacity-20"></div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full z-30">
              <Search className="h-5 w-5 text-primary group-hover:text-primary/90 group-hover:scale-110 transition-all duration-300" />
            </div>
            <input
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder="Search for books or genres you love..."
              className="w-full pl-16 pr-4 py-6 rounded-lg bg-white/80 dark:bg-black/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border-none text-lg shadow-lg transition-all hover:shadow-xl"
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
  );
} 