import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Github, Linkedin, Home, Briefcase } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onToggleTheme: () => void;
  themeMode: 'light' | 'dark';
}

/**
 * Hide the header while the user is still on the splash (home route, scroll near top);
 * fade it in once the user scrolls past ~60% of viewport height.
 * On non-home routes the header is always visible.
 */
function useHiddenOverSplash(): boolean {
  const location = useLocation();
  const [hidden, setHidden] = useState(location.pathname === '/');

  useEffect(() => {
    if (location.pathname !== '/') {
      setHidden(false);
      return;
    }
    const threshold = () => window.innerHeight * 0.6;
    const onScroll = () => setHidden(window.scrollY < threshold());
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [location.pathname]);

  return hidden;
}

export default function Header({ onToggleTheme, themeMode }: HeaderProps) {
  const navigate = useNavigate();
  const hidden = useHiddenOverSplash();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        'transition-all duration-500 ease-out',
        hidden
          ? 'opacity-0 -translate-y-2 pointer-events-none'
          : 'opacity-100 translate-y-0 pointer-events-auto'
      )}
      aria-hidden={hidden}
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-14">
          <button
            onClick={() => navigate('/')}
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
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <a
            href="/resume.pdf"
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
