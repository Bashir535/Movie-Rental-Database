import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAllMovies } from "../../api/movie";
import MovieCard from "../../components/MovieCard";
import MovieModal from "../../components/MovieModal";

const BrowsePage = () => {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const loadMovies = () => {
    getAllMovies().then(setMovies);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <Link
        to="/userhome"
        className="text-gray-300 hover:text-white transition font-medium"
      >
        ← Home
      </Link>

      <div className="max-w-5xl mx-auto space-y-4">
        {movies.map((mv) => (
          <MovieCard key={mv.movieID} movie={mv} onClick={openModal} />
        ))}
      </div>

      {open && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} onRented={loadMovies} onReviewAdded={() => console.log("review added")}/>
      )}
    </div>
  );
};

export default BrowsePage;