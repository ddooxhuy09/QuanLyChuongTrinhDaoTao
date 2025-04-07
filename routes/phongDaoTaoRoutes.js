const express = require('express');
const router = express.Router();
const PhongDaoTaoController = require('../controllers/phongDaoTaoController');

// Khởi tạo controller trước khi sử dụng
const phongDaoTaoController = new PhongDaoTaoController();

// Route thêm phòng đào tạo mới
router.post('/', (req, res) => phongDaoTaoController.themPhongDaoTao(req, res));

// Route lấy danh sách phòng đào tạo
router.get('/', (req, res) => phongDaoTaoController.layDanhSachPhongDaoTao(req, res));

module.exports = router;
