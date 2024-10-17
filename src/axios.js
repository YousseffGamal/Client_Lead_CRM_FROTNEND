// axiosInstance.js
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Replace with your API base URL
  timeout: 20000, // Optional: Set a timeout for requests
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from cookies

    const token = localStorage.getItem("token"); // Replace 'token' with the name of your cookie
    if (token) {
      // Attach token to request headers
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errorsc
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors

    return Promise.reject(error);
  }
);

export default axiosInstance;
