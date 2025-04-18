const KhoiKienThucChuyenNganhModel = require('../models/khoiKienThucChuyenNganhModel');

class KhoiKienThucChuyenNganhController {
    constructor() {
        this.khoiKienThucChuyenNganhModel = new KhoiKienThucChuyenNganhModel();
    }

    // Phương thức thêm quan hệ khối kiến thức - chuyên ngành
    async themKhoiKienThucChuyenNganh(req, res) {
        try {
            const { maKhoiKienThuc, maChuyenNganh } = req.body;

            // Kiểm tra dữ liệu đầu vào
            if (!maKhoiKienThuc || !maChuyenNganh) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã khối kiến thức và mã chuyên ngành không được để trống'
                });
            }

            // Gọi phương thức từ model
            const result = await this.khoiKienThucChuyenNganhModel.themKhoiKienThucChuyenNganh(
                maKhoiKienThuc, maChuyenNganh
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

    // Phương thức lấy danh sách quan hệ khối kiến thức - chuyên ngành
    async layDanhSachKhoiKienThucChuyenNganh(req, res) {
        try {
            // Gọi phương thức từ model
            const result = await this.khoiKienThucChuyenNganhModel.layDanhSachKhoiKienThucChuyenNganh();

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

module.exports = KhoiKienThucChuyenNganhController;