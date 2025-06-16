const express = require('express');
const router = express.Router();
const KhoiKienThucController = require('../controllers/khoiKienThucController');
const { verifyToken, restrictTo } = require('../middleware/auth');

const khoiKienThucController = new KhoiKienThucController();

// API lấy danh sách khối kiến thức theo cấu trúc phân cấp
router.get('/khoikienthuc',
    verifyToken,
    restrictTo('Phòng đào tạo', 'Sinh viên', 'Giảng viên'),
    (req, res) => khoiKienThucController.getDanhSachKhoiKienThuc(req, res));

// API lấy danh sách môn học theo khối kiến thức
router.get('/khoikienthuc/:makhoikienthuc',
    verifyToken,
    restrictTo('Phòng đào tạo', 'Sinh viên', 'Giảng viên'),
    (req, res) => khoiKienThucController.getDanhSachMonHocByKhoiKienThuc(req, res));

module.exports = router;