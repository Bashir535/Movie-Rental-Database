import api from "./api";


export const getReviews = async (movieID) => {
  const res = await api.get(`/movies/${movieID}/reviews`);
  return res.data;
};


export const addReview = async (movieID, customerID, rating, comment) => {
  const res = await api.post(`/movies/${movieID}/reviews`, {
    customerID,
    rating,
    comment,
  });
  return res.data;
};
