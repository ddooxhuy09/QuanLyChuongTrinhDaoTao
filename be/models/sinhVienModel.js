const { sql, poolPromise } = require("../config/database");

class SinhVienModel {
    async themSinhVien(hoTen, ngaySinh, maNganh, namNhapHoc, email) {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input("HoTen", sql.NVarChar(100), hoTen)
                .input("NgaySinh", sql.Date, ngaySinh)
                .input("MaNganh", sql.VarChar(10), maNganh)
                .input("NamNhapHoc", sql.Int, namNhapHoc)
                .input("Email", sql.VarChar(100), email || null)
                .execute("SP_ThemSinhVien");

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: "Thêm sinh viên thành công",
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: "Không thể thêm sinh viên"
                };
            }
        } catch (error) {
            console.error("Model - Error themSinhVien:", error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = SinhVienModel;