const { sql, poolPromise } = require('../config/database');

class BangCapModel {
    // Thêm bằng cấp mới sử dụng stored procedure
    async themBangCap(tenBangCap, soTinChiToiThieu) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('TenBangCap', sql.NVarChar(100), tenBangCap)
                .input('SoTinChiToiThieu', sql.Int, soTinChiToiThieu)
                .execute('SP_ThemBangCap');

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Thêm bằng cấp thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Thêm bằng cấp thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error themBangCap:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách bằng cấp
    async layDanhSachBangCap() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachBangCap'); // Bạn cần tạo SP này

            return {
                success: true,
                message: 'Lấy danh sách bằng cấp thành công',
                data: result.recordset
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = BangCapModel;
