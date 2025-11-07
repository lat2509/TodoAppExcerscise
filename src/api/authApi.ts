import axios from 'axios';
import axiosInstance from './axiosInterceptors';
interface RegisterUser {
  username: string;
  password: string;
  confirmPassword: string;
}

export const refreshTokenApi = (refreshToken: string) => {
  return axios.post('http://localhost:3000/api/auth/refresh-token', {
    refreshToken,
  });
};

export const loginApi = (username: string, password: string) => {
  return axiosInstance.post('/api/auth/login', { username, password });
};

export const registerApi = (data: RegisterUser) => {
  return axiosInstance.post('/api/auth/register', data);
};

export const logoutAllApi = () => {
  return axiosInstance.post('/api/auth/logout-all');
};

export const authProfile = () => {
  return axiosInstance.get('/api/auth/profile');
};

