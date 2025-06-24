const { sql, poolPromise } = require("../config/database");

class NganhModel {
  async layDanhSachNganh() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`
        SELECT n.MaNganh, n.MaKhoa, k.TenKhoa, n.TenNganh, n.MoTa
        FROM Nganh n
        LEFT JOIN Khoa k ON n.MaKhoa = k.MaKhoa
      `);
      return { success: true, data: result.recordset };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  async layNganhTheoMa(maNganh) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaNganh", sql.VarChar(10), maNganh).query(`
          SELECT n.MaNganh, n.MaKhoa, k.TenKhoa, n.TenNganh, n.MoTa
          FROM Nganh n
          LEFT JOIN Khoa k ON n.MaKhoa = k.MaKhoa
          WHERE n.MaNganh = @MaNganh
        `);
      return { success: true, data: result.recordset[0] };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  async themNganh(maNganh, maKhoa, tenNganh, moTa) {
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("MaNganh", sql.VarChar(10), maNganh)
        .input("MaKhoa", sql.VarChar(10), maKhoa)
        .input("TenNganh", sql.NVarChar(100), tenNganh)
        .input("MoTa", sql.NVarChar(sql.MAX), moTa)
        .query(
          "INSERT INTO Nganh (MaNganh, MaKhoa, TenNganh, MoTa) VALUES (@MaNganh, @MaKhoa, @TenNganh, @MoTa)"
        );
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  async capNhatNganh(maNganh, maKhoa, tenNganh, moTa) {
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("MaNganh", sql.VarChar(10), maNganh)
        .input("MaKhoa", sql.VarChar(10), maKhoa)
        .input("TenNganh", sql.NVarChar(100), tenNganh)
        .input("MoTa", sql.NVarChar(sql.MAX), moTa)
        .query(
          "UPDATE Nganh SET MaKhoa = @MaKhoa, TenNganh = @TenNganh, MoTa = @MoTa WHERE MaNganh = @MaNganh"
        );
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  async xoaNganh(maNganh) {
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("MaNganh", sql.VarChar(10), maNganh)
        .query("DELETE FROM Nganh WHERE MaNganh = @MaNganh");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

module.exports = NganhModel;
