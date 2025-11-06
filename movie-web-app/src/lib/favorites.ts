import { Movie } from './tmdb';

const FAVORITES_KEY = 'movie_favorites';

export const getFavorites = (): Movie[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addFavorite = (movie: Movie): void => {
  const favorites = getFavorites();
  if (!favorites.find(fav => fav.id === movie.id)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, movie]));
  }
};

export const removeFavorite = (movieId: number): void => {
  const favorites = getFavorites();
  localStorage.setItem(
    FAVORITES_KEY, 
    JSON.stringify(favorites.filter(fav => fav.id !== movieId))
  );
};

export const isFavorite = (movieId: number): boolean => {
  return getFavorites().some(fav => fav.id === movieId);
};
