const express = require('express');
const router = express.Router();
const KhoiKienThucController = require('../controllers/khoiKienThucController');

// Khởi tạo controller trước khi sử dụng
const khoiKienThucController = new KhoiKienThucController();

// Route thêm khối kiến thức mới
router.post('/', (req, res) => khoiKienThucController.themKhoiKienThuc(req, res));

// Route lấy danh sách khối kiến thức
router.get('/', (req, res) => khoiKienThucController.layDanhSachKhoiKienThuc(req, res));

router.put('/:id', (req, res) => khoiKienThucController.suaKhoiKienThuc(req, res));

// Route xóa khối kiến thức
router.delete('/:id', (req, res) => khoiKienThucController.xoaKhoiKienThuc(req, res));

module.exports = router;
