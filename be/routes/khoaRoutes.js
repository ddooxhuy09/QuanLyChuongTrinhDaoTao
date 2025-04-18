const express = require('express');
const router = express.Router();
const KhoaController = require('../controllers/khoaController');

const khoaController = new KhoaController();

// Route thêm khoa mới
router.post('/', (req, res) => khoaController.themKhoa(req, res));

router.get('/', (req, res) => khoaController.layDanhSachKhoa(req, res));

module.exports = router;