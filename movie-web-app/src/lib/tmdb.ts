// TMDB API configuration and helper functions
import { supabase } from "@/integrations/supabase/client";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const ENDPOINTS = {
  popular: '/movie/popular',
  topRated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
  discover: '/discover/movie',
  search: '/search/movie',
  movieDetails: (id: number) => `/movie/${id}`,
  similar: (id: number) => `/movie/${id}/similar`,
};

export const getImageUrl = (path: string | null, size: 'w200' | 'w500' | 'original' = 'w500') => {
  if (!path) return '/placeholder.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string;
}

export const fetchMovies = async (endpoint: string, page: number = 1, region?: string): Promise<{ results: Movie[]; total_pages: number }> => {
  try {
    const params: Record<string, any> = { page };
    
    // Use discover endpoint when region filter is applied
    let finalEndpoint = endpoint;
    if (region) {
      finalEndpoint = ENDPOINTS.discover;
      
      // Determine sort order based on original endpoint
      if (endpoint === ENDPOINTS.popular) {
        params.sort_by = 'popularity.desc';
      } else if (endpoint === ENDPOINTS.topRated) {
        params.sort_by = 'vote_average.desc';
        params['vote_count.gte'] = 1000;
      } else if (endpoint === ENDPOINTS.upcoming) {
        params.sort_by = 'popularity.desc';
        const today = new Date();
        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + 6);
        params['primary_release_date.gte'] = today.toISOString().split('T')[0];
        params['primary_release_date.lte'] = futureDate.toISOString().split('T')[0];
      }
      
      // Set language filter
      if (region === 'hollywood') {
        params.with_original_language = 'en';
      } else if (region === 'bollywood') {
        params.with_original_language = 'hi';
      }
    }
    
    const { data, error } = await supabase.functions.invoke('tmdb-proxy', {
      body: { endpoint: finalEndpoint, params }
    });
    
    console.log('fetchMovies response:', { data, error });
    
    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Failed to fetch movies: ${error.message}`);
    }
    if (!data) {
      throw new Error('No data returned from API');
    }
    if (!data.results) {
      console.error('Invalid data structure:', data);
      throw new Error('Invalid response from API');
    }
    return data;
  } catch (err) {
    console.error('fetchMovies error:', err);
    throw err;
  }
};

export const searchMovies = async (query: string, page: number = 1): Promise<{ results: Movie[]; total_pages: number }> => {
  try {
    const { data, error } = await supabase.functions.invoke('tmdb-proxy', {
      body: { endpoint: ENDPOINTS.search, params: { query, page } }
    });
    
    console.log('searchMovies response:', { data, error });
    
    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Failed to search movies: ${error.message}`);
    }
    if (!data) {
      throw new Error('No data returned from API');
    }
    if (!data.results) {
      console.error('Invalid data structure:', data);
      throw new Error('Invalid response from API');
    }
    return data;
  } catch (err) {
    console.error('searchMovies error:', err);
    throw err;
  }
};

export const fetchMovieDetails = async (id: number): Promise<MovieDetails> => {
  const { data, error } = await supabase.functions.invoke('tmdb-proxy', {
    body: { endpoint: ENDPOINTS.movieDetails(id), params: {} }
  });
  
  if (error) throw new Error('Failed to fetch movie details');
  if (!data) throw new Error('Invalid response from API');
  return data;
};
