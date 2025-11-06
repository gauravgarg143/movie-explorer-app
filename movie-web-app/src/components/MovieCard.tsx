import { Movie } from '@/lib/tmdb';
import { Heart, Star, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isFavorite, addFavorite, removeFavorite } from '@/lib/favorites';
import { toast } from 'sonner';

interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle?: () => void;
}

export const MovieCard = ({ movie, onFavoriteToggle }: MovieCardProps) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(movie.id));
  }, [movie.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isFav) {
      removeFavorite(movie.id);
      setIsFav(false);
      toast.success('Removed from collection');
    } else {
      addFavorite(movie);
      setIsFav(true);
      toast.success('Added to collection');
    }
    
    onFavoriteToggle?.();
  };

  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group relative overflow-hidden rounded-xl bg-card transition-all duration-500 hover:ring-2 hover:ring-primary/50 hover:shadow-2xl hover:shadow-primary/20 animate-fade-in"
      aria-label={`View details for ${movie.title}`}
    >
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} movie poster`}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-primary rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-8 h-8 text-white fill-white" />
          </div>
        </div>
      </div>
      
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md transition-all z-10 transform hover:scale-110 hover:rotate-12"
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        title={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart 
          className={`w-5 h-5 transition-all duration-300 ${
            isFav ? 'fill-primary text-primary scale-110 animate-pulse' : 'text-white'
          }`}
        />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-white text-lg line-clamp-2 leading-tight">
            {movie.title}
          </h3>
          <div className="flex items-center gap-1 bg-rating-yellow rounded-md px-2 py-1 shrink-0">
            <Star className="w-3.5 h-3.5 fill-black text-black" />
            <span className="text-black font-bold text-sm">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        <span className="text-white/80 text-sm font-medium">
          {new Date(movie.release_date).getFullYear()}
        </span>
      </div>
    </Link>
  );
};
