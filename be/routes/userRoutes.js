const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

const userController = new UserController();

router.post('/user/dangnhap', (req, res) => userController.dangNhap(req, res));

module.exports = router;