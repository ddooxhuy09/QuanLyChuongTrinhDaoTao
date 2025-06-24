const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/dashboardController");
const { verifyToken, restrictTo } = require("../middleware/auth");

const dashboardController = new DashboardController();

router.get("/dashboard/summary", verifyToken, restrictTo("Phòng đào tạo"), (req, res) =>
  dashboardController.getSummary(req, res)
);
router.get("/dashboard/top-nganh-sinhvien", verifyToken, restrictTo("Phòng đào tạo"), (req, res) =>
  dashboardController.getTopNganhSinhVien(req, res)
);
router.get("/dashboard/sinhvien-nienkhoa", verifyToken, restrictTo("Phòng đào tạo"), (req, res) =>
  dashboardController.getSinhVienNienKhoa(req, res)
);
router.get("/dashboard/giangvien-khoa", verifyToken, restrictTo("Phòng đào tạo"), (req, res) =>
  dashboardController.getGiangVienKhoa(req, res)
);
router.get("/dashboard/monhoc-ctdt", verifyToken, restrictTo("Phòng đào tạo"), (req, res) =>
  dashboardController.getMonHocCTDT(req, res)
);

// Debug endpoint để kiểm tra user info
router.get("/dashboard/debug/user", verifyToken, (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user,
      headers: req.headers.authorization,
      timestamp: new Date().toISOString()
    }
  });
});

// Test endpoint không cần role restriction
router.get("/dashboard/test", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Test endpoint works!",
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

// Test dashboard endpoints với mock data
router.get("/dashboard/mock/summary", verifyToken, restrictTo("Phòng đào tạo"), (req, res) => {
  res.json({
    success: true,
    data: {
      soSinhVien: 1500,
      soGiangVien: 120,
      soNganh: 15,
      soKhoa: 8,
      soChuongTrinhDaoTao: 25,
      soMonHoc: 300
    }
  });
});

router.get("/dashboard/mock/top-nganh-sinhvien", verifyToken, restrictTo("Phòng đào tạo"), (req, res) => {
  res.json({
    success: true,
    data: [
      { TenNganh: "Công nghệ thông tin", soSinhVien: 450 },
      { TenNganh: "Kế toán", soSinhVien: 320 },
      { TenNganh: "Quản trị kinh doanh", soSinhVien: 280 },
      { TenNganh: "Điện tử viễn thông", soSinhVien: 200 },
      { TenNganh: "Tài chính ngân hàng", soSinhVien: 150 }
    ]
  });
});

module.exports = router;
