const express = require('express');
const router = express.Router();
const SinhVienController = require('../controllers/sinhVienController');

// Khởi tạo controller trước khi sử dụng
const sinhVienController = new SinhVienController();

// Route thêm sinh viên mới
router.post('/', (req, res) => sinhVienController.themSinhVien(req, res));

// Route lấy danh sách sinh viên
router.get('/', (req, res) => sinhVienController.layDanhSachSinhVien(req, res));

module.exports = router;
