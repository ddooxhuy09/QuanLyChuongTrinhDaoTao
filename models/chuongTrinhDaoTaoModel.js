const { sql, poolPromise } = require('../config/database');

class ChuongTrinhDaoTaoModel {
    // Thêm chương trình đào tạo mới
    async themChuongTrinhDaoTao(tenChuongTrinh, maChuyenNganh, maNienKhoa) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('TenChuongTrinh', sql.NVarChar(100), tenChuongTrinh)
                .input('MaChuyenNganh', sql.NVarChar(10), maChuyenNganh)
                .input('MaNienKhoa', sql.NVarChar(10), maNienKhoa)
                .execute('SP_ThemChuongTrinhDaoTao');

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Thêm chương trình đào tạo thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Thêm chương trình đào tạo thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error themChuongTrinhDaoTao:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách chương trình đào tạo
    async layDanhSachChuongTrinhDaoTao() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachChuongTrinhDaoTao');

            return {
                success: true,
                message: 'Lấy danh sách chương trình đào tạo thành công',
                data: result.recordset
            };
        } catch (error) {
            console.error('Model - Error layDanhSachChuongTrinhDaoTao:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = ChuongTrinhDaoTaoModel;
