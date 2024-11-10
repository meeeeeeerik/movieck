import { Fragment, useEffect, useState } from 'react';
import MovieApi from './api';

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

function App() {
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
      .catch((error) => console.log(error));
  }, []);

  console.log('movies', movies);

  //https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg

  const movieList = [
    {
      key: 'upcoming',
      title: 'Upcoming Movies',
    },
    {
      key: 'popular',
      title: 'Popular Movies',
    },
    {
      key: 'topRated',
      title: 'Top Rated Movies',
    },
    {
      key: 'adventure',
      title: 'Adventure Movies',
    },
    {
      key: 'action',
      title: 'Action Movies',
    },
    {
      key: 'animation',
      title: 'Animation Movies',
    },
    {
      key: 'comedy',
      title: 'Comedy Movies',
    },
    {
      key: 'horror',
      title: 'Horror Movies',
    },
    {
      key: 'thriller',
      title: 'Thriller Movies',
    },
    {
      key: 'fantasy',
      title: 'Fantasy Movies',
    },
    {
      key: 'history',
      title: 'History Movies',
    },
  ];

  return (
    <div className="container mx-auto text-3xl">
      {movieList.map(({ key, title }) => (
        <Fragment key={title + key}>
          <h2 className="mb-5 font-bold mt-10">{title}</h2>
          <div className="overflow-x-auto">
            <div className="flex gap-7">
              {movies[key].map(({ poster_path, title, id }) => (
                <div
                  key={key + id}
                  className="bg-slate-400 min-w-[150px] h-[225px] overflow-hidden cursor-pointer"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${poster_path}`}
                    alt={title}
                    width={150}
                    height={225}
                    className="hover:scale-125 transition-all duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default App;
