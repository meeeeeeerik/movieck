import { useEffect, useState } from 'react';
import MovieApi from '../api';

export function useSearchMovies(query) {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query) {
      setIsLoading(true);

      MovieApi.search(query)
        .then((response) => setMovies(response))
        .catch((error) => setError(error?.message || 'Something went wrong'))
        .finally(() => setIsLoading(false));
    }
  }, [query]);

  return {
    movies,
    isLoading,
    error,
  };
}
