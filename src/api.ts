// src/api.ts
import axios from "axios";

// Create an axios instance with default settings
const api = axios.create({
  baseURL: "https://eventkonnect-be-1.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
