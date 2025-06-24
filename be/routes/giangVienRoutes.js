const express = require("express");
const router = express.Router();
const GiangVienController = require("../controllers/giangVienController");
const { verifyToken, restrictTo } = require("../middleware/auth");

const giangVienController = new GiangVienController();

// Lấy danh sách giảng viên
router.get("/giangvien", verifyToken, restrictTo("Phòng đào tạo"), (req, res) =>
  giangVienController.layDanhSachGiangVien(req, res)
);
// Lấy giảng viên theo mã
router.get(
  "/giangvien/:maGiangVien",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => giangVienController.layGiangVienTheoMa(req, res)
);
// Thêm giảng viên
router.post(
  "/giangvien/them",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => giangVienController.themGiangVien(req, res)
);
// Cập nhật giảng viên
router.put(
  "/giangvien/capnhat",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => giangVienController.capNhatGiangVien(req, res)
);
// Xóa giảng viên
router.delete(
  "/giangvien/xoa/:maGiangVien",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => giangVienController.xoaGiangVien(req, res)
);

// Lấy môn học theo giảng viên (cho giảng viên truy cập)
router.get(
  "/giangvien/:maGiangVien/monhoc",
  verifyToken,
  restrictTo("Giảng Viên", "Phòng đào tạo"),
  (req, res) => giangVienController.layMonHocTheoGiangVien(req, res)
);

module.exports = router;
