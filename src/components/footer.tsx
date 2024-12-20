import { Twitter, Linkedin } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="mt-auto py-8 text-center">
      <div className="container mx-auto">
        <p className="text-primary mb-4">
          © {new Date().getFullYear()} RecomBooks. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <a 
              href="https://x.com/NayanSwarnkar04" 
              target="_blank" 
              rel="noreferrer" 
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a 
              href="https://www.linkedin.com/in/nayanswarnkar/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
} 