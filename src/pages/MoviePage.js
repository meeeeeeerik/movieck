import { Backdrop, Error, Footer, Loader, Poster } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import { useMovie } from '../hooks';
import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export function MoviePage() {
  const params = useParams();
  const navigate = useNavigate();

  const { movie, isLoading, error } = useMovie(params.id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const ref = useRef();

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading || !movie) {
    return <Loader />;
  }

  const {
    backdrop_path,
    poster_path,
    original_title,
    overview,
    genres,
    release_date,
    runtime,
    videos: { results },
    credits: { cast, crew },
    similar: { results: similarMovies },
  } = movie;

  const genreNames = genres.map(({ name }) => name).join(' | ');

  const releaseYear = release_date.split('-')[0];

  const getDuration = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time - hours * 60;

    return `${hours}h ${minutes}m`;
  };

  const getVideoSrc = () => {
    let videoKey;

    videoKey = results.find((video) => video.type === 'Trailer')?.key;

    if (!videoKey) {
      videoKey = results.find((video) => video.type === 'Teaser')?.key;

      if (!videoKey) {
        videoKey = results.find((video) => video.type === 'Clip')?.key;
      }
    }

    return videoKey ? `https://www.youtube.com/embed/${videoKey}` : null;
  };

  const videoSrc = getVideoSrc();

  return (
    <>
      <Backdrop backdropPath={backdrop_path}>
        <div className="container mx-auto px-5 pt-[20vh] flex gap-10">
          <div className="hidden sm:block">
            {poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                alt={original_title}
                width={300}
                height={450}
                className="min-w-[300px] h-[450px]"
              />
            ) : (
              <div className="min-w-[300px] h-[450px] bg-slate-700 flex justify-center items-center">
                Image not found
              </div>
            )}
          </div>
          <div>
            <h2 className=" text-5xl font-bold line-clamp-2 mb-5">
              {original_title} ({releaseYear})
            </h2>
            <div className="mb-5 text-lg">{getDuration(runtime)}</div>
            <div className="mb-5 text-lg">{genreNames}</div>
            {videoSrc ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="h-12 px-5 bg-white text-black rounded-md text-xl font-bold hover:bg-green-500 hover:text-white transition-all duration-300 mb-5"
              >
                Trailer
              </button>
            ) : null}
            <div className="max-w-2xl line-clamp-3 text-lg">{overview}</div>
          </div>
        </div>
      </Backdrop>
      {cast?.length || crew?.length || similarMovies?.length ? (
        <div className="container mx-auto px-5 mt-20 flex flex-col gap-10">
          {cast?.length ? (
            <div>
              <h2 className=" mb-5 font-bold text-2xl">Cast</h2>
              <div className=" overflow-auto overflow-y-hidden scrollbar-none">
                <div className="flex gap-10 ">
                  {cast
                    .slice(0, 20)
                    .map(({ id, name, character, profile_path }, index) => (
                      <div key={'cast' + index + id} className="w-[150px]">
                        {profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                            alt={name}
                            width={150}
                            height={225}
                            className="block min-w-[150px] h-[225px] rounded-lg mb-5 "
                          />
                        ) : (
                          <div className="min-w-[150px] h-[225px] bg-slate-700 flex justify-center items-center rounded-lg mb-5">
                            Image not found
                          </div>
                        )}
                        <div className="text-center">
                          <div className="text-xl font-bold">{name}</div>
                          <div className="text-green-500">{character}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : null}
          {crew?.length ? (
            <div>
              <h2 className=" mb-5 font-bold text-2xl">Crew</h2>
              <div className=" overflow-auto overflow-y-hidden scrollbar-none">
                <div className="flex gap-10 ">
                  {crew
                    .slice(0, 20)
                    .map(({ id, name, department, profile_path }, index) => (
                      <div key={'cast' + index + id}>
                        {profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                            alt={name}
                            width={150}
                            height={225}
                            className="block min-w-[150px] h-[225px] rounded-lg mb-5"
                          />
                        ) : (
                          <div className="min-w-[150px] h-[225px] bg-slate-700 flex justify-center items-center rounded-lg mb-5">
                            Image not found
                          </div>
                        )}
                        <div className="text-center">
                          <div className="text-xl font-bold">{name}</div>
                          <div className="text-green-500">{department}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : null}
          {similarMovies?.length ? (
            <div>
              <h2 className=" mb-5 font-bold text-2xl">Similar Movies</h2>
              <div className="scrollbar-none overflow-x-auto overflow-y-hidden flex gap-10">
                {similarMovies.map((movie) => (
                  <Poster
                    key={movie.id}
                    {...movie}
                    onClick={() => {
                      navigate(`/movie/${movie.id}`);
                    }}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      <Footer />
      <CSSTransition
        nodeRef={ref}
        in={isModalOpen}
        timeout={200}
        classNames="modal"
        unmountOnExit
      >
        <div
          ref={ref}
          className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black bg-opacity-80 flex items-center px-5"
          onClick={() => setIsModalOpen(false)}
        >
          <div className=" w-full max-w-4xl m-auto">
            <div className=" w-5 h-5 relative mb-5 cursor-pointer hover:opacity-70 ml-auto">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-[2px] rotate-45 bg-white"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-[2px] -rotate-45 bg-white"></div>
            </div>
            <iframe
              width="900"
              height="450"
              src={videoSrc}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full"
            ></iframe>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
