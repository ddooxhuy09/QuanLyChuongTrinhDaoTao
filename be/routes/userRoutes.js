const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const verifyToken = require('../middleware/auth'); // Import middleware

// Khởi tạo controller trước khi sử dụng
const userController = new UserController();

// Route đăng nhập
router.post('/dangnhap', (req, res) => userController.dangNhap(req, res));

// Bạn có thể thêm các route khác cần xác thực ở đây, ví dụ:
// router.get('/protected', verifyToken, (req, res) => {
//     res.json({ message: 'Đây là route bảo vệ' });
// });

module.exports = router;
