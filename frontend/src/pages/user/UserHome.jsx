import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserRentals } from "../../api/rental";
import RentedMovieGrid from "../../components/RentedMovieGrid";
import RentedMovieModal from "../../components/RentedMovieModal";

 const UserHome = () => {
  const [rentals, setRentals] = useState([]);
  const [selectedRental, setSelectedRental] = useState(null);

  const authUser = useSelector(state => state.auth.user);

  //*********RENTALS */
  const loadRentals = () => {
    if (!authUser) return;
    getUserRentals(authUser.customerID)
      .then(data => setRentals(data))
      .catch(err => console.error(err));
  };
  useEffect(() => {
    loadRentals();
  }, [authUser]);
  //*********RENTALS */

  useEffect(() => {
    if (!authUser) return;

    getUserRentals(authUser.customerID)
      .then(data => setRentals(data))
      .catch(err => console.error("Failed to fetch rentals", err));
  }, [authUser]);

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="w-full h-[60vh] bg-neutral-900 flex items-center justify-center border-b border-neutral-800">
        <div className="text-center px-6">
          <h1 className="text-5xl font-bold mb-4">RSP Movies</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Rent and Browse for your favorite Movies
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

        <RentedMovieGrid
          rentals={rentals}
          onSelect={(r) => setSelectedRental(r)}
        />
      </div>

      {selectedRental && (
        <RentedMovieModal
          rental={selectedRental}
          onClose={() => setSelectedRental(null)}
          onReturned={loadRentals}
        />
      )}

    </div>
  );
};

export default UserHome;