const express = require('express');
const router = express.Router();
const NganhController = require('../controllers/nganhController');
const { verifyToken, restrictTo } = require('../middleware/auth');

const nganhController = new NganhController();

// API lấy danh sách ngành
router.get('/nganh', verifyToken, (req, res) => nganhController.getDanhSachNganh(req, res));

module.exports = router;