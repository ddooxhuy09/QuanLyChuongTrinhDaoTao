const BangCapModel = require('../models/bangCapModel');

class BangCapController {
    constructor() {
        this.bangCapModel = new BangCapModel();
    }

    // Phương thức thêm bằng cấp mới
    async themBangCap(req, res) {
        try {
            const { tenBangCap, soTinChiToiThieu } = req.body;

            // Kiểm tra dữ liệu đầu vào
            if (!tenBangCap || !soTinChiToiThieu) {
                return res.status(400).json({
                    success: false,
                    message: 'Tên bằng cấp và số tín chỉ tối thiểu không được để trống'
                });
            }

            // Gọi phương thức từ model
            const result = await this.bangCapModel.themBangCap(tenBangCap, soTinChiToiThieu);

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

    // Phương thức lấy danh sách bằng cấp
    async layDanhSachBangCap(req, res) {
        try {
            // Gọi phương thức từ model
            const result = await this.bangCapModel.layDanhSachBangCap();

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

module.exports = BangCapController;
