import { getMovieImage } from "../api/movie";

const RentedMovieCard = ({ rental, onClick }) => {
  return (
    <div
      onClick={() => onClick(rental)}
      className="cursor-pointer bg-neutral-900 p-4 rounded-xl border border-neutral-800 shadow-lg hover:border-white transition"
    >
      <div className="h-48 bg-neutral-800 rounded-lg mb-3 overflow-hidden">
        <img
          src={getMovieImage(rental.movieID)}
          alt={rental.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-lg font-semibold">{rental.title}</h3>

      <p className="text-gray-400 text-sm">
        Status: {rental.status}
      </p>

      <p className="text-gray-400 text-sm">
        Rented: {rental.rentalDate.substring(0, 10)}
      </p>
    </div>
  );
};

export default RentedMovieCard;