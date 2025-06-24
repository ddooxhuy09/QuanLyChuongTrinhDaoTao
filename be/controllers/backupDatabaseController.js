const BackupDatabaseModel = require("../models/backupDatabaseModel");

class BackupDatabaseController {
    constructor() {
        this.backupDatabaseModel = new BackupDatabaseModel();
    }

    async layThongTinSaoLuu(req, res) {
        try {
            console.log("Controller: Getting backup info...");
            const result = await this.backupDatabaseModel.layThongTinSaoLuu();

            console.log("Controller: Model result:", result);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                console.log("Controller: Model returned error:", result.message);
                return res.status(400).json(result);
            }
        } catch (error) {
            console.error("Controller: Exception:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server: " + error.message,
            });
        }
    }

    async backupDatabase(req, res) {
        try {
            const { withInit } = req.body;

            // Kiểm tra backup device trước
            const deviceCheck = await this.backupDatabaseModel.kiemTraBackupDevice();
            if (!deviceCheck.success || !deviceCheck.data.exists) {
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng tạo backup device trước khi sao lưu!",
                });
            }

            const result = await this.backupDatabaseModel.backupDatabase(withInit || false);

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

    async restoreDatabase(req, res) {
        try {
            const { filePosition, isPointInTime, restoreTime } = req.body;

            // Validation
            if (!filePosition || filePosition < 1) {
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng chọn một bản sao lưu hợp lệ!",
                });
            }

            if (isPointInTime && !restoreTime) {
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng chọn thời gian khôi phục cho Point-in-time recovery!",
                });
            }

            // Kiểm tra backup device trước
            const deviceCheck = await this.backupDatabaseModel.kiemTraBackupDevice();
            if (!deviceCheck.success || !deviceCheck.data.exists) {
                return res.status(400).json({
                    success: false,
                    message: "Backup device không tồn tại!",
                });
            }

            // Nếu là point-in-time, kiểm tra thời gian hợp lệ
            if (isPointInTime && restoreTime) {
                const maxBackupResult = await this.backupDatabaseModel.layMaxBackupTime();
                if (maxBackupResult.success && maxBackupResult.data.backupTime) {
                    const maxBackupTime = new Date(maxBackupResult.data.backupTime);
                    const requestedTime = new Date(restoreTime);

                    if (requestedTime <= maxBackupTime) {
                        return res.status(400).json({
                            success: false,
                            message: "Thời gian khôi phục phải lớn hơn thời gian sao lưu mới nhất!",
                        });
                    }
                }
            }

            const result = await this.backupDatabaseModel.restoreDatabase(
                filePosition,
                isPointInTime || false,
                restoreTime
            );

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

    async kiemTraBackupDevice(req, res) {
        try {
            const result = await this.backupDatabaseModel.kiemTraBackupDevice();

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

    async layMaxBackupTime(req, res) {
        try {
            const result = await this.backupDatabaseModel.layMaxBackupTime();

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

    async testConnection(req, res) {
        try {
            console.log("Controller: Testing database connection...");
            const result = await this.backupDatabaseModel.testConnection();

            return res.status(200).json(result);
        } catch (error) {
            console.error("Controller: Test connection error:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server: " + error.message,
            });
        }
    }
}

module.exports = BackupDatabaseController; 