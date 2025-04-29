import { Search } from "lucide-react";
import { Button as MovingButton } from "@/components/ui/moving-border";
import { motion } from "framer-motion";

interface ErrorMessageProps {
  error: string;
  onReset: () => void;
}

export function ErrorMessage({ error, onReset }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-4 bg-destructive/10 text-destructive rounded-lg max-w-2xl mx-auto text-center"
    >
      <p>{error}</p>
      <MovingButton
        onClick={onReset}
        className="mt-4 bg-primary text-white hover:bg-primary/90 relative overflow-hidden"
        containerClassName="w-auto mx-auto"
      >
        <div className="relative flex items-center justify-center gap-2 px-6 py-2">
          <Search className="h-4 w-4" />
          <span className="font-medium">Try Again</span>
        </div>
      </MovingButton>
    </motion.div>
  );
} 