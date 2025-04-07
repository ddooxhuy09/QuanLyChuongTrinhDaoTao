const express = require('express');
const router = express.Router();
const NganhController = require('../controllers/nganhController');

// Khởi tạo controller trước khi sử dụng
const nganhController = new NganhController();

// Route thêm ngành mới
router.post('/', (req, res) => nganhController.themNganh(req, res));

// Route lấy danh sách tất cả ngành
router.get('/', (req, res) => nganhController.layDanhSachNganh(req, res));

module.exports = router;