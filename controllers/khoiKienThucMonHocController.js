const KhoiKienThucMonHocModel = require('../models/khoiKienThucMonHocModel');

class KhoiKienThucMonHocController {
    constructor() {
        this.khoiKienThucMonHocModel = new KhoiKienThucMonHocModel();
    }

    // Phương thức thêm quan hệ khối kiến thức - môn học
    async themKhoiKienThucMonHoc(req, res) {
        try {
            const { maKhoiKienThuc, maMonHoc, thuTu } = req.body;

            // Kiểm tra dữ liệu đầu vào
            if (!maKhoiKienThuc || !maMonHoc) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã khối kiến thức và mã môn học không được để trống'
                });
            }

            // Gọi phương thức từ model
            const result = await this.khoiKienThucMonHocModel.themKhoiKienThucMonHoc(
                maKhoiKienThuc, maMonHoc, thuTu || 1
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

    // Phương thức lấy danh sách quan hệ khối kiến thức - môn học
    async layDanhSachKhoiKienThucMonHoc(req, res) {
        try {
            // Gọi phương thức từ model
            const result = await this.khoiKienThucMonHocModel.layDanhSachKhoiKienThucMonHoc();

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

module.exports = KhoiKienThucMonHocController;