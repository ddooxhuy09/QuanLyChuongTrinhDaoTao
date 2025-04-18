const PhongDaoTaoModel = require('../models/phongDaoTaoModel');

class PhongDaoTaoController {
    constructor() {
        this.phongDaoTaoModel = new PhongDaoTaoModel();
    }

    // Phương thức thêm phòng đào tạo mới
    async themPhongDaoTao(req, res) {
        try {
            const { tenDangNhap, matKhau, maKhoa } = req.body;

            // Kiểm tra dữ liệu đầu vào
            if (!tenDangNhap || !matKhau || !maKhoa) {
                return res.status(400).json({
                    success: false,
                    message: 'Tên đăng nhập, mật khẩu và mã khoa không được để trống'
                });
            }

            // Gọi phương thức từ model để thêm phòng đào tạo
            const result = await this.phongDaoTaoModel.themPhongDaoTao(tenDangNhap, matKhau, maKhoa);

            if (result.success) {
                return res.status(201).json(result);
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

    // Phương thức lấy danh sách phòng đào tạo
    async layDanhSachPhongDaoTao(req, res) {
        try {
            // Gọi phương thức từ model
            const result = await this.phongDaoTaoModel.layDanhSachPhongDaoTao();

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

module.exports = PhongDaoTaoController;
