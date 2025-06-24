const { sql, poolPromise } = require("../config/database");

class GiangVienModel {
  async themGiangVien(
    maGiangVien,
    hoTen,
    maKhoa,
    email,
    ngaySinh,
    tenDangNhap,
    matKhau
  ) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaGiangVien", sql.VarChar(10), maGiangVien)
        .input("HoTen", sql.NVarChar(100), hoTen)
        .input("MaKhoa", sql.VarChar(10), maKhoa)
        .input("Email", sql.VarChar(100), email)
        .input("NgaySinh", sql.Date, ngaySinh)
        .input("TenDangNhap", sql.VarChar(50), tenDangNhap)
        .input("MatKhau", sql.NVarChar(100), matKhau)
        .execute("SP_ThemGiangVien");
      return { success: true, data: result.recordset[0] };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  async capNhatGiangVien(maGiangVien, hoTen, maKhoa, email, ngaySinh) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaGiangVien", sql.VarChar(10), maGiangVien)
        .input("HoTen", sql.NVarChar(100), hoTen)
        .input("MaKhoa", sql.VarChar(10), maKhoa)
        .input("Email", sql.VarChar(100), email)
        .input("NgaySinh", sql.Date, ngaySinh)
        .execute("SP_CapNhatGiangVien");
      return { success: true, data: result.recordset[0] };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  async xoaGiangVien(maGiangVien) {
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("MaGiangVien", sql.VarChar(10), maGiangVien)
        .execute("SP_XoaGiangVien");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  async layDanhSachGiangVien() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().execute("SP_LayDanhSachGiangVien");
      return { success: true, data: result.recordset };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  async layGiangVienTheoMa(maGiangVien) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaGiangVien", sql.VarChar(10), maGiangVien)
        .execute("SP_LayGiangVienTheoMa");
      return { success: true, data: result.recordset[0] };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  // Lấy danh sách môn học theo giảng viên
  static async layMonHocTheoGiangVien(maGiangVien) {
    try {
      console.log("Model - Fetching môn học for giảng viên:", maGiangVien);
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaGiangVien", sql.VarChar(10), maGiangVien)
        .execute("SP_LayMonHocTheoGiangVien");

      console.log("Model - Query result:", result.recordset);
      return {
        success: true,
        data: result.recordset,
      };
    } catch (error) {
      console.error("Lỗi lấy môn học theo giảng viên:", error);
      return {
        success: false,
        message: "Lỗi lấy danh sách môn học",
        error: error.message,
      };
    }
  }
}

module.exports = GiangVienModel;
