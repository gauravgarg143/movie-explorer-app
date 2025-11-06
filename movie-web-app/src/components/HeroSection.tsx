import { useState, useEffect } from 'react';
import { Movie } from '@/lib/tmdb';
import { Star, Play, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { isFavorite, addFavorite, removeFavorite } from '@/lib/favorites';

interface HeroSectionProps {
  movie?: Movie;
}

export const HeroSection = ({ movie }: HeroSectionProps) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (movie) {
      setIsFav(isFavorite(movie.id));
    }
  }, [movie]);

  const handleFavoriteToggle = () => {
    if (!movie) return;
    
    if (isFav) {
      removeFavorite(movie.id);
      setIsFav(false);
    } else {
      addFavorite(movie);
      setIsFav(true);
    }
  };

  if (!movie) return null;

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6">
          <div className="inline-block px-4 py-1 bg-primary/20 border border-primary/30 rounded-full">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">Featured</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bebas tracking-wide text-foreground leading-none">
            {movie.title}
          </h1>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 bg-rating-yellow/20 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 fill-rating-yellow text-rating-yellow" />
              <span className="font-semibold text-foreground">{movie.vote_average.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>

          <p className="text-muted-foreground text-lg line-clamp-3 max-w-xl">
            {movie.overview}
          </p>

          <div className="flex gap-4 pt-4">
            <Button 
              asChild
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8 text-base font-semibold"
            >
              <Link to={`/movie/${movie.id}`}>
                <Play className="w-5 h-5 fill-current" />
                View Details
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleFavoriteToggle}
              className="gap-2 border-2 hover:bg-primary/10"
            >
              <Plus className="w-5 h-5" />
              {isFav ? 'In Collection' : 'Add to Collection'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
