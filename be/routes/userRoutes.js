const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { verifyToken, restrictTo } = require("../middleware/auth");

const userController = new UserController();

router.post("/user/dangnhap", (req, res) => userController.dangNhap(req, res));
router.post(
  "/user/phongdaotao/them",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => userController.themPhongDaoTao(req, res)
);
router.delete(
  "/user/phongdaotao/xoa/:id",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => userController.xoaPhongDaoTao(req, res)
);
router.get(
  "/user/phongdaotao",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => userController.layDanhSachPhongDaoTao(req, res)
);

// Lấy thông tin chi tiết user
router.get(
  "/user/profile",
  verifyToken,
  (req, res) => userController.layThongTinChiTiet(req, res)
);

// Đổi mật khẩu
router.put(
  "/user/password",
  verifyToken,
  (req, res) => userController.doiMatKhau(req, res)
);

// Lấy chương trình đào tạo của sinh viên hiện tại
router.get(
  "/user/my-chuongtrinhdaotao",
  verifyToken,
  restrictTo("Sinh Viên"),
  (req, res) => userController.layChuongTrinhDaoTaoCuaToi(req, res)
);

// Test route để debug
router.get(
  "/user/test",
  verifyToken,
  (req, res) => {
    console.log("Test route - req.user:", req.user);
    res.json({
      success: true,
      message: "Authentication test successful",
      user: req.user
    });
  }
);

// Debug route để xem users trong database
router.get(
  "/user/debug",
  (req, res) => userController.debugUsers(req, res)
);

// Test route để test SP_LaySinhVienTheoMa
router.get(
  "/user/test-sinhvien/:maSinhVien",
  (req, res) => userController.testSinhVien(req, res)
);

// Test route để test SP_LayGiangVienTheoMa
router.get(
  "/user/test-giangvien/:maGiangVien",
  (req, res) => userController.testGiangVien(req, res)
);

module.exports = router;
