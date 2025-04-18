const ChuyenNganhModel = require('../models/chuyenNganhModel');

class ChuyenNganhController {
    constructor() {
        this.chuyenNganhModel = new ChuyenNganhModel();
    }

    // Phương thức thêm chuyên ngành mới
    async themChuyenNganh(req, res) {
        try {
            const { maNganh, tenChuyenNganh, moTa, maBangCap, thoiGianDaoTao, hinhThucDaoTao } = req.body;

            // Kiểm tra dữ liệu đầu vào
            if (!maNganh || !tenChuyenNganh || !maBangCap) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã ngành, tên chuyên ngành và mã bằng cấp không được để trống'
                });
            }

            // Gọi phương thức từ model
            const result = await this.chuyenNganhModel.themChuyenNganh(maNganh, tenChuyenNganh, moTa, maBangCap, thoiGianDaoTao, hinhThucDaoTao);

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

    // Phương thức lấy danh sách chuyên ngành
    async layDanhSachChuyenNganh(req, res) {
        try {
            // Gọi phương thức từ model
            const result = await this.chuyenNganhModel.layDanhSachChuyenNganh();

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

    // Phương thức lấy danh sách chuyên ngành theo mã ngành
    async layDanhSachChuyenNganhTheoNganh(req, res) {
        try {
            // Lấy mã ngành từ query parameter
            const maNganh = req.query.nganh;
            
            // Kiểm tra mã ngành
            if (!maNganh) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã ngành không được để trống'
                });
            }
            
            // Gọi phương thức từ model
            const result = await this.chuyenNganhModel.layDanhSachChuyenNganhTheoNganh(maNganh);
            
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

module.exports = ChuyenNganhController;