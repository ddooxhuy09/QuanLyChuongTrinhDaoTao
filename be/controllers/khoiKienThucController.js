const KhoiKienThucModel = require('../models/khoiKienThucModel');

class KhoiKienThucController {
    constructor() {
        this.khoiKienThucModel = new KhoiKienThucModel();
    }

    async getDanhSachKhoiKienThuc(req, res) {
        try {
            const result = await this.khoiKienThucModel.getDanhSachKhoiKienThuc();
            
            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server: ' + error.message
            });
        }
    }
    
    async getDanhSachMonHocByKhoiKienThuc(req, res) {
        try {
            const { makhoikienthuc } = req.params;
            
            if (!makhoikienthuc) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã khối kiến thức không được để trống'
                });
            }
            
            const result = await this.khoiKienThucModel.getDanhSachMonHocByKhoiKienThuc(makhoikienthuc);
            
            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server: ' + error.message
            });
        }
    }
}

module.exports = KhoiKienThucController;