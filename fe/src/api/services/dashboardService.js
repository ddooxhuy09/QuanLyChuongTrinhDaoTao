import apiClient from "../config/apiClient";

export const getSummary = async (token) => {
  return apiClient.get("/dashboard/summary");
};

export const getTopNganhSinhVien = async (token) => {
  return apiClient.get("/dashboard/top-nganh-sinhvien");
};

export const getSinhVienNienKhoa = async (token) => {
  return apiClient.get("/dashboard/sinhvien-nienkhoa");
};

export const getGiangVienKhoa = async (token) => {
  return apiClient.get("/dashboard/giangvien-khoa");
};

export const getMonHocCtdt = async (token) => {
  return apiClient.get("/dashboard/monhoc-ctdt");
};

export const getUserDebugInfo = async () => {
  return apiClient.get("/dashboard/debug/user");
};

export const getTestEndpoint = async () => {
  return apiClient.get("/dashboard/test");
};

// Mock dashboard services để test
export const getMockSummary = async () => {
  return apiClient.get("/dashboard/mock/summary");
};

export const getMockTopNganh = async () => {
  return apiClient.get("/dashboard/mock/top-nganh-sinhvien");
};
