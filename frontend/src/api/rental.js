import api from "./api";

export const rentMovie = async (customerID, movieID) => {
  const res = await api.post("/rentals/rent", {
    customerID,
    movieID,
  });
  return res.data;
};

export const getUserRentedMovies = async (customerID) => {
  const res = await api.get(`/rentals/user/${customerID}`);
  return res.data; 
};
