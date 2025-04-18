const { sql, poolPromise } = require('../config/database');

class SinhVienModel {
    // Thêm sinh viên mới
    async themSinhVien(hoTen, ngaySinh, maNganh, maNienKhoa) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('HoTen', sql.NVarChar(100), hoTen)
                .input('NgaySinh', sql.Date, ngaySinh)
                .input('MaNganh', sql.NVarChar(10), maNganh)
                .input('MaNienKhoa', sql.NVarChar(10), maNienKhoa)
                .execute('SP_ThemSinhVien');

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Thêm sinh viên thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Thêm sinh viên thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error themSinhVien:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách sinh viên
    async layDanhSachSinhVien() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachSinhVien'); // Gọi Stored Procedure

            return {
                success: true,
                message: 'Lấy danh sách sinh viên thành công',
                data: result.recordset
            };
        } catch (error) {
            console.error('Model - Error layDanhSachSinhVien:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = SinhVienModel;
