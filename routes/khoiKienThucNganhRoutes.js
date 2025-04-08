const express = require('express');
const router = express.Router();
const KhoiKienThucNganhController = require('../controllers/khoiKienThucNganhController');

// Khởi tạo controller
const khoiKienThucNganhController = new KhoiKienThucNganhController();

// Route thêm quan hệ khối kiến thức - ngành
router.post('/', (req, res) => khoiKienThucNganhController.themKhoiKienThucNganh(req, res));

// Route lấy danh sách quan hệ khối kiến thức - ngành
router.get('/', (req, res) => khoiKienThucNganhController.layDanhSachKhoiKienThucNganh(req, res));

module.exports = router;