const NienKhoaModel = require('../models/nienKhoaModel');

class NienKhoaController {
    constructor() {
        this.nienKhoaModel = new NienKhoaModel();
    }

    // Phương thức thêm niên khóa mới
    async themNienKhoa(req, res) {
        try {
            const { namBatDau, namKetThuc } = req.body;

            // Kiểm tra dữ liệu đầu vào
            if (!namBatDau || !namKetThuc) {
                return res.status(400).json({
                    success: false,
                    message: 'Năm bắt đầu và năm kết thúc không được để trống'
                });
            }

            // Gọi phương thức từ model để thêm niên khóa
            const result = await this.nienKhoaModel.themNienKhoa(namBatDau, namKetThuc);

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

    // Phương thức lấy danh sách niên khóa
    async layDanhSachNienKhoa(req, res) {
        try {
            // Gọi phương thức từ model
            const result = await this.nienKhoaModel.layDanhSachNienKhoa();

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

module.exports = NienKhoaController;
