import axios, { AxiosError, AxiosInstance } from "axios";

const API_BASE_URL = "http://localhost:4000"; // Replace with your Go server's URL

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)

    const token = localStorage.getItem("token");
    console.log("🚀 ~ token:", token)

    if (!token) {
      return config;
    }

    // const accessToken = JSON.parse(token);
    const accessToken = token;

    // If token is present, add it to request's Authorization Header
    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

export default api;
