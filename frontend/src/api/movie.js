import api from "./api";

export const createMovie = async (formData) => {
    const res = await api.post("/movies/create", formData);
    return res.data;
};

export const getMovie = async (id) => {
  const res = await api.get(`/movies/${id}`);
  return res.data;
};

export const getMovieImage = (id) => {
  return `${import.meta.env.VITE_BACK_END_URL}/api/movies/${id}/image`;
};

export const getAllMovies = async () => {
  const res = await api.get("/movies");
  return res.data;
};
