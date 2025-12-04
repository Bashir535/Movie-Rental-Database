import RentedMovieCard from "./RentedMovieCard";

const RentedMovieGrid = ({ rentals, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {rentals.map(r => (
        <RentedMovieCard key={r.rentalID} rental={r} onClick={onSelect} />
      ))}
    </div>
  );
};

export default RentedMovieGrid;