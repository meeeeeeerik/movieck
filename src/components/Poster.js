export function Poster({ title, poster_path, onClick }) {
  return (
    <div
      className="bg-slate-400 min-w-[150px] h-[225px] overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${poster_path}`}
        alt={title}
        width={150}
        height={225}
        className="hover:scale-125 transition-all duration-700"
      />
    </div>
  );
}
