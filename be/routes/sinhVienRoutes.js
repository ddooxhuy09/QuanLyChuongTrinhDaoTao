const express = require("express");
const router = express.Router();
const SinhVienController = require("../controllers/sinhVienController");
const { verifyToken, restrictTo } = require("../middleware/auth");

const sinhVienController = new SinhVienController();

// Route thêm sinh viên, chỉ PHONGDAOTAO được phép
router.post(
  "/sinhvien/them",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => sinhVienController.themSinhVien(req, res)
);

// Lấy danh sách sinh viên
router.get("/sinhvien", verifyToken, restrictTo("Phòng đào tạo"), (req, res) =>
  sinhVienController.layDanhSachSinhVien(req, res)
);

// Route mới: Lấy tất cả chương trình đào tạo của sinh viên hiện tại dựa trên token
// Phải đặt trước route có parameter để tránh xung đột
router.get(
  "/sinhvien/my-chuongtrinhdaotao",
  verifyToken,
  restrictTo("Sinh Viên"),
  (req, res) => sinhVienController.layTatCaChuongTrinhDaoTaoCuaSinhVienHienTai(req, res)
);

// Debug route để kiểm tra token
router.get(
  "/sinhvien/debug-token",
  verifyToken,
  (req, res) => sinhVienController.debugToken(req, res)
);

// Lấy sinh viên theo mã
router.get(
  "/sinhvien/:maSinhVien",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => sinhVienController.laySinhVienTheoMa(req, res)
);

// Lấy chương trình đào tạo của sinh viên - Có thể truy cập bởi chính sinh viên đó hoặc phòng đào tạo
router.get(
  "/sinhvien/:maSinhVien/chuongtrinhdaotao",
  verifyToken,
  (req, res) => sinhVienController.layChuongTrinhDaoTaoCuaSinhVien(req, res)
);

// Cập nhật sinh viên
router.put(
  "/sinhvien/capnhat",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => sinhVienController.capNhatSinhVien(req, res)
);

// Xóa sinh viên
router.delete(
  "/sinhvien/xoa/:maSinhVien",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => sinhVienController.xoaSinhVien(req, res)
);

module.exports = router;
