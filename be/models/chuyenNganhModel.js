const { sql, poolPromise } = require('../config/database');

class ChuyenNganhModel {
    // Thêm chuyên ngành mới sử dụng stored procedure
    async themChuyenNganh(maNganh, tenChuyenNganh, moTa, maBangCap, thoiGianDaoTao, hinhThucDaoTao) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaNganh', sql.NVarChar(10), maNganh)
                .input('TenChuyenNganh', sql.NVarChar(100), tenChuyenNganh)
                .input('MoTa', sql.NVarChar(sql.MAX), moTa)
                .input('MaBangCap', sql.NVarChar(10), maBangCap)
                .input('ThoiGianDaoTao', sql.Int, thoiGianDaoTao)
                .input('HinhThucDaoTao', sql.NVarChar(50), hinhThucDaoTao)
                .execute('SP_ThemChuyenNganh');

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Thêm chuyên ngành thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Thêm chuyên ngành thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error themChuyenNganh:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách chuyên ngành
    async layDanhSachChuyenNganh() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachChuyenNganh'); // Bạn cần tạo SP này

            return {
                success: true,
                message: 'Lấy danh sách chuyên ngành thành công',
                data: result.recordset
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách chuyên ngành theo ngành
    async layDanhSachChuyenNganhTheoNganh(maNganh) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaNganh', sql.NVarChar(10), maNganh)
                .execute('SP_DocDanhSachChuyenNganh_TheoNganh');
                
            return {
                success: true,
                message: 'Lấy danh sách chuyên ngành theo ngành thành công',
                data: result.recordset
            };
        } catch (error) {
            console.error('Model - Error layDanhSachChuyenNganhTheoNganh:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = ChuyenNganhModel;