const express = require('express');
const router = express.Router();
const KhoiKienThucMonHocController = require('../controllers/khoiKienThucMonHocController');

// Khởi tạo controller
const khoiKienThucMonHocController = new KhoiKienThucMonHocController();

// Route thêm quan hệ khối kiến thức - môn học
router.post('/', (req, res) => khoiKienThucMonHocController.themKhoiKienThucMonHoc(req, res));

// Route lấy danh sách quan hệ khối kiến thức - môn học
router.get('/', (req, res) => khoiKienThucMonHocController.layDanhSachKhoiKienThucMonHoc(req, res));

module.exports = router;