const { sql, poolPromise } = require('../config/database');

class KhoiKienThucChuyenNganhModel {
    // Thêm quan hệ khối kiến thức - chuyên ngành
    async themKhoiKienThucChuyenNganh(maKhoiKienThuc, maChuyenNganh) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaKhoiKienThuc', sql.NVarChar(10), maKhoiKienThuc)
                .input('MaChuyenNganh', sql.NVarChar(10), maChuyenNganh)
                .execute('SP_ThemKhoiKienThuc_ChuyenNganh');

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Thêm quan hệ khối kiến thức - chuyên ngành thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Thêm quan hệ khối kiến thức - chuyên ngành thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error themKhoiKienThucChuyenNganh:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách quan hệ khối kiến thức - chuyên ngành
    async layDanhSachKhoiKienThucChuyenNganh() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachKhoiKienThuc_ChuyenNganh');

            return {
                success: true,
                message: 'Lấy danh sách quan hệ khối kiến thức - chuyên ngành thành công',
                data: result.recordset
            };
        } catch (error) {
            console.error('Model - Error layDanhSachKhoiKienThucChuyenNganh:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = KhoiKienThucChuyenNganhModel;