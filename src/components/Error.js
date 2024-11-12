export function Error({ error }) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
      <div className=" text-2xl mb-5">Sorry, try again later</div>
      <div className=" text-red-700 max-w-md">{error}</div>
    </div>
  );
}
