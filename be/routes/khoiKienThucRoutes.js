const express = require('express');
const router = express.Router();
const KhoiKienThucController = require('../controllers/khoiKienThucController');
const { verifyToken } = require('../middleware/auth');

const khoiKienThucController = new KhoiKienThucController();

// API lấy danh sách khối kiến thức theo cấu trúc phân cấp
router.get('/khoikienthuc', verifyToken, (req, res) => khoiKienThucController.getDanhSachKhoiKienThuc(req, res));

// API lấy danh sách môn học theo khối kiến thức
router.get('/khoikienthuc/:makhoikienthuc', verifyToken, (req, res) => khoiKienThucController.getDanhSachMonHocByKhoiKienThuc(req, res));

module.exports = router;