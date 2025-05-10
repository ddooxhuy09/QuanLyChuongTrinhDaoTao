const { sql, poolPromise } = require("../config/database");

class NganhModel {
    async getDanhSachNganh() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().execute("SP_GetDanhSachNganh");
            
            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    data: result.recordset
                };
            }
            
            return {
                success: false,
                message: "Không tìm thấy dữ liệu ngành"
            };
        } catch (error) {
            console.error("Model - Error getDanhSachNganh:", error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = NganhModel;