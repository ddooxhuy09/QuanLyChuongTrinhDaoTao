const { sql, poolPromise } = require("../config/database");

class MonHocModel {
  async getDanhSachMonHoc() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().execute("SP_GetDanhSachMonHoc");

      if (result.recordset && result.recordset.length > 0) {
        return {
          success: true,
          data: result.recordset,
        };
      }

      return {
        success: false,
        message: "Không tìm thấy dữ liệu môn học",
      };
    } catch (error) {
      console.error("Model - Error getDanhSachMonHoc:", error);
      return {
        success: false,
        message: error.message || "Lỗi không xác định",
      };
    }
  }

  async getMonHocByMa(maMonHoc) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaMonHoc", sql.VarChar(15), maMonHoc)
        .execute("SP_GetMonHocByMa");

      if (result.recordset && result.recordset.length > 0) {
        return {
          success: true,
          data: result.recordset[0],
        };
      }

      return {
        success: false,
        message: `Không tìm thấy môn học với mã ${maMonHoc}`,
      };
    } catch (error) {
      console.error("Model - Error getMonHocByMa:", error);
      return {
        success: false,
        message: error.message || "Lỗi không xác định",
      };
    }
  }

  async themMonHoc(monHocData) {
    try {
      const pool = await poolPromise;
      const request = pool
        .request()
        .input("MaMonHoc", sql.VarChar(15), monHocData.maMonHoc)
        .input("TenMonHoc", sql.NVarChar(150), monHocData.tenMonHoc)
        .input("SoTinChi", sql.Float, monHocData.soTinChi);

      // Thêm các tham số tùy chọn
      if (monHocData.soTietLiThuyet !== undefined)
        request.input("SoTietLiThuyet", sql.Int, monHocData.soTietLiThuyet);

      if (monHocData.soTietBaiTap !== undefined)
        request.input("SoTietBaiTap", sql.Int, monHocData.soTietBaiTap);

      if (monHocData.soTietThucHanh !== undefined)
        request.input("SoTietThucHanh", sql.Int, monHocData.soTietThucHanh);

      if (monHocData.soTietTuHoc !== undefined)
        request.input("SoTietTuHoc", sql.Int, monHocData.soTietTuHoc);

      if (monHocData.ngonNguDay !== undefined)
        request.input("NgonNguDay", sql.NVarChar(50), monHocData.ngonNguDay);

      if (monHocData.loaiMon !== undefined)
        request.input("LoaiMon", sql.NVarChar(50), monHocData.loaiMon);

      if (monHocData.maKhoiKienThuc !== undefined)
        request.input(
          "MaKhoiKienThuc",
          sql.VarChar(10),
          monHocData.maKhoiKienThuc
        );

      if (monHocData.maMonHocTruoc !== undefined)
        request.input(
          "MaMonHocTruoc",
          sql.VarChar(15),
          monHocData.maMonHocTruoc
        );

      if (monHocData.maMonHocTienQuyet !== undefined)
        request.input(
          "MaMonHocTienQuyet",
          sql.VarChar(15),
          monHocData.maMonHocTienQuyet
        );

      if (monHocData.maMonHocSongHanh !== undefined)
        request.input(
          "MaMonHocSongHanh",
          sql.VarChar(15),
          monHocData.maMonHocSongHanh
        );

      if (monHocData.tenMonHocTiengAnh !== undefined)
        request.input(
          "TenMonHocTiengAnh",
          sql.NVarChar(150),
          monHocData.tenMonHocTiengAnh
        );

      const result = await request.execute("SP_ThemMonHoc");

      if (result.recordset && result.recordset.length > 0) {
        return {
          success: true,
          message: "Thêm môn học thành công",
          data: result.recordset[0],
        };
      }

      return {
        success: false,
        message: "Không thể thêm môn học",
      };
    } catch (error) {
      console.error("Model - Error themMonHoc:", error);
      const errorMessage =
        error.message || error.originalError?.message || "Lỗi không xác định";
      return {
        success: false,
        message: errorMessage,
      };
    }
  }

  async capNhatMonHoc(maMonHoc, monHocData) {
    try {
      const pool = await poolPromise;
      const request = pool
        .request()
        .input("MaMonHoc", sql.VarChar(15), maMonHoc);

      // Thêm các tham số cần cập nhật
      if (monHocData.tenMonHoc !== undefined)
        request.input("TenMonHoc", sql.NVarChar(150), monHocData.tenMonHoc);

      if (monHocData.soTinChi !== undefined)
        request.input("SoTinChi", sql.Float, monHocData.soTinChi);

      if (monHocData.soTietLiThuyet !== undefined)
        request.input("SoTietLiThuyet", sql.Int, monHocData.soTietLiThuyet);

      if (monHocData.soTietBaiTap !== undefined)
        request.input("SoTietBaiTap", sql.Int, monHocData.soTietBaiTap);

      if (monHocData.soTietThucHanh !== undefined)
        request.input("SoTietThucHanh", sql.Int, monHocData.soTietThucHanh);

      if (monHocData.soTietTuHoc !== undefined)
        request.input("SoTietTuHoc", sql.Int, monHocData.soTietTuHoc);

      if (monHocData.ngonNguDay !== undefined)
        request.input("NgonNguDay", sql.NVarChar(50), monHocData.ngonNguDay);

      if (monHocData.loaiMon !== undefined)
        request.input("LoaiMon", sql.NVarChar(50), monHocData.loaiMon);

      if (monHocData.maKhoiKienThuc !== undefined)
        request.input(
          "MaKhoiKienThuc",
          sql.VarChar(10),
          monHocData.maKhoiKienThuc
        );

      if (monHocData.maMonHocTruoc !== undefined)
        request.input(
          "MaMonHocTruoc",
          sql.VarChar(15),
          monHocData.maMonHocTruoc
        );

      if (monHocData.maMonHocTienQuyet !== undefined)
        request.input(
          "MaMonHocTienQuyet",
          sql.VarChar(15),
          monHocData.maMonHocTienQuyet
        );

      if (monHocData.maMonHocSongHanh !== undefined)
        request.input(
          "MaMonHocSongHanh",
          sql.VarChar(15),
          monHocData.maMonHocSongHanh
        );

      if (monHocData.tenMonHocTiengAnh !== undefined)
        request.input(
          "TenMonHocTiengAnh",
          sql.NVarChar(150),
          monHocData.tenMonHocTiengAnh
        );

      const result = await request.execute("SP_CapNhatMonHoc");

      if (result.recordset && result.recordset.length > 0) {
        return {
          success: true,
          message: "Cập nhật môn học thành công",
          data: result.recordset[0],
        };
      }

      return {
        success: false,
        message: "Không thể cập nhật môn học",
      };
    } catch (error) {
      console.error("Model - Error capNhatMonHoc:", error);
      const errorMessage =
        error.message || error.originalError?.message || "Lỗi không xác định";
      return {
        success: false,
        message: errorMessage,
      };
    }
  }

  async xoaMonHoc(maMonHoc) {
    try {
      const pool = await poolPromise;
      const request = pool
        .request()
        .input("MaMonHoc", sql.VarChar(15), maMonHoc);

      const result = await request.execute("SP_XoaMonHoc");

      if (result.recordset && result.recordset.length > 0) {
        return {
          success: true,
          message: `Xóa môn học ${maMonHoc} thành công`,
          data: result.recordset[0],
        };
      }

      return {
        success: false,
        message: "Không thể xóa môn học",
      };
    } catch (error) {
      console.error("Model - Error xoaMonHoc:", error);
      const errorMessage =
        error.message || error.originalError?.message || "Lỗi không xác định";
      return {
        success: false,
        message: errorMessage,
      };
    }
  }

  async layMonHocTheoGiangVien(maGiangVien) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaGiangVien", sql.VarChar(10), maGiangVien)
        .execute("SP_LayMonHocTheoGiangVien");
      return { success: true, data: result.recordset };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async capNhatMonHocChoGiangVien(maGiangVien, danhSachMaMonHoc) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaGiangVien", sql.VarChar(10), maGiangVien)
        .input("DanhSachMaMonHoc", sql.NVarChar(sql.MAX), danhSachMaMonHoc)
        .execute("SP_CapNhatMonHocChoGiangVien");
      return { success: true, data: result.recordset };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

module.exports = MonHocModel;
