import { useState, useEffect } from 'react';
import { Movie } from '@/lib/tmdb';
import { getFavorites } from '@/lib/favorites';
import { Header } from '@/components/Header';
import { MovieGrid } from '@/components/MovieGrid';
import { Heart } from 'lucide-react';

export default function Favorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-primary fill-current" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              My Favorites
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            {favorites.length > 0 
              ? `You have ${favorites.length} favorite ${favorites.length === 1 ? 'movie' : 'movies'}`
              : 'No favorites yet. Start adding movies you love!'}
          </p>
        </div>

        {favorites.length > 0 ? (
          <MovieGrid 
            movies={favorites}
            onFavoriteToggle={loadFavorites}
          />
        ) : (
          <div className="text-center py-20">
            <Heart className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
            <p className="text-2xl text-muted-foreground">Your favorites list is empty</p>
            <p className="text-muted-foreground mt-2">
              Browse movies and click the heart icon to add them here
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
