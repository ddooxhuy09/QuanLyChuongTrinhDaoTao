const { sql, poolPromise } = require("../config/database");
const jwt = require("jsonwebtoken");

class UserModel {
  async dangNhap(tenDangNhap, matKhau) {
    try {
      const pool = await poolPromise;

      const result = await pool
        .request()
        .input("TenDangNhap", sql.VarChar(50), tenDangNhap)
        .input("MatKhau", sql.NVarChar(100), matKhau)
        .execute("SP_Login");

      if (result.recordset && result.recordset.length > 0) {
        const user = result.recordset[0];

        // Map role từ database sang format hiển thị
        const roleMapping = {
          'SINHVIEN': 'Sinh Viên',
          'GIANGVIEN': 'Giảng Viên',
          'PHONGDAOTAO': 'Phòng đào tạo'
        };

        const mappedRole = roleMapping[user.Role] || user.Role;

        const token = jwt.sign(
          {
            id: user.ID,
            name: user.HoTen,
            role: user.Role, // Giữ nguyên role gốc cho middleware
          },
          "ttcs",
          { expiresIn: "30d" }
        );

        const responseData = {
          success: true,
          access_token: token,
          token_type: "bearer",
          userName: tenDangNhap,
          id: user.ID,
          name: user.HoTen,
          roles: mappedRole, // Trả về role đã map cho frontend
        };

        if (user.Role === "SINHVIEN") {
          responseData.maNganh = user.MaNganh;
          responseData.tenNganh = user.TenNganh;
        } else if (user.Role === "GIANGVIEN" || user.Role === "PHONGDAOTAO") {
          responseData.maKhoa = user.MaKhoa;
          responseData.tenKhoa = user.TenKhoa;
        }

        return responseData;
      } else {
        return {
          success: false,
          message: "Tên đăng nhập hoặc mật khẩu không đúng",
        };
      }
    } catch (error) {
      console.error("Model - Error dangNhap:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async themPhongDaoTao(tenDangNhap, matKhau) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("TenDangNhap", sql.VarChar(50), tenDangNhap)
        .input("MatKhau", sql.NVarChar(100), matKhau)
        .execute("SP_ThemPhongDaoTao");
      return { success: true, data: result.recordset[0] };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async xoaPhongDaoTao(id) {
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("ID", sql.VarChar(10), id)
        .execute("SP_XoaPhongDaoTao");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async layDanhSachPhongDaoTao() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().execute("SP_LayDanhSachPhongDaoTao");
      return { success: true, data: result.recordset };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async layThongTinChiTiet(userId) {
    try {
      const pool = await poolPromise;
      let result = null;

      // Phân biệt sinh viên và giảng viên dựa trên pattern userId
      if (userId.startsWith('N') || userId.startsWith('n')) {
        // userId là MaSinhVien (bắt đầu với N), sử dụng SP_LaySinhVienTheoMa
        result = await pool
          .request()
          .input("MaSinhVien", sql.VarChar(10), userId)
          .execute("SP_LaySinhVienTheoMa");
      } else if (userId.startsWith('GV') || userId.startsWith('gv')) {
        // userId là MaGiangVien (bắt đầu với GV), sử dụng SP_LayGiangVienTheoMa
        result = await pool
          .request()
          .input("MaGiangVien", sql.VarChar(10), userId)
          .execute("SP_LayGiangVienTheoMa");
      } else {
        // Thử cả 2 SP để tìm user
        try {
          result = await pool
            .request()
            .input("MaSinhVien", sql.VarChar(10), userId)
            .execute("SP_LaySinhVienTheoMa");

          if (!result.recordset || result.recordset.length === 0) {
            result = await pool
              .request()
              .input("MaGiangVien", sql.VarChar(10), userId)
              .execute("SP_LayGiangVienTheoMa");
          }
        } catch (error) {
          // Nếu SP_LaySinhVienTheoMa lỗi, thử SP_LayGiangVienTheoMa
          result = await pool
            .request()
            .input("MaGiangVien", sql.VarChar(10), userId)
            .execute("SP_LayGiangVienTheoMa");
        }
      }

      if (result && result.recordset && result.recordset.length > 0) {
        return {
          success: true,
          data: result.recordset[0]
        };
      } else {
        return { success: false, message: "Không tìm thấy thông tin người dùng với mã: " + userId };
      }
    } catch (error) {
      console.error("Model - Error layThongTinChiTiet:", error);
      return { success: false, message: error.message };
    }
  }

  async doiMatKhau(userId, matKhauCu, matKhauMoi) {
    try {
      const pool = await poolPromise;

      // userId là MaSinhVien (string), tìm user tương ứng trong bảng [User]
      // Giả sử TenDangNhap = MaSinhVien
      const checkResult = await pool
        .request()
        .input("TenDangNhap", sql.VarChar(50), userId)
        .input("MatKhauCu", sql.NVarChar(100), matKhauCu)
        .query(`
          SELECT ID FROM [User] 
          WHERE TenDangNhap = @TenDangNhap AND MatKhau = @MatKhauCu
        `);

      if (!checkResult.recordset || checkResult.recordset.length === 0) {
        return { success: false, message: "Mật khẩu cũ không đúng" };
      }

      // Cập nhật mật khẩu mới
      await pool
        .request()
        .input("TenDangNhap", sql.VarChar(50), userId)
        .input("MatKhauMoi", sql.NVarChar(100), matKhauMoi)
        .query(`
          UPDATE [User] 
          SET MatKhau = @MatKhauMoi 
          WHERE TenDangNhap = @TenDangNhap
        `);

      return { success: true, message: "Đổi mật khẩu thành công" };
    } catch (error) {
      console.error("Model - Error doiMatKhau:", error);
      return { success: false, message: error.message };
    }
  }

  async debugUsers() {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(`
          SELECT TOP 10 
            u.ID, u.TenDangNhap, u.Quyen,
            s.MaSinhVien, s.HoTen as SinhVienName,
            g.MaGiangVien, g.HoTen as GiangVienName
          FROM [User] u
          LEFT JOIN SinhVien s ON u.TenDangNhap = s.MaSinhVien
          LEFT JOIN GiangVien g ON u.TenDangNhap = g.MaGiangVien
          ORDER BY u.ID
        `);

      return { success: true, data: result.recordset };
    } catch (error) {
      console.error("Model - Error debugUsers:", error);
      return { success: false, message: error.message };
    }
  }

  async layChuongTrinhDaoTaoTheoToken(maSinhVien) {
    try {
      const pool = await poolPromise;

      // Bước 1: Lấy chương trình đào tạo hiện tại của sinh viên
      const currentResult = await pool
        .request()
        .input("MaSinhVien", sql.VarChar(10), maSinhVien)
        .execute("SP_LayChuongTrinhDaoTaoCuaSinhVien");

      if (!currentResult.recordset || currentResult.recordset.length === 0) {
        return {
          success: false,
          message: "Sinh viên chưa được gán vào chương trình đào tạo nào"
        };
      }

      const currentProgram = currentResult.recordset[0];

      // Bước 2: Tìm tất cả chương trình đào tạo cùng loại (TenChuongTrinh, MaNganh, TrinhDoDaoTao, HinhThucDaoTao)
      const allSimilarResult = await pool
        .request()
        .input("TenChuongTrinh", sql.NVarChar(100), currentProgram.TenChuongTrinh)
        .input("MaNganh", sql.VarChar(10), currentProgram.MaNganh)
        .input("TrinhDoDaoTao", sql.NVarChar(50), currentProgram.TrinhDoDaoTao)
        .input("HinhThucDaoTao", sql.NVarChar(50), currentProgram.HinhThucDaoTao)
        .query(`
          SELECT DISTINCT 
            ctdt.MaChuongTrinh,
            ctdt.TenChuongTrinh,
            ctdt.MaNganh,
            ctdt.TrinhDoDaoTao,
            ctdt.HinhThucDaoTao,
            ctdt.NamApDung,
            n.TenNganh,
            k.TenKhoa
          FROM ChuongTrinhDaoTao ctdt
          INNER JOIN Nganh n ON ctdt.MaNganh = n.MaNganh
          INNER JOIN Khoa k ON n.MaKhoa = k.MaKhoa
          WHERE ctdt.TenChuongTrinh = @TenChuongTrinh
            AND ctdt.MaNganh = @MaNganh
            AND ctdt.TrinhDoDaoTao = @TrinhDoDaoTao
            AND ctdt.HinhThucDaoTao = @HinhThucDaoTao
          ORDER BY ctdt.NamApDung DESC
        `);

      // Chuyển đổi format cho phù hợp với frontend
      const allPrograms = allSimilarResult.recordset.map(program => ({
        MaChuongTrinh: program.MaChuongTrinh,
        TenChuongTrinh: program.TenChuongTrinh,
        MaNganh: program.MaNganh,
        TrinhDoDaoTao: program.TrinhDoDaoTao,
        HinhThucDaoTao: program.HinhThucDaoTao,
        NamApDung: program.NamApDung,
        TenNganh: program.TenNganh,
        TenKhoa: program.TenKhoa,
        isCurrentProgram: program.MaChuongTrinh === currentProgram.MaChuongTrinh
      }));

      return {
        success: true,
        data: allPrograms
      };
    } catch (error) {
      console.error("Model - Error layChuongTrinhDaoTaoTheoToken:", error);
      return {
        success: false,
        message: error.message
      };
    }
  }
}

module.exports = UserModel;
