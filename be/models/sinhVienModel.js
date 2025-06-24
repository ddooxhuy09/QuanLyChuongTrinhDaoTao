const { sql, poolPromise } = require("../config/database");

class SinhVienModel {
  async themSinhVien(
    maSinhVien,
    hoTen,
    ngaySinh,
    maNganh,
    namNhapHoc,
    email,
    tenDangNhap,
    matKhau
  ) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaSinhVien", sql.VarChar(10), maSinhVien)
        .input("HoTen", sql.NVarChar(100), hoTen)
        .input("NgaySinh", ngaySinh ? sql.Date : sql.Date, ngaySinh || null)
        .input("MaNganh", sql.VarChar(10), maNganh)
        .input("NamNhapHoc", sql.Int, namNhapHoc)
        .input("Email", sql.VarChar(100), email || null)
        .input("TenDangNhap", sql.VarChar(50), tenDangNhap)
        .input("MatKhau", sql.NVarChar(100), matKhau)
        .execute("SP_ThemSinhVien");

      if (result.recordset && result.recordset.length > 0) {
        return {
          success: true,
          message: "Thêm sinh viên thành công",
          data: result.recordset[0],
        };
      } else {
        return {
          success: false,
          message: "Không thể thêm sinh viên",
        };
      }
    } catch (error) {
      console.error("Model - Error themSinhVien:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async capNhatSinhVien(
    maSinhVien,
    hoTen,
    ngaySinh,
    maNganh,
    namNhapHoc,
    email
  ) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaSinhVien", sql.VarChar(10), maSinhVien)
        .input("HoTen", sql.NVarChar(100), hoTen)
        .input("NgaySinh", sql.Date, ngaySinh)
        .input("MaNganh", sql.VarChar(10), maNganh)
        .input("NamNhapHoc", sql.Int, namNhapHoc)
        .input("Email", sql.VarChar(100), email || null)
        .execute("SP_CapNhatSinhVien");
      return { success: true, data: result.recordset[0] };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async xoaSinhVien(maSinhVien) {
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("MaSinhVien", sql.VarChar(10), maSinhVien)
        .execute("SP_XoaSinhVien");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async layDanhSachSinhVien() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().execute("SP_LayDanhSachSinhVien");
      return { success: true, data: result.recordset };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async laySinhVienTheoMa(maSinhVien) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaSinhVien", sql.VarChar(10), maSinhVien)
        .execute("SP_LaySinhVienTheoMa");
      return { success: true, data: result.recordset[0] };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async layChuongTrinhDaoTaoCuaSinhVien(maSinhVien) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaSinhVien", sql.VarChar(10), maSinhVien)
        .execute("SP_LayChuongTrinhDaoTaoCuaSinhVien");

      if (result.recordset && result.recordset.length > 0) {
        return {
          success: true,
          data: result.recordset[0]
        };
      } else {
        return {
          success: false,
          message: "Không tìm thấy thông tin chương trình đào tạo của sinh viên"
        };
      }
    } catch (error) {
      console.error("Model - Error layChuongTrinhDaoTaoCuaSinhVien:", error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  async layChuongTrinhDaoTaoVaCacChuongTrinhCungLoai(maSinhVien) {
    try {
      const pool = await poolPromise;

      // Chỉ lấy thông tin chương trình đào tạo của sinh viên đó thôi
      const studentProgramResult = await pool
        .request()
        .input("MaSinhVien", sql.VarChar(10), maSinhVien)
        .execute("SP_LayChuongTrinhDaoTaoCuaSinhVien");

      if (!studentProgramResult.recordset || studentProgramResult.recordset.length === 0) {
        return {
          success: false,
          message: "Không tìm thấy thông tin chương trình đào tạo của sinh viên"
        };
      }

      const studentProgram = studentProgramResult.recordset[0];

      // Chỉ trả về chương trình đào tạo của sinh viên đó thôi
      return {
        success: true,
        data: {
          studentProgram: studentProgram,
          allPrograms: [studentProgram] // Chỉ có 1 chương trình đào tạo của sinh viên
        }
      };
    } catch (error) {
      console.error("Model - Error layChuongTrinhDaoTaoVaCacChuongTrinhCungLoai:", error);
      return {
        success: false,
        message: error.message
      };
    }
  }
}

module.exports = SinhVienModel;
