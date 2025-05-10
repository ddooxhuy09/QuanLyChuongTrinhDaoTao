const NganhModel = require('../models/nganhModel');

class NganhController {
    constructor() {
        this.nganhModel = new NganhModel();
    }

    async getDanhSachNganh(req, res) {
        try {
            const result = await this.nganhModel.getDanhSachNganh();
            
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

module.exports = NganhController;