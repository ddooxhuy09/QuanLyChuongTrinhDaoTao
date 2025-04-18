const { sql, poolPromise } = require('../config/database');

class KhoiKienThucNganhModel {
    // Thêm quan hệ khối kiến thức - ngành
    async themKhoiKienThucNganh(maKhoiKienThuc, maNganh) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaKhoiKienThuc', sql.NVarChar(10), maKhoiKienThuc)
                .input('MaNganh', sql.NVarChar(10), maNganh)
                .execute('SP_ThemKhoiKienThuc_Nganh');

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Thêm quan hệ khối kiến thức - ngành thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Thêm quan hệ khối kiến thức - ngành thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error themKhoiKienThucNganh:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách quan hệ khối kiến thức - ngành
    async layDanhSachKhoiKienThucNganh() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachKhoiKienThuc_Nganh');

            return {
                success: true,
                message: 'Lấy danh sách quan hệ khối kiến thức - ngành thành công',
                data: result.recordset
            };
        } catch (error) {
            console.error('Model - Error layDanhSachKhoiKienThucNganh:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = KhoiKienThucNganhModel;