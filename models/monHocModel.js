const { sql, poolPromise } = require('../config/database');

class MonHocModel {
  // Thêm môn học mới sử dụng stored procedure
  async themMonHoc(monHocData) {
    try {
      const {
        tenMonHoc,
        soTinChi,
        soTietLiThuyet,
        soTietBaiTap,
        soTietThucHanh,
        soTietTuHoc,
        ngonNguDay,
        laMonTuChon
      } = monHocData;

      const pool = await poolPromise;
      const result = await pool.request()
        .input('TenMonHoc', sql.NVarChar(100), tenMonHoc)
        .input('SoTinChi', sql.Int, soTinChi)
        .input('SoTietLiThuyet', sql.Int, soTietLiThuyet || null)
        .input('SoTietBaiTap', sql.Int, soTietBaiTap || null)
        .input('SoTietThucHanh', sql.Int, soTietThucHanh || null)
        .input('SoTietTuHoc', sql.Int, soTietTuHoc || null)
        .input('NgonNguDay', sql.NVarChar(50), ngonNguDay || null)
        .input('LaMonTuChon', sql.Bit, laMonTuChon ? 1 : 0)
        .execute('SP_ThemMonHoc');

      if (result.recordset && result.recordset.length > 0) {
        return {
          success: true,
          message: 'Thêm môn học thành công',
          data: result.recordset[0]
        };
      } else {
        return {
          success: false,
          message: 'Thêm môn học thất bại'
        };
      }
    } catch (error) {
      console.error('Model - Error themMonHoc:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  async layDanhSachMonHoc() {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .execute('SP_DocDanhSachMonHoc'); // Gọi Stored Procedure

        return {
            success: true,
            message: 'Lấy danh sách môn học thành công',
            data: result.recordset
        };
    } catch (error) {
        console.error('Model - Error layDanhSachMonHoc:', error);
        return {
            success: false,
            message: error.message
        };
    }
}
}

module.exports = MonHocModel;
