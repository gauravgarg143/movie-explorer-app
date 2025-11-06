import { Film, Heart, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export const Header = () => {
  const location = useLocation();

  return (
    <TooltipProvider>
      <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-background via-background/95 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group">
                <div className="relative">
                  <Film className="w-10 h-10 text-primary transition-transform group-hover:scale-110" />
                  <Sparkles className="w-4 h-4 text-primary absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bebas text-primary tracking-wider leading-none">
                    CINEVERSE
                  </span>
                  <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
                    Your Movie Universe
                  </span>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go to homepage</p>
            </TooltipContent>
          </Tooltip>

          <nav className="flex items-center gap-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  className={cn(
                    "text-sm font-medium transition-all hover:text-foreground uppercase tracking-wide px-3 py-2 rounded-md hover:bg-accent/50",
                    location.pathname === '/' ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
                  )}
                  aria-label="Browse movies"
                >
                  HOME
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Explore popular and trending movies</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/favorites"
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-all hover:text-foreground uppercase tracking-wide px-3 py-2 rounded-md hover:bg-accent/50",
                    location.pathname === '/favorites' ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
                  )}
                  aria-label="View favorites"
                >
                  <Heart className="w-4 h-4" />
                  Favorites
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View your favorite movies collection</p>
              </TooltipContent>
            </Tooltip>
            
            <ThemeToggle />
          </nav>
        </div>
      </header>
    </TooltipProvider>
  );
};
