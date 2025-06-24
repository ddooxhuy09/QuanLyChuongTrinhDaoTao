const { sql, poolPromise } = require("../config/database");

class BackupDeviceModel {
    async taoBackupDevice(logicalName, physicalPath) {
        try {
            const pool = await poolPromise;

            const result = await pool
                .request()
                .input("logicalName", sql.NVarChar(128), logicalName)
                .input("physicalPath", sql.NVarChar(260), physicalPath)
                .output("deviceExists", sql.Bit)
                .execute("SP_TaoBackupDevice");

            // Lấy giá trị output parameter
            const deviceExists = result.output.deviceExists;

            return {
                success: true,
                data: {
                    message: result.recordset[0]?.Result || "Tạo backup device thành công!",
                    deviceExists: deviceExists,
                    logicalName: logicalName,
                    physicalPath: physicalPath
                }
            };
        } catch (error) {
            console.error("Model - Error taoBackupDevice:", error);
            return {
                success: false,
                message: error.message,
            };
        }
    }
}

module.exports = BackupDeviceModel; 