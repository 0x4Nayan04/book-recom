import Link from 'next/link';
import { Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 RecomBooks. All rights reserved.
          </p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Link
            href="https://x.com/NayanSwarnkar04"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 hover:bg-primary/10 transition-colors"
          >
            <Twitter className="h-5 w-5 text-primary" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/nayanswarnkar/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 hover:bg-primary/10 transition-colors"
          >
            <Linkedin className="h-5 w-5 text-primary" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
