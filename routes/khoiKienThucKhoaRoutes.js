const express = require('express');
const router = express.Router();
const KhoiKienThucKhoaController = require('../controllers/khoiKienThucKhoaController');

// Khởi tạo controller
const khoiKienThucKhoaController = new KhoiKienThucKhoaController();

// Route thêm quan hệ khối kiến thức - khoa
router.post('/', (req, res) => khoiKienThucKhoaController.themKhoiKienThucKhoa(req, res));

// Route lấy danh sách quan hệ khối kiến thức - khoa
router.get('/', (req, res) => khoiKienThucKhoaController.layDanhSachKhoiKienThucKhoa(req, res));

module.exports = router;