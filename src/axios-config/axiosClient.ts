import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

// ===== RESPONSE INTERCEPTOR =====
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Có thể tùy chỉnh để chỉ trả về phần data
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error('Bad Request:', data);
          break;
        case 401:
          console.warn('Unauthorized - cần đăng nhập lại');

          window.location.href = '/login';
          break;
        case 403:
          console.warn('Forbidden - không có quyền truy cập');
          break;
        case 404:
          console.warn('API không tồn tại');
          break;
        case 500:
          console.error('Lỗi server nội bộ');
          break;
        default:
          console.error(`Lỗi ${status}:`, data);
          break;
      }
    } else {
      console.error('Không thể kết nối đến server:', error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
