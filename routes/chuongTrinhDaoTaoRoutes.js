const express = require('express');
const router = express.Router();
const ChuongTrinhDaoTaoController = require('../controllers/chuongTrinhDaoTaoController');

// Khởi tạo controller trước khi sử dụng
const chuongTrinhDaoTaoController = new ChuongTrinhDaoTaoController();

// Route thêm chương trình đào tạo mới
router.post('/', (req, res) => chuongTrinhDaoTaoController.themChuongTrinhDaoTao(req, res));

// Consolidated route for getting list with or without filters
router.get('/', (req, res) => {
    // Lấy cả tham số cũ và mới
    const maKhoa = req.query.maKhoa || req.query.khoa;
    const maNganh = req.query.maNganh || req.query.nganh;
    const maChuyenNganh = req.query.maChuyenNganh || req.query.chuyennganh;
    const maNienKhoa = req.query.maNienKhoa || req.query.nienkhoa;
    
    // Gán lại vào req.query để controller có thể sử dụng
    req.query.maKhoa = maKhoa;
    req.query.maNganh = maNganh;
    req.query.maChuyenNganh = maChuyenNganh;
    req.query.maNienKhoa = maNienKhoa;
    
    // Check if any filter parameters are provided
    if (maKhoa || maNganh || maChuyenNganh || maNienKhoa) {
        return chuongTrinhDaoTaoController.layDanhSachChuongTrinhDaoTaoTheoFilter(req, res);
    } else {
        // If no filters, use the original method
        return chuongTrinhDaoTaoController.layDanhSachChuongTrinhDaoTao(req, res);
    }
});

// Route để lấy chi tiết theo ID chuyên ngành
router.get('/:id', (req, res) => chuongTrinhDaoTaoController.layChiTietChuongTrinhDaoTaoTheoChuyenNganh(req, res));

module.exports = router;