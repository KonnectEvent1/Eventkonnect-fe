// src/api.ts
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// Create axios instance with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Log for debugging
      console.log("=== API ERROR ===");
      console.log("Status:", status);
      console.log("URL:", error.config?.url);
      console.log("Method:", error.config?.method?.toUpperCase());
      console.log("Response Data:", JSON.stringify(data, null, 2));

      switch (status) {
        case 401:
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          window.location.href = "/login";
          break;
        case 403:
          console.error("Forbidden:", data.error);
          break;
        case 404:
          console.error("Not found:", data.error);
          break;
        case 500:
          console.error("Server error:", data.error);
          break;
        default:
          console.error("Error:", data);
      }

      // Return the full error data for better error messages
      return Promise.reject(data || { error: "Request failed", message: error.message });
    }

    return Promise.reject({ error: "Network error", message: error.message });
  }
);

export default api;
