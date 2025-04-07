const { sql, poolPromise } = require('../config/database');

class KhoiKienThucModel {
    // Thêm khối kiến thức mới
    async themKhoiKienThuc(tenKhoiKienThuc, parentID) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('TenKhoiKienThuc', sql.NVarChar(100), tenKhoiKienThuc)
                .input('ParentID', sql.NVarChar(10), parentID)
                .execute('SP_ThemKhoiKienThuc');

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Thêm khối kiến thức thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Thêm khối kiến thức thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error themKhoiKienThuc:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách khối kiến thức
    async layDanhSachKhoiKienThuc() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachKhoiKienThuc');

            return {
                success: true,
                message: 'Lấy danh sách khối kiến thức thành công',
                data: result.recordset
            };
        } catch (error) {
            console.error('Model - Error layDanhSachKhoiKienThuc:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = KhoiKienThucModel;
