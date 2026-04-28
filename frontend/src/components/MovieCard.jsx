import { getMovieImage } from "../api/movie";

const MovieCard = ({ movie, onClick }) => (
  <div
    onClick={() => onClick(movie)}
    className="cursor-pointer bg-neutral-900 border border-neutral-800 hover:border-white transition p-5 rounded-xl flex justify-between items-center"
  >

    <img
      src={getMovieImage(movie.movieID)}
      alt={movie.title}
      className="w-20 h-28 object-cover rounded-md bg-neutral-800 border border-neutral-700"
    />

    <div>
      <h2 className="text-xl font-semibold">{movie.title}</h2>
      <p className="text-gray-400 text-sm">
        {movie.genre} - {movie.releaseYear}
      </p>
    </div>

    <div className="text-right">
      <p className="text-gray-300 text-sm">Stock: {movie.stock}</p>
      <p className="text-gray-300 text-sm">Rate: {movie.rentalRate}</p>
    </div>
  </div>
);

export default MovieCard;