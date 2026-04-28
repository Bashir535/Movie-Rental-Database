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
    const res = await api.get("/movies/all");
    return res.data;
};

export const deleteMovie = async (movieID) => {
  const res = await api.delete(`/movies/${movieID}/delete`);
  return res.data;
};
