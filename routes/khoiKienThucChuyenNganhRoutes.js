const express = require('express');
const router = express.Router();
const KhoiKienThucChuyenNganhController = require('../controllers/khoiKienThucChuyenNganhController');

// Khởi tạo controller
const khoiKienThucChuyenNganhController = new KhoiKienThucChuyenNganhController();

// Route thêm quan hệ khối kiến thức - chuyên ngành
router.post('/', (req, res) => khoiKienThucChuyenNganhController.themKhoiKienThucChuyenNganh(req, res));

// Route lấy danh sách quan hệ khối kiến thức - chuyên ngành
router.get('/', (req, res) => khoiKienThucChuyenNganhController.layDanhSachKhoiKienThucChuyenNganh(req, res));

module.exports = router;