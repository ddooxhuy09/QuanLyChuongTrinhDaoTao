const express = require('express');
const router = express.Router();
const GiangVienController = require('../controllers/giangVienController');

// Khởi tạo controller trước khi sử dụng
const giangVienController = new GiangVienController();

// Route thêm giảng viên mới
router.post('/', (req, res) => giangVienController.themGiangVien(req, res));

// Route lấy danh sách giảng viên
router.get('/', (req, res) => giangVienController.layDanhSachGiangVien(req, res));

module.exports = router;
