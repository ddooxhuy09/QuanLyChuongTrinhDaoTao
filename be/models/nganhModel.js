const { sql, poolPromise } = require('../config/database');

class NganhModel {
    // Thêm ngành mới sử dụng stored procedure
    async themNganh(maKhoa, tenNganh, moTa) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaKhoa', sql.NVarChar(10), maKhoa)
                .input('TenNganh', sql.NVarChar(100), tenNganh)
                .input('MoTa', sql.NVarChar(255), moTa || null)
                .execute('SP_ThemNganh');

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Thêm ngành thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Thêm ngành thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error themNganh:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách ngành
    async layDanhSachNganh() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachNganh');

            return {
                success: true,
                message: 'Lấy danh sách ngành thành công',
                data: result.recordset
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách ngành theo khoa
    async layDanhSachNganhTheoKhoa(maKhoa) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaKhoa', sql.NVarChar(10), maKhoa)
                .execute('SP_DocDanhSachNganh_TheoKhoa');
                
            return {
                success: true,
                message: 'Lấy danh sách ngành theo khoa thành công',
                data: result.recordset
            };
        } catch (error) {
            console.error('Model - Error layDanhSachNganhTheoKhoa:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = NganhModel;
