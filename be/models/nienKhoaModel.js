const { sql, poolPromise } = require('../config/database');

class NienKhoaModel {
    // Thêm niên khóa mới sử dụng stored procedure
    async themNienKhoa(namBatDau, namKetThuc) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('NamBatDau', sql.Int, namBatDau)
                .input('NamKetThuc', sql.Int, namKetThuc)
                .execute('SP_ThemNienKhoa'); // Gọi Stored Procedure

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Thêm niên khóa thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Thêm niên khóa thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error themNienKhoa:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách niên khóa sử dụng stored procedure
    async layDanhSachNienKhoa() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachNienKhoa'); // Gọi Stored Procedure

            return {
                success: true,
                message: 'Lấy danh sách niên khóa thành công',
                data: result.recordset
            };
        } catch (error) {
            console.error('Model - Error layDanhSachNienKhoa:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = NienKhoaModel;
