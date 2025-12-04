import { useSelector } from "react-redux";
import { getMovieImage } from "../api/movie";
import { rentMovie } from "../api/rental";

const MovieModal = ({ movie, onClose, onRented }) => {

  const authUser = useSelector(state => state.auth.user);

  const handleRent = async () => {
    try {
      await rentMovie(authUser.customerID, movie.movieID);
      onRented();      
      onClose();
    } catch (err) {
      console.error("Rent failed:", err);
    }
  };

  return (<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-neutral-900 w-full max-w-2xl p-8 rounded-xl border border-neutral-800 relative">

      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-300 hover:text-white transition"
      >
        ✕
      </button>

      <img
        src={getMovieImage(movie.movieID)}
        alt={movie.title}
        className="w-full h-72 object-cover rounded-lg mb-6 bg-neutral-800 border border-neutral-700"
      />

      <h2 className="text-3xl font-semibold mb-4">{movie.title}</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <p><span className="font-semibold">Genre:</span> {movie.genre}</p>
        <p><span className="font-semibold">Release Year:</span> {movie.releaseYear}</p>
        <p><span className="font-semibold">Rental Rate:</span> {movie.rentalRate}</p>
        <p><span className="font-semibold">Stock:</span> {movie.stock}</p>
      </div>

      <button className="w-full bg-white text-black font-semibold p-3 rounded-lg hover:bg-gray-200 transition" onClick={handleRent}>
        Rent Movie
      </button>
    </div>
  </div>);
};

export default MovieModal;