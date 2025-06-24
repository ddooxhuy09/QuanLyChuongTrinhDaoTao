const express = require("express");
const router = express.Router();
const ChuongTrinhDaoTaoController = require("../controllers/chuongTrinhDaoTaoController");
const { verifyToken, restrictTo } = require("../middleware/auth");

const chuongTrinhDaoTaoController = new ChuongTrinhDaoTaoController();

// API lấy danh sách chương trình đào tạo
router.get(
  "/chuongtrinhdaotao",
  verifyToken,
  restrictTo("Phòng đào tạo", "Sinh viên", "Giảng Viên"),
  (req, res) =>
    chuongTrinhDaoTaoController.getDanhSachChuongTrinhDaoTao(req, res)
);

// API GET chung cho cả xem toàn bộ CTĐT và xem học kỳ cụ thể
router.get(
  "/chuongtrinhdaotao/:machuongtrinh",
  verifyToken,
  restrictTo("Phòng đào tạo", "Sinh viên", "Giảng Viên"),
  (req, res) => chuongTrinhDaoTaoController.xemChiTietChuongTrinh(req, res)
);

// API thêm môn học vào CTĐT
router.post(
  "/chuongtrinhdaotao/:machuongtrinh",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => chuongTrinhDaoTaoController.themMonHocVaoCTDT(req, res)
);

// API xóa môn học khỏi CTĐT
router.delete(
  "/chuongtrinhdaotao/:machuongtrinh/monhoc/:mamonhoc",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => chuongTrinhDaoTaoController.xoaMonHocKhoiCTDT(req, res)
);

// API cập nhật học kỳ cho môn học trong CTĐT
router.patch(
  "/chuongtrinhdaotao/:machuongtrinh/monhoc/:mamonhoc",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => chuongTrinhDaoTaoController.capNhatHocKyMonHoc(req, res)
);

// API lấy thông tin chuyên ngành theo mã chương trình đào tạo
router.get(
  "/chuongtrinhdaotao/:machuongtrinh/chuyennganh",
  verifyToken,
  restrictTo("Phòng đào tạo", "Sinh viên", "Giảng Viên"),
  (req, res) => chuongTrinhDaoTaoController.getChuyenNganhByMaCT(req, res)
);

// API thêm môn tự chọn vào học kỳ
router.post(
  "/chuongtrinhdaotao/:machuongtrinh/montuchon",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => chuongTrinhDaoTaoController.themMonTuChonVaoHocKy(req, res)
);

// API xóa môn tự chọn khỏi học kỳ
router.delete(
  "/chuongtrinhdaotao/:machuongtrinh/montuchon/:mamonhoc",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => chuongTrinhDaoTaoController.xoaMonTuChonKhoiHocKy(req, res)
);

// API lấy danh sách môn tự chọn
router.get(
  "/chuongtrinhdaotao/:machuongtrinh/montuchon",
  verifyToken,
  restrictTo("Phòng đào tạo", "Sinh viên", "Giảng Viên"),
  (req, res) => chuongTrinhDaoTaoController.getDanhSachMonTuChon(req, res)
);

router.get(
  "/ctdt",
  verifyToken,
  restrictTo("Phòng đào tạo", "Sinh viên", "Giảng Viên"),
  (req, res) =>
    chuongTrinhDaoTaoController.getDanhSachChuongTrinhDaoTao(req, res)
);
// API thêm chương trình đào tạo
router.post(
  "/ctdt/them",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => chuongTrinhDaoTaoController.themChuongTrinhDaoTao(req, res)
);

// API xóa chương trình đào tạo
router.delete(
  "/ctdt/xoa/:maChuongTrinh",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => chuongTrinhDaoTaoController.xoaChuongTrinhDaoTao(req, res)
);

// API cập nhật chương trình đào tạo
router.put(
  "/ctdt/capnhat",
  verifyToken,
  restrictTo("Phòng đào tạo"),
  (req, res) => chuongTrinhDaoTaoController.capNhatChuongTrinhDaoTao(req, res)
);

// Public routes (không cần authentication)
// API public lấy danh sách chương trình đào tạo
router.get("/public/chuongtrinhdaotao", (req, res) =>
  chuongTrinhDaoTaoController.getDanhSachChuongTrinhDaoTao(req, res)
);

// API public lấy chi tiết chương trình đào tạo
router.get("/public/chuongtrinhdaotao/:machuongtrinh", (req, res) =>
  chuongTrinhDaoTaoController.xemChiTietChuongTrinh(req, res)
);

// API public lấy thông tin chuyên ngành theo mã chương trình đào tạo
router.get("/public/chuongtrinhdaotao/:machuongtrinh/chuyennganh", (req, res) =>
  chuongTrinhDaoTaoController.getChuyenNganhByMaCT(req, res)
);

// API public lấy danh sách môn tự chọn
router.get("/public/chuongtrinhdaotao/:machuongtrinh/montuchon", (req, res) =>
  chuongTrinhDaoTaoController.getDanhSachMonTuChon(req, res)
);

module.exports = router;
