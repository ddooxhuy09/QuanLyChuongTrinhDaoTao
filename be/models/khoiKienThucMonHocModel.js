const { sql, poolPromise } = require('../config/database');

class KhoiKienThucMonHocModel {
    // Thêm quan hệ khối kiến thức - môn học
    async themKhoiKienThucMonHoc(maKhoiKienThuc, maMonHoc, thuTu = 1) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaKhoiKienThuc', sql.NVarChar(10), maKhoiKienThuc)
                .input('MaMonHoc', sql.NVarChar(10), maMonHoc)
                .input('ThuTu', sql.Int, thuTu)
                .execute('SP_ThemKhoiKienThuc_MonHoc');

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Thêm quan hệ khối kiến thức - môn học thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Thêm quan hệ khối kiến thức - môn học thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error themKhoiKienThucMonHoc:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách quan hệ khối kiến thức - môn học
    async layDanhSachKhoiKienThucMonHoc() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachKhoiKienThuc_MonHoc');

            return {
                success: true,
                message: 'Lấy danh sách quan hệ khối kiến thức - môn học thành công',
                data: result.recordset
            };
        } catch (error) {
            console.error('Model - Error layDanhSachKhoiKienThucMonHoc:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = KhoiKienThucMonHocModel;