const UserModel = require('../models/userModel');

class UserController {
    constructor() {
        this.userModel = new UserModel();
    }

    async dangNhap(req, res) {
        try {
            const { tenDangNhap, matKhau } = req.body;

            if (!tenDangNhap || !matKhau) {
                return res.status(400).json({
                    success: false,
                    message: 'Tên đăng nhập và mật khẩu không được để trống'
                });
            }

            const result = await this.userModel.dangNhap(tenDangNhap, matKhau);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server: ' + error.message
            });
        }
    }
}

module.exports = UserController;