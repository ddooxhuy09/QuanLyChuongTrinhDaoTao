const express = require('express');
const router = express.Router();
const NienKhoaController = require('../controllers/nienKhoaController');

// Khởi tạo controller trước khi sử dụng
const nienKhoaController = new NienKhoaController();

// Route thêm niên khóa mới
router.post('/', (req, res) => nienKhoaController.themNienKhoa(req, res));

// Route lấy danh sách niên khóa
router.get('/', (req, res) => nienKhoaController.layDanhSachNienKhoa(req, res));

module.exports = router;
