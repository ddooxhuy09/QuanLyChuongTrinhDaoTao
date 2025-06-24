const BackupDeviceModel = require("../models/backupDeviceModel");

class BackupDeviceController {
    constructor() {
        this.backupDeviceModel = new BackupDeviceModel();
    }

    async taoBackupDevice(req, res) {
        try {
            const { logicalName, physicalPath } = req.body;

            // Validation
            if (!logicalName || !physicalPath) {
                return res.status(400).json({
                    success: false,
                    message: "Logical name và physical path không được để trống",
                });
            }

            // Kiểm tra định dạng đường dẫn
            if (!physicalPath.match(/^[a-zA-Z]:\\.+/)) {
                return res.status(400).json({
                    success: false,
                    message: "Đường dẫn phải là đường dẫn Windows hợp lệ (VD: D:\\Backup\\QLChuongTrinhDaoTao_Device.bak)",
                });
            }

            const result = await this.backupDeviceModel.taoBackupDevice(logicalName, physicalPath);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Lỗi server: " + error.message,
            });
        }
    }
}

module.exports = BackupDeviceController; 