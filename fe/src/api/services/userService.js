// src/services/userService.js
import apiClient from "../config/apiClient";

// Hàm đăng nhập
export const loginUser = async ({ tenDangNhap, matKhau }) => {
  try {
    const response = await apiClient.post("/user/dangnhap", {
      tenDangNhap,
      matKhau,
    });

    const data = response.data;

    if (data.success) {
      // Lưu token
      localStorage.setItem("access_token", data.access_token);

      // Lưu thông tin người dùng
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          name: data.name,
          roles: data.roles,
          maKhoa: data.maKhoa,
          tenKhoa: data.tenKhoa,
        })
      );

      return { success: true, user: data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    // Nếu lỗi đến từ backend và có message
    const message =
      error.response?.data?.message || "Đã xảy ra lỗi không xác định.";
    return { success: false, message };
  }
};

// Hàm logout
export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
};

// Lấy thông tin chi tiết user
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get("/user/profile");
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Đã xảy ra lỗi không xác định.";
    return { success: false, message };
  }
};

// Đổi mật khẩu
export const changePassword = async ({ matKhauCu, matKhauMoi }) => {
  try {
    const response = await apiClient.put("/user/password", {
      matKhauCu,
      matKhauMoi,
    });

    return response.data;
  } catch (error) {
    console.error("Error in changePassword:", error);
    const message =
      error.response?.data?.message || "Đã xảy ra lỗi không xác định.";
    return { success: false, message };
  }
};

// Lấy chương trình đào tạo của sinh viên hiện tại
export const getMyChuongTrinhDaoTaoFromUser = async () => {
  try {
    const response = await apiClient.get("/user/my-chuongtrinhdaotao");
    return response.data;
  } catch (error) {
    console.error("Error in getMyChuongTrinhDaoTaoFromUser:", error);
    const message =
      error.response?.data?.message || "Đã xảy ra lỗi không xác định.";
    return { success: false, message };
  }
};


