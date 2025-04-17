const express = require('express');
const router = express.Router();
const ChuyenNganhController = require('../controllers/chuyenNganhController');

// Khởi tạo controller trước khi sử dụng
const chuyenNganhController = new ChuyenNganhController();

// Route thêm chuyên ngành mới
router.post('/', (req, res) => chuyenNganhController.themChuyenNganh(req, res));

// Route lấy danh sách tất cả chuyên ngành
router.get('/', (req, res) => chuyenNganhController.layDanhSachChuyenNganh(req, res));

router.get('/', (req, res) => {
    const { nganh } = req.query;
    if (nganh) {
        // Nếu có tham số ngành, gọi API lọc theo ngành
        return chuyenNganhController.layDanhSachChuyenNganhTheoNganh(req, res);
    } else {
        // Nếu không có tham số, lấy tất cả
        return chuyenNganhController.layDanhSachChuyenNganh(req, res);
    }
});


module.exports = router;