import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserRentedMovies } from "../../api/rental";
import toast from "react-hot-toast";

const UserHome = () => {
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchRentedMovies = async () => {
      if (!user) return;

      try {
        const data = await getUserRentedMovies(user.customerID);
        setMovies(data);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load your rented movies.");
      }
    };

    fetchRentedMovies();
  }, [user]);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      
      <div className="w-full h-[60vh] bg-neutral-900 flex items-center justify-center border-b border-neutral-800">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold mb-2">
          {user ? `Welcome, ${user.firstName}` : "Welcome to RSP Movies"}
         </h1>
         <p className="text-gray-300 max-w-xl mx-auto">
            Rent and browse your favorite movies.
         </p>
          <Link
            to="/browse"
            className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
            Browse Collection
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Movies that you've rented</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {movies.map((movie, index) => (
            <div
              key={index}
              onClick={() => openModal(movie)}
              className="cursor-pointer bg-neutral-900 p-4 rounded-xl border border-neutral-800 shadow-lg hover:border-white transition"
            >
              <div className="h-48 bg-neutral-800 rounded-lg mb-3"></div>
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-gray-400 text-sm">
                {movie.genre} | {movie.releaseYear}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {open && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 w-full max-w-lg p-8 rounded-xl border border-neutral-800 relative">

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-300 hover:text-white transition"
            >
              ✕
            </button>

            {/* Modal Content */}
            <h2 className="text-3xl font-semibold mb-4">
              {selectedMovie.title}
            </h2>

            <div className="h-60 bg-neutral-800 rounded-lg mb-6"></div>

            <p className="text-gray-300 mb-2">
              <span className="font-semibold text-white">Genre:</span>{" "}
              {selectedMovie.genre}
            </p>

            <p className="text-gray-300 mb-2">
              <span className="font-semibold text-white">Release Year:</span>{" "}
              {selectedMovie.year}
            </p>

            <p className="text-gray-300 mb-6">
              <span className="font-semibold text-white">Description:</span>{" "}
              A short placeholder description about the movie. This is where
              movie details will appear later when logic is added.
            </p>

            {/* Rent Button */}
            <button className="w-full bg-white text-black font-semibold p-3 rounded-lg hover:bg-gray-200 transition">
              Rent Movie
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default UserHome;
