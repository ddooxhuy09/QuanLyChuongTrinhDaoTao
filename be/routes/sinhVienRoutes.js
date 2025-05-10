const express = require('express');
const router = express.Router();
const SinhVienController = require('../controllers/sinhVienController');
const { verifyToken, restrictTo } = require('../middleware/auth');

const sinhVienController = new SinhVienController();

// Route thêm sinh viên, chỉ PHONGDAOTAO được phép
router.post('/sinhvien/them', verifyToken, restrictTo('Phòng đào tạo'), (req, res) => sinhVienController.themSinhVien(req, res));

module.exports = router;