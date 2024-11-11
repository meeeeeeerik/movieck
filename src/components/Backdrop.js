function Backdrop({ children, backdropPath }) {
  return (
    <div
      className="backdrop h-[80vh] max-w-full"
      style={{
        '--url': `url(https://image.tmdb.org/t/p/w1280/${backdropPath})`,
      }}
    >
      {children}
    </div>
  );
}

export default Backdrop;
