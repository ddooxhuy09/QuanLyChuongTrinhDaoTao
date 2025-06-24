const { sql, poolPromise } = require("../config/database");

class KhoaModel {
  async layDanhSachKhoa() {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .query("SELECT MaKhoa, TenKhoa FROM Khoa");
      return { success: true, data: result.recordset };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  async layKhoaTheoMa(maKhoa) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaKhoa", sql.VarChar(10), maKhoa)
        .query("SELECT MaKhoa, TenKhoa FROM Khoa WHERE MaKhoa = @MaKhoa");
      return { success: true, data: result.recordset[0] };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  async themKhoa(maKhoa, tenKhoa) {
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("MaKhoa", sql.VarChar(10), maKhoa)
        .input("TenKhoa", sql.NVarChar(100), tenKhoa)
        .query("INSERT INTO Khoa (MaKhoa, TenKhoa) VALUES (@MaKhoa, @TenKhoa)");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  async capNhatKhoa(maKhoa, tenKhoa) {
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("MaKhoa", sql.VarChar(10), maKhoa)
        .input("TenKhoa", sql.NVarChar(100), tenKhoa)
        .query("UPDATE Khoa SET TenKhoa = @TenKhoa WHERE MaKhoa = @MaKhoa");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  async xoaKhoa(maKhoa) {
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("MaKhoa", sql.VarChar(10), maKhoa)
        .query("DELETE FROM Khoa WHERE MaKhoa = @MaKhoa");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

module.exports = KhoaModel;
