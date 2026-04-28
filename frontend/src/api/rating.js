import api from "./api";

export const createRating = async (dto) => {
  const res = await api.post("/ratings/create", dto);
  return res.data;
};

export const getMovieRatings = async (movieID) => {
  const res = await api.get(`/ratings/movie/${movieID}`);
  return res.data;
};