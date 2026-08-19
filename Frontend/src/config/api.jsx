import axios from 'axios'

const api = axios.create({
    baseURL: "https://generator-cms.onrender.com",
})


api.interceptors.request.use(
  (config) => {
    // add token in the headers
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;