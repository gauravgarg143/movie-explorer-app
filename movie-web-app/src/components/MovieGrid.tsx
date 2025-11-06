import { Movie } from '@/lib/tmdb';
import { MovieCard } from './MovieCard';
import { Skeleton } from './ui/skeleton';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  onFavoriteToggle?: () => void;
}

export const MovieGrid = ({ movies, loading, onFavoriteToggle }: MovieGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-muted-foreground">No movies found</p>
        <p className="text-muted-foreground mt-2">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
};
