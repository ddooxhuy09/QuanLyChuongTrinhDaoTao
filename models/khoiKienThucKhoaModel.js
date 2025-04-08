const { sql, poolPromise } = require('../config/database');

class KhoiKienThucKhoaModel {
    // Thêm quan hệ khối kiến thức - khoa
    async themKhoiKienThucKhoa(maKhoiKienThuc, maKhoa) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaKhoiKienThuc', sql.NVarChar(10), maKhoiKienThuc)
                .input('MaKhoa', sql.NVarChar(10), maKhoa)
                .execute('SP_ThemKhoiKienThuc_Khoa');

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Thêm quan hệ khối kiến thức - khoa thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Thêm quan hệ khối kiến thức - khoa thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error themKhoiKienThucKhoa:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách quan hệ khối kiến thức - khoa
    async layDanhSachKhoiKienThucKhoa() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachKhoiKienThuc_Khoa');

            return {
                success: true,
                message: 'Lấy danh sách quan hệ khối kiến thức - khoa thành công',
                data: result.recordset
            };
        } catch (error) {
            console.error('Model - Error layDanhSachKhoiKienThucKhoa:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = KhoiKienThucKhoaModel;