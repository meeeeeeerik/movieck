import { Error, Footer, Loader, Poster } from '../components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSearchMovies } from '../hooks';

export function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { movies, isLoading, error } = useSearchMovies(searchParams.get('q'));

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto px-5 mt-20 pt-[5vh]">
        {movies?.length ? (
          <>
            {' '}
            <h2 className=" mb-10 font-bold text-3xl text-center">
              Search results
            </h2>
            <div className="flex gap-10 flex-wrap justify-center">
              {movies.map((movie) => (
                <Poster
                  key={movie.id}
                  {...movie}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
              ))}
            </div>
          </>
        ) : (
          <h2 className=" mb-10 font-bold text-3xl text-center">
            Nothing found
          </h2>
        )}
      </div>
      <Footer />
    </>
  );
}
