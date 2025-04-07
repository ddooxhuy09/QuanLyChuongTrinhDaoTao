const express = require('express');
const router = express.Router();
const MonHocController = require('../controllers/monHocController');

// Khởi tạo controller trước khi sử dụng
const monHocController = new MonHocController();

// Route thêm môn học mới
router.post('/', (req, res) => monHocController.themMonHoc(req, res));

router.get('/', (req, res) => monHocController.layDanhSachMonHoc(req, res));

module.exports = router;
