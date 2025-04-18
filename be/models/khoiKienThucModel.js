const { sql, poolPromise } = require('../config/database');

class KhoiKienThucModel {
    // Thêm khối kiến thức mới
    async themKhoiKienThuc(tenKhoiKienThuc, parentID) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('TenKhoiKienThuc', sql.NVarChar(100), tenKhoiKienThuc)
                .input('ParentID', sql.NVarChar(10), parentID)
                .execute('SP_ThemKhoiKienThuc');

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Thêm khối kiến thức thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Thêm khối kiến thức thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error themKhoiKienThuc:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách khối kiến thức
    async layDanhSachKhoiKienThuc() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachKhoiKienThuc');

            return {
                success: true,
                message: 'Lấy danh sách khối kiến thức thành công',
                data: result.recordset
            };
        } catch (error) {
            console.error('Model - Error layDanhSachKhoiKienThuc:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    async suaKhoiKienThuc(maKhoiKienThuc, tenKhoiKienThuc, parentID) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaKhoiKienThuc', sql.NVarChar(10), maKhoiKienThuc)
                .input('TenKhoiKienThuc', sql.NVarChar(100), tenKhoiKienThuc)
                .input('ParentID', sql.NVarChar(10), parentID || null)
                .execute('SP_SuaKhoiKienThuc');
    
            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Cập nhật khối kiến thức thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Cập nhật khối kiến thức thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error suaKhoiKienThuc:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    // Xóa khối kiến thức
    async xoaKhoiKienThuc(maKhoiKienThuc) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaKhoiKienThuc', sql.NVarChar(10), maKhoiKienThuc)
                .execute('SP_XoaKhoiKienThuc');
    
            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Xóa khối kiến thức thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Xóa khối kiến thức thất bại hoặc khối kiến thức không tồn tại'
                };
            }
        } catch (error) {
            console.error('Model - Error xoaKhoiKienThuc:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
    async layChiTietKhoiKienThucVaMonHoc(maKhoiKienThuc) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaKhoiKienThuc', sql.NVarChar(10), maKhoiKienThuc)
                .execute('SP_DocChiTietKhoiKienThucVaMonHoc');
            
            if (result.recordsets && result.recordsets.length >= 2) {
                const khoiKienThuc = result.recordsets[0][0] || null;
                const monHocList = result.recordsets[1] || [];
                
                if (khoiKienThuc) {
                    return {
                        success: true,
                        message: 'Lấy thông tin khối kiến thức và môn học thành công',
                        data: {
                            khoiKienThuc: khoiKienThuc,
                            danhSachMonHoc: monHocList
                        }
                    };
                }
            }
            
            return {
                success: false,
                message: 'Không tìm thấy khối kiến thức'
            };
        } catch (error) {
            console.error('Model - Error layChiTietKhoiKienThucVaMonHoc:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = KhoiKienThucModel;
