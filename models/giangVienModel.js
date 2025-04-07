const { sql, poolPromise } = require('../config/database');

class GiangVienModel {
    // Thêm giảng viên mới
    async themGiangVien(hoTen, maKhoa, matKhau) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('HoTen', sql.NVarChar(100), hoTen)
                .input('MaKhoa', sql.NVarChar(10), maKhoa)
                .input('MatKhau', sql.NVarChar(100), matKhau)
                .execute('SP_ThemGiangVien'); // Gọi Stored Procedure

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Thêm giảng viên thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Thêm giảng viên thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error themGiangVien:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách giảng viên
    async layDanhSachGiangVien() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachGiangVien'); // Gọi Stored Procedure

            return {
                success: true,
                message: 'Lấy danh sách giảng viên thành công',
                data: result.recordset
            };
        } catch (error) {
            console.error('Model - Error layDanhSachGiangVien:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = GiangVienModel;
