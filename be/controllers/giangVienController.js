const GiangVienModel = require('../models/giangVienModel');

class GiangVienController {
    constructor() {
        this.giangVienModel = new GiangVienModel();
    }

    // Phương thức thêm giảng viên mới
    async themGiangVien(req, res) {
        try {
            const { hoTen, maKhoa, matKhau } = req.body;

            // Kiểm tra dữ liệu đầu vào
            if (!hoTen || !maKhoa || !matKhau) {
                return res.status(400).json({
                    success: false,
                    message: 'Họ tên, mã khoa và mật khẩu không được để trống'
                });
            }

            // Gọi phương thức từ model để thêm giảng viên
            const result = await this.giangVienModel.themGiangVien(hoTen, maKhoa, matKhau);

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

    // Phương thức lấy danh sách giảng viên
    async layDanhSachGiangVien(req, res) {
        try {
            // Gọi phương thức từ model
            const result = await this.giangVienModel.layDanhSachGiangVien();

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

module.exports = GiangVienController;
