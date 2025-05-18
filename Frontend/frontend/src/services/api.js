import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8083",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // <-- ADD THIS LINE
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
