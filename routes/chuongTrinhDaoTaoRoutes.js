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

router.get('/', (req, res) => {
    // Check if any filter parameters are provided
    if (req.query.MaChuyenNganh || req.query.MaNienKhoa) {
        return chuongTrinhDaoTaoController.layDanhSachChuongTrinhDaoTaoTheoFilter(req, res);
    } else {
        // If no filters, use the original method
        return chuongTrinhDaoTaoController.layDanhSachChuongTrinhDaoTao(req, res);
    }
});

module.exports = router;
