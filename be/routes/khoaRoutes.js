const express = require("express");
const router = express.Router();
const KhoaController = require("../controllers/khoaController");
const { verifyToken, restrictTo } = require("../middleware/auth");

const khoaController = new KhoaController();

router.get("/khoa", verifyToken, (req, res) =>
  khoaController.layDanhSachKhoa(req, res)
);
router.get("/khoa/:maKhoa", verifyToken, (req, res) =>
  khoaController.layKhoaTheoMa(req, res)
);
router.post(
  "/khoa/them",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => khoaController.themKhoa(req, res)
);
router.put(
  "/khoa/capnhat",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => khoaController.capNhatKhoa(req, res)
);
router.delete(
  "/khoa/xoa/:maKhoa",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => khoaController.xoaKhoa(req, res)
);

module.exports = router;
