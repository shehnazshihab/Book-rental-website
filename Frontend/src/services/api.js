// src/services/api.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3005', // Replace with your actual backend URL
  timeout: 5000, // Timeout after 5 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
