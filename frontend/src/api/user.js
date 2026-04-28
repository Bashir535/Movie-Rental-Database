import api from "./api";

export const updateUser = async (customerID, data) => {
  const res = await api.put(`/users/${customerID}/update`, data);
  return res.data;
};