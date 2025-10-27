import { toast } from "react-toastify";

interface Data {
  success: boolean,
  message: string,
  data: any,
  error: string,
}
export const handleApiError = (status: number, data: Data) => {
  const message = data.message ?? "Đã xảy ra lỗi!";
  const error = data.error;

  switch (status) {
    case 400:
      toast.error(message || "Dữ liệu không hợp lệ!");
      console.error("Bad Request:", error);
      break;

    case 401:
      toast.error(message || "Bạn chưa đăng nhập hoặc token hết hạn!");
      console.warn("Unauthorized:", error);
      break;

    case 403:
      toast.warning(message || "Bạn không có quyền truy cập!");
      console.warn("Forbidden:", error);
      break;

    case 404:
      toast.error(message || "Không tìm thấy tài nguyên!");
      console.error("Not Found:", error);
      break;

    case 500:
      toast.error(message || "Lỗi máy chủ!");
      console.error("Server Error:", error);
      break;

    default:
      toast.error(message || `Lỗi không xác định (${status})`);
      console.error(`Lỗi ${status}:`, error);
      break;
  }
};
