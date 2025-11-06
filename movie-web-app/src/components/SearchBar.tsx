import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <TooltipProvider>
      <div className="flex gap-3 w-full max-w-3xl animate-fade-in">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for movies, actors, directors..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-12 h-14 bg-muted/50 border-2 border-border/50 focus:border-primary text-base rounded-xl transition-all duration-300 focus:shadow-lg focus:shadow-primary/20"
            aria-label="Search movies"
          />
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={onSearch}
              className="h-14 px-10 bg-primary hover:bg-primary/90 rounded-xl font-semibold uppercase tracking-wide transition-all hover:scale-105"
              aria-label="Search for movies"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Movies
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Press Enter or click to search</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
