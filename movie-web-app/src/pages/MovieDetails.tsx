import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieDetails as MovieDetailsType, getImageUrl, fetchMovieDetails } from '@/lib/tmdb';
import { isFavorite, addFavorite, removeFavorite } from '@/lib/favorites';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Heart, Star, Clock, Calendar } from 'lucide-react';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadMovie = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await fetchMovieDetails(parseInt(id));
        setMovie(data);
        setFavorite(isFavorite(data.id));
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load movie details.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id, toast]);

  const handleFavoriteToggle = () => {
    if (!movie) return;

    if (favorite) {
      removeFavorite(movie.id);
      toast({
        title: 'Removed from favorites',
        description: `${movie.title} has been removed from your favorites.`,
      });
    } else {
      addFavorite(movie);
      toast({
        title: 'Added to favorites',
        description: `${movie.title} has been added to your favorites.`,
      });
    }
    setFavorite(!favorite);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid md:grid-cols-[300px,1fr] gap-8">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Movie not found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div 
        className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'original')})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <main className="container mx-auto px-4 -mt-80 relative z-10">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-card text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid md:grid-cols-[300px,1fr] gap-8 pb-12">
          <div className="space-y-4">
            <img
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
            <Button
              onClick={handleFavoriteToggle}
              className="w-full"
              variant={favorite ? 'default' : 'outline'}
            >
              <Heart className={favorite ? 'fill-current mr-2' : 'mr-2'} />
              {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-xl text-muted-foreground italic">"{movie.tagline}"</p>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-rating-yellow">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-lg font-semibold">{rating}</span>
                <span className="text-muted-foreground">({movie.vote_count} votes)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-5 h-5" />
                <span>{year}</span>
              </div>
              {movie.runtime && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span>{movie.runtime} min</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {movie.overview || 'No overview available.'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
