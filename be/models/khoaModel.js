const { sql, poolPromise } = require('../config/database');

class KhoaModel {

    // Thêm khoa mới sử dụng stored procedure
    async themKhoa(tenKhoa) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('TenKhoa', sql.NVarChar(100), tenKhoa)
                .execute('SP_ThemKhoa');
            
            return { success: true, message: 'Thêm khoa thành công', data: result.recordset };
        } catch (error) {
            // Bắt lỗi từ SQL Server
            return { success: false, message: error.message };
        }
    }

    async layDanhSachKhoa() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachKhoa');

            return { 
                success: true, 
                message: 'Lấy danh sách khoa thành công',
                data: result.recordset 
            };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

module.exports = KhoaModel;