import { useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { rentMovie } from "../../api/rental";

const BrowsePage = () => {
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
    const { user } = useSelector((state) => state.auth);


  const movies = [
    {
      movieID: 1,
      title: "The Night Runner",
      genre: "Action",
      year: 2022,
      stock: 5,
      rate: "$3.99",
      rating: 4.5,
    },
    {
      movieID: 2,
      title: "Silent Echo",
      genre: "Drama",
      year: 2020,
      stock: 2,
      rate: "$2.99",
      rating: 4.2,
    },
    {
      movieID: 3,
      title: "Galactic Drift",
      genre: "Sci-Fi",
      year: 2023,
      stock: 0,
      rate: "$4.99",
      rating: 4.8,
    },
  ];

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedMovie(null);
  };
          const handleRent = async () => {
    if (!user) {
      toast.error("You must be logged in to rent a movie.");
      return;
    }

    if (!selectedMovie || !selectedMovie.movieID) {
      toast.error("Missing movie ID for this movie.");
      return;
    }

    try {
      await rentMovie(user.customerID, selectedMovie.movieID);
      toast.success("Movie rented successfully!");

      
      setSelectedMovie((prev) =>
        prev ? { ...prev, stock: prev.stock - 1 } : prev
      );
    } catch (e) {
      const msg = e?.response?.data || "Could not rent movie.";
      toast.error(msg);
    }
  };


  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      
    <Link
        to="/userhome"
        className="text-gray-300 hover:text-white transition font-medium"
    >
        ← Home
    </Link>

      <div className="max-w-5xl mx-auto bg-neutral-900 border border-neutral-800 p-6 rounded-xl mb-12">
        
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-1">
            Search by Title
          </label>
          <input
            type="text"
            placeholder="e.g., The Night Runner"
            className="w-full bg-neutral-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div>
            <label className="block text-sm text-gray-300 mb-1">Genre</label>
            <select className="w-full bg-neutral-800 text-white p-3 rounded-lg">
              <option>All</option>
              <option>Action</option>
              <option>Drama</option>
              <option>Sci-Fi</option>
              <option>Comedy</option>
              <option>Horror</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Release Year Range
            </label>
            <div className="flex gap-3">
              <input
                placeholder="From"
                className="w-1/2 bg-neutral-800 text-white p-3 rounded-lg"
              />
              <input
                placeholder="To"
                className="w-1/2 bg-neutral-800 text-white p-3 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Availability
            </label>
            <select className="w-full bg-neutral-800 text-white p-3 rounded-lg">
              <option>All</option>
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>

        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-4">
        {movies.map((movie, idx) => (
          <div
            key={idx}
            onClick={() => openModal(movie)}
            className="cursor-pointer bg-neutral-900 border border-neutral-800 hover:border-white transition p-5 rounded-xl flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-gray-400 text-sm">
                {movie.genre} • {movie.year}
              </p>
            </div>

            <div className="text-right">
              <p className="text-gray-300 text-sm">Stock: {movie.stock}</p>
              <p className="text-gray-300 text-sm">Rate: {movie.rate}</p>
              <p className="text-gray-300 text-sm">Rating: {movie.rating}</p>
            </div>
          </div>
        ))}
      </div>

      {open && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 w-full max-w-2xl p-8 rounded-xl border border-neutral-800 relative">

            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-300 hover:text-white transition"
            >
              ✕
            </button>

            <h2 className="text-3xl font-semibold mb-4">{selectedMovie.title}</h2>

            {/* placeholder poster */}
            <div className="h-72 bg-neutral-800 rounded-lg mb-6"></div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <p>
                <span className="font-semibold">Genre:</span>{" "}
                {selectedMovie.genre}
              </p>
              <p>
                <span className="font-semibold">Release Year:</span>{" "}
                {selectedMovie.year}
              </p>
              <p>
                <span className="font-semibold">Rental Rate:</span>{" "}
                {selectedMovie.rate}
              </p>
              <p>
                <span className="font-semibold">Stock Available:</span>{" "}
                {selectedMovie.stock}
              </p>
              <p>
                <span className="font-semibold">Avg Rating:</span>{" "}
                {selectedMovie.rating}
              </p>
              <p>
                <span className="font-semibold">Reviews:</span> 41
              </p>
            </div>

            {/* Hardcoded reviews */}
            <h3 className="text-xl font-semibold mb-3">Recent Reviews</h3>

            <div className="space-y-3 mb-6">
              <div className="bg-neutral-800 p-3 rounded-lg border border-neutral-700">
                <p className="font-semibold text-white">John Doe</p>
                <p className="text-gray-300 text-sm">
                  "Great movie, solid action scenes."
                </p>
              </div>

              <div className="bg-neutral-800 p-3 rounded-lg border border-neutral-700">
                <p className="font-semibold text-white">Sarah Smith</p>
                <p className="text-gray-300 text-sm">
                  "Really enjoyed the cinematography."
                </p>
              </div>
            </div>

            
                        <button
              className="w-full bg-white text-black font-semibold p-3 rounded-lg hover:bg-gray-200 transition"
              onClick={handleRent}
            >
              Rent Movie
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowsePage;
