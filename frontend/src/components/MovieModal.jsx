import { useSelector } from "react-redux";
import { getMovieImage } from "../api/movie";
import { rentMovie } from "../api/rental";
import { createRating, getMovieRatings } from "../api/rating";
import { useEffect, useState } from "react";

const MovieModal = ({ movie, onClose, onRented, onReviewAdded }) => {

  const authUser = useSelector(state => state.auth.user);

  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");

  const [reviews, setReviews] = useState([]);

  const averageRating = reviews.length
  ? (reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length).toFixed(1)
  : null;

  const hasReviewed = reviews.some(r => r.customerID === authUser.customerID);


  const loadReviews = () => {
    getMovieRatings(movie.movieID)
      .then(data => setReviews(data))
      .catch(err => console.error("Failed to load reviews:", err));
  };

  useEffect(() => {
    loadReviews();
  }, [movie.movieID]);

  
  const handleRent = async () => {
    try {
      await rentMovie(authUser.customerID, movie.movieID);
      onRented();      
      onClose();
    } catch (err) {
      console.error("Rent failed:", err);
    }
  };

  const handleReviewSubmit = async () => {
    const dto = {
      movieID: movie.movieID,
      customerID: authUser.customerID,
      score,
      comment
    };

    try {
      await createRating(dto);
      setComment("");
      setScore(5);
      loadReviews();
      if (onReviewAdded) onReviewAdded();
    } catch (e) {
      console.error("review failed", e);
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

      {averageRating && (
        <p className="text-yellow-400 text-lg font-semibold mb-2">
            ⭐ {averageRating} / 5 ({reviews.length} reviews)
        </p>
        )}

        {!averageRating && (
        <p className="text-gray-400 text-sm mb-2">
            No ratings yet.
        </p>
        )}


      <div className="grid grid-cols-2 gap-4 mb-6">
        <p><span className="font-semibold">Genre:</span> {movie.genre}</p>
        <p><span className="font-semibold">Release Year:</span> {movie.releaseYear}</p>
        <p><span className="font-semibold">Rental Rate:</span> {movie.rentalRate}</p>
        <p><span className="font-semibold">Stock:</span> {movie.stock}</p>
      </div>

      <button className="w-full bg-white text-black font-semibold p-3 rounded-lg hover:bg-gray-200 transition" onClick={handleRent}>
        Rent Movie
      </button>

      {/* Review Section */}
        <h3 className="text-xl font-semibold mb-3">Write a Review</h3>

        <label className="block mb-2 text-gray-300">Rating (1–5)</label>
        <select
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="bg-neutral-800 text-white p-2 rounded mb-4 w-full border border-neutral-700"
        >
          <option value={5}>5 - Excellent</option>
          <option value={4}>4 - Good</option>
          <option value={3}>3 - Average</option>
          <option value={2}>2 - Poor</option>
          <option value={1}>1 - Terrible</option>
        </select>

        <label className="block mb-2 text-gray-300">Comment</label>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows="4"
          className="bg-neutral-800 text-white p-3 rounded w-full border border-neutral-700 mb-4"
        ></textarea>

        <button
          onClick={handleReviewSubmit}
          className="w-full bg-white text-black font-semibold p-3 rounded-lg hover:bg-gray-200 transition"
        >
          Submit Review
        </button>

        <h3 className="text-xl font-semibold mt-8 mb-3">Reviews</h3>

        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">

        {reviews.length === 0 && (
            <p className="text-gray-400 text-sm">No reviews yet.</p>
        )}

        {reviews.map((r) => (
            <div
            key={r.ratingID}
            className="bg-neutral-800 p-4 rounded-lg border border-neutral-700"
            >
            <p className="font-semibold text-white">
                {r.customerName} — ⭐ {r.score}/5
            </p>

            {r.comment && (
                <p className="text-gray-300 text-sm mt-1">{r.comment}</p>
            )}

            <p className="text-gray-500 text-xs mt-2">
                {r.ratingDate?.replace("T", " ").substring(0, 16)}
            </p>
            </div>
        ))}

        </div>
    </div>
  </div>);
};

export default MovieModal;