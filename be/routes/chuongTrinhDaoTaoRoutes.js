const express = require('express');
const router = express.Router();
const ChuongTrinhDaoTaoController = require('../controllers/chuongTrinhDaoTaoController');
const { verifyToken, restrictTo } = require('../middleware/auth');

const chuongTrinhDaoTaoController = new ChuongTrinhDaoTaoController();

// API lấy danh sách chương trình đào tạo
router.get('/chuongtrinhdaotao', verifyToken, (req, res) => chuongTrinhDaoTaoController.getDanhSachChuongTrinhDaoTao(req, res));

// API GET chung cho cả xem toàn bộ CTĐT và xem học kỳ cụ thể
router.get('/chuongtrinhdaotao/:machuongtrinh', 
    verifyToken, 
    (req, res) => chuongTrinhDaoTaoController.xemChiTietChuongTrinh(req, res));

// API thêm môn học vào CTĐT
router.post('/chuongtrinhdaotao/:machuongtrinh', 
    verifyToken, 
    restrictTo('Phòng đào tạo'), 
    (req, res) => chuongTrinhDaoTaoController.themMonHocVaoCTDT(req, res));

// API xóa môn học khỏi CTĐT
router.delete('/chuongtrinhdaotao/:machuongtrinh/monhoc/:mamonhoc', 
    verifyToken, 
    restrictTo('Phòng đào tạo'), 
    (req, res) => chuongTrinhDaoTaoController.xoaMonHocKhoiCTDT(req, res));

// API cập nhật học kỳ cho môn học trong CTĐT
router.patch('/chuongtrinhdaotao/:machuongtrinh/monhoc/:mamonhoc', 
    verifyToken, 
    restrictTo('Phòng đào tạo'), 
    (req, res) => chuongTrinhDaoTaoController.capNhatHocKyMonHoc(req, res));

// API lấy danh sách môn tự chọn
router.get('/chuongtrinhdaotao/:machuongtrinh/mamontuchon/:mamonhoctuchon', 
    verifyToken, 
    (req, res) => chuongTrinhDaoTaoController.layDanhSachMonTuChon(req, res));

module.exports = router;