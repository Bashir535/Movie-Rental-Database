import api from "./api";

export const getUserRentals = async (customerID) => {
  const res = await api.get(`/rentals/user/${customerID}`);
  return res.data;
};

export const returnRental = async (rentalID) => {
  const res = await api.post(`/rentals/${rentalID}/return`);
  return res.data;
};

export const rentMovie = async (customerID, movieID) => {
  const res = await api.post(`/rentals/rent/${customerID}/${movieID}`);
  return res.data;
};