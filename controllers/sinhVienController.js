const SinhVienModel = require('../models/sinhVienModel');

class SinhVienController {
    constructor() {
        this.sinhVienModel = new SinhVienModel();
    }

    // Phương thức thêm sinh viên mới
    async themSinhVien(req, res) {
        try {
            const { hoTen, ngaySinh, maNganh, maNienKhoa } = req.body;

            // Kiểm tra dữ liệu đầu vào
            if (!hoTen || !ngaySinh || !maNganh || !maNienKhoa) {
                return res.status(400).json({
                    success: false,
                    message: 'Họ tên, ngày sinh, mã ngành và mã niên khóa không được để trống'
                });
            }

            // Gọi phương thức từ model để thêm sinh viên
            const result = await this.sinhVienModel.themSinhVien(hoTen, ngaySinh, maNganh, maNienKhoa);

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

    // Phương thức lấy danh sách sinh viên
    async layDanhSachSinhVien(req, res) {
        try {
            // Gọi phương thức từ model
            const result = await this.sinhVienModel.layDanhSachSinhVien();

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

module.exports = SinhVienController;
