import { returnRental } from "../api/rental";

const RentedMovieModal = ({ rental, onClose, onReturned }) => {

  const handleReturn = async () => {
    try {
      await returnRental(rental.rentalID);
      onReturned();     
      onClose();
    } catch (err) {
      console.error("Return failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-neutral-900 w-full max-w-lg p-8 rounded-xl border border-neutral-800 relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white transition"
        >
          ✕
        </button>

        <h2 className="text-3xl font-semibold mb-4">{rental.title}</h2>

        <div className="h-60 bg-neutral-800 rounded-lg mb-6"></div>

        <p className="text-gray-300 mb-2">
          <span className="font-semibold text-white">Rental ID:</span> {rental.rentalID}
        </p>

        <p className="text-gray-300 mb-2">
          <span className="font-semibold text-white">Rental Date:</span>{" "}
          {rental.rentalDate}
        </p>

        <p className="text-gray-300 mb-2">
          <span className="font-semibold text-white">Due Date:</span>{" "}
          {rental.dueDate}
        </p>

        <p className="text-gray-300 mb-2">
          <span className="font-semibold text-white">Return Date:</span>{" "}
          {rental.returnDate ?? "Not returned"}
        </p>

        <p className="text-gray-300 mb-6">
          <span className="font-semibold text-white">Status:</span>{" "}
          {rental.status}
        </p>

        {rental.returnDate === null && (
          <button
            onClick={handleReturn}
            className="w-full bg-white text-black font-semibold p-3 rounded-lg hover:bg-gray-200 transition"
          >
            Return Movie
          </button>
        )}

      </div>
    </div>
  );
};

export default RentedMovieModal;