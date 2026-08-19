import api from "../../../config/api";

export const contentApi = async (data, action) => {
  const res = await api.post(`/v1/content/generate/${action}`, data);
  return res.data;
};
export const getContentHistoryApi = async () => {
  const res = await api.get(`/v1/content/history`);
  return res.data.content;
};
export const searchContentApi = async (searchQuery) => {
  const res = await api.get(`/v1/content/search/?query=${searchQuery}`);
  return res.data.content;
};
export const getContentByIdApi = async (id) => {
  return await api.get(`/v1/content/content-details/${id}`);
}