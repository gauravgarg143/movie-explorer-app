import { useState, useEffect } from 'react';
import { Movie, ENDPOINTS, fetchMovies, searchMovies } from '@/lib/tmdb';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SearchBar } from '@/components/SearchBar';
import { CategoryTabs, Category } from '@/components/CategoryTabs';
import { RegionSelector, Region } from '@/components/RegionSelector';
import { MovieGrid } from '@/components/MovieGrid';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | undefined>();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category>('popular');
  const [region, setRegion] = useState<Region>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const { toast } = useToast();

  const loadMovies = async (newPage: number = 1, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      let result;
      if (searchQuery) {
        result = await searchMovies(searchQuery, newPage);
      } else {
        const endpoint = {
          popular: ENDPOINTS.popular,
          top_rated: ENDPOINTS.topRated,
          upcoming: ENDPOINTS.upcoming,
        }[category];
        const regionParam = region === 'all' ? undefined : region;
        result = await fetchMovies(endpoint, newPage, regionParam);
      }

      if (append) {
        setMovies(prev => [...prev, ...result.results]);
      } else {
        setMovies(result.results);
        if (!searchQuery && result.results.length > 0) {
          setFeaturedMovie(result.results[0]);
        }
      }
      setTotalPages(result.total_pages);
      setPage(newPage);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load movies. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadMovies(1, false);
  }, [category, region]);

  const handleSearch = () => {
    setPage(1);
    setFeaturedMovie(undefined);
    loadMovies(1, false);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      loadMovies(page + 1, true);
    }
  };

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    setSearchQuery('');
  };

  const handleRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {!searchQuery && featuredMovie && (
        <HeroSection movie={featuredMovie} />
      )}
      
      <main className="container mx-auto px-4 py-12 space-y-12">
        <div className="space-y-8">
          <div className="flex justify-center">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
            />
          </div>

          {!searchQuery && (
            <>
              <div className="flex justify-center">
                <RegionSelector value={region} onChange={handleRegionChange} />
              </div>
              <div className="flex justify-center">
                <CategoryTabs value={category} onChange={handleCategoryChange} />
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          {searchQuery && (
            <div className="text-center">
              <h2 className="text-2xl font-bebas tracking-wide text-foreground">
                Search Results for "{searchQuery}"
              </h2>
            </div>
          )}
          
          <MovieGrid 
            movies={movies} 
            loading={loading}
            onFavoriteToggle={() => {}}
          />
        </div>

        {!loading && page < totalPages && (
          <div className="flex justify-center pt-8 animate-fade-in">
            <Button
              onClick={handleLoadMore}
              disabled={loadingMore}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 h-14 rounded-xl font-semibold uppercase tracking-wide transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
              aria-label="Load more movies"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Loading More Movies...
                </>
              ) : (
                <>
                  Load More Movies
                  <span className="ml-2 text-xs opacity-70">({page} of {totalPages})</span>
                </>
              )}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
