import { useState } from "react";
import { createMovie, getMovie, getMovieImage } from "../../api/movie";
import MovieDelete from "./MovieDelete";

const CreateMovie = () => {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [stock, setStock] = useState("");
    const [rentalRate, setRentalRate] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const [movieData, setMovieData] = useState(null);
    const [movieId, setMovieId] = useState("");

    const handleCreate = async () => {  
        const fd = new FormData();
        fd.append("title", title);
        fd.append("genre", genre);
        fd.append("releaseYear", releaseYear);
        fd.append("stock", stock);
        fd.append("rentalRate", rentalRate);

        if (imageFile) {
            fd.append("image", imageFile);
        }

        const res = await createMovie(fd);

        alert("Movie created. Enter ID to fetch.");

        // If your backend returns the created ID, you can auto-fetch:
        // setMovieId(res.movieID);
    };

  const handleGet = async () => {
    if (!movieId) return;

    const data = await getMovie(movieId);
    setMovieData(data);
  };

  return (
    <div className="p-10 bg-neutral-900 text-white min-h-screen space-y-8">
      <h1 className="text-3xl font-semibold">Movie Creation</h1>

      <div className="space-y-3 bg-neutral-800 p-6 rounded-lg">
        <h2 className="text-xl">Create Movie</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 bg-neutral-700 rounded"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Genre"
          className="w-full p-2 bg-neutral-700 rounded"
          onChange={(e) => setGenre(e.target.value)}
        />

        <input
          type="number"
          placeholder="Release Year"
          className="w-full p-2 bg-neutral-700 rounded"
          onChange={(e) => setReleaseYear(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          className="w-full p-2 bg-neutral-700 rounded"
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          type="number"
          placeholder="Rental Rate"
          step="0.01"
          className="w-full p-2 bg-neutral-700 rounded"
          onChange={(e) => setRentalRate(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="w-full p-2 bg-neutral-700 rounded"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
          onClick={handleCreate}
        >
          Create Movie
        </button>
      </div>

      <div className="space-y-3 bg-neutral-800 p-6 rounded-lg">
        <h2 className="text-xl">Fetch Movie</h2>

        <input
          type="number"
          placeholder="Movie ID"
          className="w-full p-2 bg-neutral-700 rounded"
          onChange={(e) => setMovieId(e.target.value)}
        />

        <button
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
          onClick={handleGet}
        >
          Get Movie
        </button>
      </div>

      {movieData && (
        <div className="bg-neutral-800 p-6 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold">Movie Data</h3>

          <p><strong>Title:</strong> {movieData.title}</p>
          <p><strong>Genre:</strong> {movieData.genre}</p>
          <p><strong>Release Year:</strong> {movieData.releaseYear}</p>
          <p><strong>Stock:</strong> {movieData.stock}</p>
          <p><strong>Rental Rate:</strong> ${movieData.rentalRate}</p>

          <img
            src={getMovieImage(movieId)}
            className="w-48 h-auto border rounded"
            alt="Movie Poster"
          />
        </div>
      )}

      <MovieDelete />
    </div>
  );
}

export default CreateMovie;

