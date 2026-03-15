import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Github, Linkedin, Home, Briefcase } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onToggleTheme: () => void;
  themeMode: 'light' | 'dark';
}

export default function Header({ onToggleTheme, themeMode }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-14">
          <button
            onClick={() => navigate('/my-dev-page')}
            className="text-base font-semibold tracking-tight hover:text-primary transition-colors"
          >
            Lewis Gomez
          </button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              aria-label="toggle theme"
            >
              {themeMode === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <a
              href="https://www.linkedin.com/in/lg-luisgomez/"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Nav bar */}
        <nav className="flex items-center gap-1 h-10 text-sm">
          <Link
            to="/my-dev-page"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <a
            href="/my-dev-page/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Briefcase className="h-3.5 w-3.5" />
            Resume
          </a>
          <a
            href="https://github.com/lewgomz"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/lg-luisgomez/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Linkedin className="h-3.5 w-3.5" />
            LinkedIn
          </a>
          <a
            href="https://x.com/lewgomz/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X
          </a>
        </nav>
      </div>
    </header>
  );
}
