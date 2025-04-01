import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL = "http://localhost:8080";

export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
    (config) => {
      const token = getToken();
      console.log('Token:', token);
      if (token) {
        config.headers = config.headers || {}; // Ensure headers object is defined
        config.headers.Authorization = `Bearer ${token}`; // Set the 'Authorization' header
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
