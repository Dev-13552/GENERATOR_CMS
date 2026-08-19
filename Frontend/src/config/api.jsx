import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000",
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