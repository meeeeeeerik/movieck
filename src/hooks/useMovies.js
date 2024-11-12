import { useEffect, useState } from 'react';
import MovieApi from '../api';

const genreById = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  horror: 27,
  thriller: 53,
  fantasy: 14,
  history: 36,
};

export function useMovies() {
  const [movies, setMovies] = useState({
    upcoming: [],
    popular: [],
    topRated: [],
    adventure: [],
    action: [],
    animation: [],
    comedy: [],
    horror: [],
    thriller: [],
    fantasy: [],
    history: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      MovieApi.getUpcoming(),
      MovieApi.getPopular(),
      MovieApi.getTopRated(),
      MovieApi.getMovieByGenreId(genreById.adventure),
      MovieApi.getMovieByGenreId(genreById.action),
      MovieApi.getMovieByGenreId(genreById.animation),
      MovieApi.getMovieByGenreId(genreById.comedy),
      MovieApi.getMovieByGenreId(genreById.horror),
      MovieApi.getMovieByGenreId(genreById.thriller),
      MovieApi.getMovieByGenreId(genreById.fantasy),
      MovieApi.getMovieByGenreId(genreById.history),
    ])
      .then((responses) =>
        setMovies({
          upcoming: responses[0],
          popular: responses[1],
          topRated: responses[2],
          adventure: responses[3],
          action: responses[4],
          animation: responses[5],
          comedy: responses[6],
          horror: responses[7],
          thriller: responses[8],
          fantasy: responses[9],
          history: responses[10],
        })
      )
      .catch((error) => setError(error?.message || 'Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    movies,
    isLoading,
    error,
  };
}
