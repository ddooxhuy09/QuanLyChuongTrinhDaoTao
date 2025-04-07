const express = require('express');
const router = express.Router();
const BangCapController = require('../controllers/bangCapController');

// Khởi tạo controller trước khi sử dụng
const bangCapController = new BangCapController();

// Route thêm bằng cấp mới
router.post('/', (req, res) => bangCapController.themBangCap(req, res));

// Route lấy danh sách tất cả bằng cấp
router.get('/', (req, res) => bangCapController.layDanhSachBangCap(req, res));

module.exports = router;
