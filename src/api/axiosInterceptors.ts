import axios from 'axios';
import { refreshTokenApi } from './authApi';
import { handleApiError } from '../utils/errorHelper';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (Đã ổn)
axiosInstance.interceptors.request.use(
  request => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !request.headers['Authorization']) { // Thêm check để không ghi đè
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response Interceptor (SỬA LẠI)
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (!error.response) {
      console.error('Không thể kết nối tới server:', error.message);
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // 1. SỬA: Thêm các URL không cần refresh
    const publicUrls = [
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/refresh-token'
    ];
    const isPublicUrl = publicUrls.includes(originalRequest.url);

    // 2. SỬA: Thêm điều kiện !isPublicUrl
    if (error.response.status === 401 && !originalRequest._retry && !isPublicUrl) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // Chuyển hướng về login nếu không có refresh token
          window.location.href = '/login';
          return Promise.reject(error);
        }

        const response = await refreshTokenApi(refreshToken);

        // 3. SỬA: Giả định API refresh cũng bọc trong .data
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;

        // Nếu accessToken vẫn undefined (do API không bọc data), dùng dòng này:
        // const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Cập nhật default header cho các request tương lai
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // 4. SỬA: Cập nhật header cho request *gốc* đang bị lỗi
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest); // Gửi lại request

      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // 5. SỬA: Chỉ hiện toast lỗi cho các private URL
    if (error.response && !isPublicUrl) {
      const { status, data } = error.response;
      handleApiError(status, data);
    }

    return Promise.reject(error); // Trả lỗi về cho component (ví dụ: Login)
  },
);

export default axiosInstance;