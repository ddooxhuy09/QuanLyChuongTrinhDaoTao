import apiClient from "../config/apiClient";

export const getAllStudents = async (token) => {
  return apiClient.get("/sinhvien", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getStudentById = async (maSinhVien, token) => {
  return apiClient.get(`/sinhvien/${maSinhVien}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addStudent = async (data, token) => {
  return apiClient.post("/sinhvien/them", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateStudent = async (data, token) => {
  return apiClient.put("/sinhvien/capnhat", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteStudent = async (maSinhVien, token) => {
  return apiClient.delete(`/sinhvien/xoa/${maSinhVien}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Lấy chương trình đào tạo của sinh viên hiện tại
export const getMyChuongTrinhDaoTao = async () => {
  try {
    // Lấy thông tin user từ localStorage để biết mã sinh viên
    const userInfo = localStorage.getItem("user");
    if (!userInfo) {
      throw new Error("Không tìm thấy thông tin đăng nhập");
    }

    const user = JSON.parse(userInfo);
    const maSinhVien = user.maSinhVien || user.MaSinhVien || user.ID;

    if (!maSinhVien) {
      throw new Error("Không tìm thấy mã sinh viên");
    }

    const response = await apiClient.get(`/api/sinhvien/${maSinhVien}/chuongtrinhdaotao`);
    return response.data;
  } catch (error) {
    console.error("Error in getMyChuongTrinhDaoTao:", error);
    throw error;
  }
};

// Service mới: Lấy tất cả chương trình đào tạo của sinh viên hiện tại dựa trên token
export const getAllMyChuongTrinhDaoTao = async () => {
  try {
    const response = await apiClient.get("/api/sinhvien/my-chuongtrinhdaotao");
    return response.data;
  } catch (error) {
    console.error("Error in getAllMyChuongTrinhDaoTao:", error);
    throw error;
  }
};

// Lấy chương trình đào tạo của sinh viên theo mã (cho admin/phòng đào tạo)
export const getChuongTrinhDaoTaoByMaSinhVien = async (maSinhVien) => {
  try {
    const response = await apiClient.get(`/api/sinhvien/${maSinhVien}/chuongtrinhdaotao`);
    return response.data;
  } catch (error) {
    console.error("Error in getChuongTrinhDaoTaoByMaSinhVien:", error);
    throw error;
  }
};
