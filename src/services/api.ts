import axios from 'axios';

const BASE_URL = 'https://api.example.com';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  // TODO: attach auth token
  // const token = useAppStore.getState().token;
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // TODO: handle session expiration
    }
    return Promise.reject(error);
  },
);
