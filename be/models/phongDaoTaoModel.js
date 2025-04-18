const { sql, poolPromise } = require('../config/database');

class PhongDaoTaoModel {
    // Thêm phòng đào tạo mới
    async themPhongDaoTao(tenDangNhap, matKhau, maKhoa) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('TenDangNhap', sql.NVarChar(100), tenDangNhap)
                .input('MatKhau', sql.NVarChar(100), matKhau)
                .input('MaKhoa', sql.NVarChar(10), maKhoa)
                .execute('SP_ThemPhongDaoTao'); // Gọi Stored Procedure

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Thêm phòng đào tạo thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Thêm phòng đào tạo thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error themPhongDaoTao:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách phòng đào tạo
    async layDanhSachPhongDaoTao() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachPhongDaoTao'); // Gọi Stored Procedure

            return {
                success: true,
                message: 'Lấy danh sách phòng đào tạo thành công',
                data: result.recordset
            };
        } catch (error) {
            console.error('Model - Error layDanhSachPhongDaoTao:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = PhongDaoTaoModel;
