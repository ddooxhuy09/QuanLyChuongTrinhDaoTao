const KhoaModel = require('../models/khoaModel');

class KhoaController {
    constructor() {
        this.khoaModel = new KhoaModel();
    }

    // Phương thức thêm khoa mới
    async themKhoa(req, res) {
        try {
            const { tenKhoa } = req.body;
            
            // Kiểm tra dữ liệu đầu vào
            if (!tenKhoa) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Tên khoa không được để trống' 
                });
            }
            
            // Gọi phương thức từ model
            const result = await this.khoaModel.themKhoa(tenKhoa);
            
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

    async layDanhSachKhoa(req, res) {
        try {
            // Gọi phương thức từ model
            const result = await this.khoaModel.layDanhSachKhoa();
            
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

module.exports = KhoaController;