import { Fragment, useMemo } from 'react';
import { getRandomMinMax } from '../utils';
import { Backdrop, Error, Footer, Header, Loader, Poster } from '../components';
import { useMovies } from '../hooks';
import { Navigate, useNavigate } from 'react-router-dom';

export function MainPage() {
  const navigate = useNavigate();

  const { movies, isLoading, error } = useMovies();

  const movieList = useMemo(
    () => [
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
    ],
    []
  );

  const randomMovie = useMemo(
    () =>
      movies[movieList[getRandomMinMax(0, movieList.length - 1)].key][
        getRandomMinMax(0, 19)
      ],
    [movieList, movies]
  );

  const goToMovie = (id) => {
    navigate(`/movie/${id}`);
  };

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading || !randomMovie) {
    return <Loader />;
  }
  return (
    <>
      <Header />
      <Backdrop backdropPath={randomMovie.backdrop_path}>
        <div className="container mx-auto px-5 pt-[30vh]">
          <h2 className=" text-8xl font-bold line-clamp-1 mb-5">
            {randomMovie.original_title}
          </h2>
          <button onClick={() => goToMovie(randomMovie.id)} className="h-12 px-5 bg-white text-black rounded-md text-xl font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 mb-5">
            Details
          </button>
          <div className="max-w-2xl line-clamp-3">{randomMovie.overview}</div>
        </div>
      </Backdrop>
      <div className="container mx-auto text-3xl px-5">
        {movieList.map(({ key, title }) => (
          <Fragment key={title + key}>
            <h2 className="mb-5 font-bold mt-10">{title}</h2>
            <div className="scrollbar-none overflow-x-auto overflow-y-hidden flex gap-10">
              {movies[key].map((movie) => (
                <Poster key={key + movie.id} {...movie} onClick={() => goToMovie(movie.id)} />
              ))}
            </div>
          </Fragment>
        ))}
      </div>
      <Footer />
    </>
  );
}
