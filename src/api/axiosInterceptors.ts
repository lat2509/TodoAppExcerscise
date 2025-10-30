import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { refreshTokenApi } from './authApi';
import { handleApiError } from '../utils/errorHelper';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  request => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  error => Promise.reject(error),
);

const refreshAuthLogic = async (failedRequest: any) => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    localStorage.removeItem('accessToken');
    return Promise.reject(failedRequest);
  }

  try {
    const res = await refreshTokenApi(refreshToken);

    const { refreshToken: newRefreshToken, accessToken: newAccessToken } =
      res.data.data;

    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    failedRequest.response.config.headers['Authorization'] =
      `Bearer ${newAccessToken}`;
    return Promise.resolve();
  } catch (err) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return Promise.reject(err);
  }
};

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
  pauseInstanceWhileRefreshing: true, // chờ refresh xong mới gửi các request khác
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status, data } = error.response;
      handleApiError(status, data);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
