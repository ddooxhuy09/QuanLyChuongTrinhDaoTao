const KhoiKienThucKhoaModel = require('../models/khoiKienThucKhoaModel');

class KhoiKienThucKhoaController {
    constructor() {
        this.khoiKienThucKhoaModel = new KhoiKienThucKhoaModel();
    }

    // Phương thức thêm quan hệ khối kiến thức - khoa
    async themKhoiKienThucKhoa(req, res) {
        try {
            const { maKhoiKienThuc, maKhoa } = req.body;

            // Kiểm tra dữ liệu đầu vào
            if (!maKhoiKienThuc || !maKhoa) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã khối kiến thức và mã khoa không được để trống'
                });
            }

            // Gọi phương thức từ model
            const result = await this.khoiKienThucKhoaModel.themKhoiKienThucKhoa(
                maKhoiKienThuc, maKhoa
            );

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

    // Phương thức lấy danh sách quan hệ khối kiến thức - khoa
    async layDanhSachKhoiKienThucKhoa(req, res) {
        try {
            // Gọi phương thức từ model
            const result = await this.khoiKienThucKhoaModel.layDanhSachKhoiKienThucKhoa();

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

module.exports = KhoiKienThucKhoaController;