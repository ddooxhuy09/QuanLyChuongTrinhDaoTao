const express = require('express');
const router = express.Router();
const NganhController = require('../controllers/nganhController');
const { verifyToken, restrictTo } = require('../middleware/auth');

const nganhController = new NganhController();

// API lấy danh sách ngành
router.get('/nganh',
    verifyToken,
    restrictTo('Phòng đào tạo', 'Sinh viên', 'Giảng viên'),
    (req, res) => nganhController.getDanhSachNganh(req, res));

module.exports = router;