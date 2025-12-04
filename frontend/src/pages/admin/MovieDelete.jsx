import { useEffect, useState } from "react";
import { deleteMovie, getAllMovies } from "../../api/movie";

const MovieDelete = () => {
  const [movies, setMovies] = useState([]);

  const loadMovies = () => {
    getAllMovies()
      .then(data => setMovies(data))
      .catch(err => console.error("Failed to load movies", err));
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleDelete = async (movieID) => {
    if (!confirm("Are you sure you want to delete this movie?")) return;

    try {
      await deleteMovie(movieID);
      loadMovies();    
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-8">Manage Movies</h1>

      <div className="space-y-4">
        {movies.map(movie => (
          <div
            key={movie.movieID}
            className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">{movie.title}</p>
              <p className="text-gray-400 text-sm">
                {movie.genre} | {movie.releaseYear}
              </p>
            </div>

            <button
              onClick={() => handleDelete(movie.movieID)}
              className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MovieDelete;