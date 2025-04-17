const NganhModel = require('../models/nganhModel');

class NganhController {
    constructor() {
        this.nganhModel = new NganhModel();
    }

    // Phương thức thêm ngành mới
    async themNganh(req, res) {
        try {
            const { maKhoa, tenNganh, moTa } = req.body;

            // Kiểm tra dữ liệu đầu vào
            if (!maKhoa) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã khoa không được để trống'
                });
            }

            if (!tenNganh) {
                return res.status(400).json({
                    success: false,
                    message: 'Tên ngành không được để trống'
                });
            }

            // Gọi phương thức từ model
            const result = await this.nganhModel.themNganh(maKhoa, tenNganh, moTa);

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

    // Phương thức lấy danh sách ngành
    async layDanhSachNganh(req, res) {
        try {
            // Gọi phương thức từ model
            const result = await this.nganhModel.layDanhSachNganh();

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

    // Phương thức lấy danh sách ngành theo mã khoa
    async layDanhSachNganhTheoKhoa(req, res) {
        try {
            // Lấy mã khoa từ query parameter thay vì params
            const maKhoa = req.query.khoa;
            
            // Kiểm tra mã khoa
            if (!maKhoa) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã khoa không được để trống'
                });
            }
            
            // Gọi phương thức từ model
            const result = await this.nganhModel.layDanhSachNganhTheoKhoa(maKhoa);
            
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

module.exports = NganhController;
