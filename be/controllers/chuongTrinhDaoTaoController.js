const ChuongTrinhDaoTaoModel = require('../models/chuongTrinhDaoTaoModel');

class ChuongTrinhDaoTaoController {
    constructor() {
        this.chuongTrinhDaoTaoModel = new ChuongTrinhDaoTaoModel();
    }

    // Phương thức thêm chương trình đào tạo mới
    async themChuongTrinhDaoTao(req, res) {
        try {
            const { tenChuongTrinh, maChuyenNganh, maNienKhoa } = req.body;

            // Kiểm tra dữ liệu đầu vào
            if (!tenChuongTrinh || !maChuyenNganh || !maNienKhoa) {
                return res.status(400).json({
                    success: false,
                    message: 'Tên chương trình, mã chuyên ngành và mã niên khóa không được để trống'
                });
            }

            // Gọi phương thức từ model để thêm chương trình
            const result = await this.chuongTrinhDaoTaoModel.themChuongTrinhDaoTao(tenChuongTrinh, maChuyenNganh, maNienKhoa);

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

    // Phương thức lấy danh sách chương trình đào tạo
    async layDanhSachChuongTrinhDaoTao(req, res) {
        try {
            // Gọi phương thức từ model
            const result = await this.chuongTrinhDaoTaoModel.layDanhSachChuongTrinhDaoTao();

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
    async layChiTietChuongTrinhDaoTaoTheoChuyenNganh(req, res) {
        try {
            const { id } = req.params;
            
            // Kiểm tra ID
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID chuyên ngành không được để trống'
                });
            }
            
            // Gọi phương thức từ model
            const result = await this.chuongTrinhDaoTaoModel.layChiTietChuongTrinhDaoTaoTheoChuyenNganh(id);
            
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

    async layDanhSachChuongTrinhDaoTaoTheoFilter(req, res) {
        try {
            // Extract filter parameters from query string - đồng bộ tất cả là viết thường
            const { maKhoa, maNganh, maChuyenNganh, maNienKhoa } = req.query;
            
            // Log the received parameters for debugging
            console.log(`Filtering curricula with maKhoa=${maKhoa}, maNganh=${maNganh}, maChuyenNganh=${maChuyenNganh}, maNienKhoa=${maNienKhoa}`);
            
            // Call model method with all filters
            const result = await this.chuongTrinhDaoTaoModel.layDanhSachChuongTrinhDaoTaoTheoFilter(
                maKhoa,
                maNganh,
                maChuyenNganh, 
                maNienKhoa
            );
            
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

module.exports = ChuongTrinhDaoTaoController;
