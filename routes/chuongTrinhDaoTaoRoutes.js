const express = require('express');
const router = express.Router();
const ChuongTrinhDaoTaoController = require('../controllers/chuongTrinhDaoTaoController');

// Khởi tạo controller trước khi sử dụng
const chuongTrinhDaoTaoController = new ChuongTrinhDaoTaoController();

// Route thêm chương trình đào tạo mới
router.post('/', (req, res) => chuongTrinhDaoTaoController.themChuongTrinhDaoTao(req, res));

// Route lấy danh sách chương trình đào tạo
router.get('/', (req, res) => chuongTrinhDaoTaoController.layDanhSachChuongTrinhDaoTao(req, res));

router.get('/:id', (req, res) => chuongTrinhDaoTaoController.layChiTietChuongTrinhDaoTaoTheoChuyenNganh(req, res));


module.exports = router;
