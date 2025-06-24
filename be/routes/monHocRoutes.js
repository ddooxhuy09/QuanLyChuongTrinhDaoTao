const express = require("express");
const router = express.Router();
const MonHocController = require("../controllers/monHocController");
const { verifyToken, restrictTo } = require("../middleware/auth");

const monHocController = new MonHocController();

// API lấy danh sách môn học
router.get("/monhoc", verifyToken, (req, res) =>
  monHocController.getDanhSachMonHoc(req, res)
);

// API lấy chi tiết môn học theo mã
router.get("/monhoc/:mamonhoc", verifyToken, (req, res) =>
  monHocController.getMonHocByMa(req, res)
);

// API thêm môn học mới
router.post("/monhoc", verifyToken, restrictTo("Phòng đào tạo"), (req, res) =>
  monHocController.themMonHoc(req, res)
);

// API cập nhật một phần thông tin môn học
router.patch(
  "/monhoc/:mamonhoc",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => monHocController.capNhatMonHoc(req, res)
);

// API thay thế hoàn toàn thông tin môn học
router.put(
  "/monhoc/:mamonhoc",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => monHocController.thayTheMonHoc(req, res)
);

// API xóa môn học
router.delete(
  "/monhoc/:mamonhoc",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => monHocController.xoaMonHoc(req, res)
);

// API lấy các môn học của giảng viên
router.get(
  "/monhoc/giangvien/:maGiangVien",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => monHocController.layMonHocTheoGiangVien(req, res)
);

// API cập nhật danh sách môn học cho giảng viên
router.post(
  "/monhoc/giangvien/capnhat",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => monHocController.capNhatMonHocChoGiangVien(req, res)
);

module.exports = router;
