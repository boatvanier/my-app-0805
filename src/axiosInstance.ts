import axios, { InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

// Interceptor now uses InternalAxiosRequestConfig
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  return config;
});

export const axiosInstance = <T>(config: InternalAxiosRequestConfig) => {
  return instance.request<T>(config);
};
