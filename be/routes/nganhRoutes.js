const express = require("express");
const router = express.Router();
const NganhController = require("../controllers/nganhController");
const { verifyToken, restrictTo } = require("../middleware/auth");

const nganhController = new NganhController();

// API lấy danh sách ngành
router.get("/nganh", verifyToken, (req, res) =>
  nganhController.layDanhSachNganh(req, res)
);
router.get("/nganh/:maNganh", verifyToken, (req, res) =>
  nganhController.layNganhTheoMa(req, res)
);
router.post(
  "/nganh/them",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => nganhController.themNganh(req, res)
);
router.put(
  "/nganh/capnhat",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => nganhController.capNhatNganh(req, res)
);
router.delete(
  "/nganh/xoa/:maNganh",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => nganhController.xoaNganh(req, res)
);

module.exports = router;
