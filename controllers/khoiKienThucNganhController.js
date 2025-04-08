const KhoiKienThucNganhModel = require('../models/khoiKienThucNganhModel');

class KhoiKienThucNganhController {
    constructor() {
        this.khoiKienThucNganhModel = new KhoiKienThucNganhModel();
    }

    // Phương thức thêm quan hệ khối kiến thức - ngành
    async themKhoiKienThucNganh(req, res) {
        try {
            const { maKhoiKienThuc, maNganh } = req.body;

            // Kiểm tra dữ liệu đầu vào
            if (!maKhoiKienThuc || !maNganh) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã khối kiến thức và mã ngành không được để trống'
                });
            }

            // Gọi phương thức từ model
            const result = await this.khoiKienThucNganhModel.themKhoiKienThucNganh(
                maKhoiKienThuc, maNganh
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

    // Phương thức lấy danh sách quan hệ khối kiến thức - ngành
    async layDanhSachKhoiKienThucNganh(req, res) {
        try {
            // Gọi phương thức từ model
            const result = await this.khoiKienThucNganhModel.layDanhSachKhoiKienThucNganh();

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

module.exports = KhoiKienThucNganhController;