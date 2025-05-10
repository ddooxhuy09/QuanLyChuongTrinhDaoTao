const SinhVienModel = require('../models/sinhVienModel');

class SinhVienController {
    constructor() {
        this.sinhVienModel = new SinhVienModel();
    }

    async themSinhVien(req, res) {
        try {
            const { hoTen, ngaySinh, maNganh, namNhapHoc, email } = req.body;

            // Kiểm tra dữ liệu đầu vào
            if (!hoTen || !ngaySinh || !maNganh || !namNhapHoc) {
                return res.status(400).json({
                    success: false,
                    message: 'Họ tên, ngày sinh, mã ngành và năm nhập học không được để trống'
                });
            }

            // Gọi phương thức từ model để thêm sinh viên
            const result = await this.sinhVienModel.themSinhVien(hoTen, ngaySinh, maNganh, namNhapHoc, email);

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