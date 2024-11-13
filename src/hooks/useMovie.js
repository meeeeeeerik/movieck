import { useEffect, useState } from 'react';
import MovieApi from '../api';

export function useMovie(id) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    MovieApi.getMovie(id)
      .then((response) => setMovie(response))
      .catch((error) => setError(error?.message || 'Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [id]);

  return {
    movie,
    isLoading,
    error,
  };
}
