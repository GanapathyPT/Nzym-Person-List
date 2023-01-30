import axios from "axios";

const BASE_URL = "https://fakerapi.it/api/v1/";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);
