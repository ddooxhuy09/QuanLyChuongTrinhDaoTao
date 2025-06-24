const { sql, poolPromise } = require("../config/database");

class KhoiKienThucModel {
  async getDanhSachKhoiKienThuc() {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .execute("SP_GetKhoiKienThucHierarchy");

      if (result.recordset && result.recordset.length > 0) {
        // Tổ chức kết quả thành cấu trúc cây
        const khoiKienThucMap = {};
        const rootKhoiKienThuc = [];

        // Đầu tiên tạo map các khối kiến thức
        result.recordset.forEach((item) => {
          khoiKienThucMap[item.MaKhoiKienThuc] = {
            maKhoiKienThuc: item.MaKhoiKienThuc,
            tenKhoiKienThuc: item.TenKhoiKienThuc,
            parentId: item.ParentID,
            level: item.Level,
            tongSoTinChi: item.TongSoTinChi,
            khoiKienThucCon: [],
          };
        });

        // Sau đó tổ chức thành cấu trúc cây
        result.recordset.forEach((item) => {
          if (item.ParentID) {
            // Nếu có parent, thêm vào danh sách con của parent đó
            khoiKienThucMap[item.ParentID].khoiKienThucCon.push(
              khoiKienThucMap[item.MaKhoiKienThuc]
            );
          } else {
            // Nếu không có parent, đây là khối kiến thức gốc
            rootKhoiKienThuc.push(khoiKienThucMap[item.MaKhoiKienThuc]);
          }
        });

        // Tính lại tổng số tín chỉ theo cấu trúc phân cấp
        this.tinhTongSoTinChi(rootKhoiKienThuc);

        return {
          success: true,
          data: rootKhoiKienThuc,
        };
      }

      return {
        success: false,
        message: "Không tìm thấy dữ liệu khối kiến thức",
      };
    } catch (error) {
      console.error("Model - Error getDanhSachKhoiKienThuc:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // Phương thức đệ quy tính tổng tín chỉ
  tinhTongSoTinChi(khoiKienThucList) {
    for (const kkt of khoiKienThucList) {
      if (kkt.khoiKienThucCon && kkt.khoiKienThucCon.length > 0) {
        // Đệ quy tính tổng tín chỉ cho các khối con
        this.tinhTongSoTinChi(kkt.khoiKienThucCon);

        // Tính lại tổng tín chỉ cho khối hiện tại (là tổng tín chỉ của các khối con)
        let tongTinChiCon = kkt.khoiKienThucCon.reduce(
          (sum, item) => sum + item.tongSoTinChi,
          0
        );

        // Tổng tín chỉ khối cha = tổng tín chỉ riêng + tổng tín chỉ từ các khối con
        kkt.tongSoTinChi = Number(
          (kkt.tongSoTinChi + tongTinChiCon).toFixed(1)
        );
      }
    }
  }

  async getDanhSachMonHocByKhoiKienThuc(maKhoiKienThuc) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaKhoiKienThuc", sql.VarChar(10), maKhoiKienThuc)
        .execute("SP_GetMonHocByKhoiKienThuc");

      if (result.recordset && result.recordset.length > 0) {
        return {
          success: true,
          data: result.recordset,
        };
      }

      return {
        success: false,
        message: `Không tìm thấy môn học nào thuộc khối kiến thức ${maKhoiKienThuc}`,
      };
    } catch (error) {
      console.error("Model - Error getDanhSachMonHocByKhoiKienThuc:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }
  async themKhoiKienThuc(data) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaKhoiKienThuc", sql.VarChar(10), data.maKhoiKienThuc)
        .input("TenKhoiKienThuc", sql.NVarChar(255), data.tenKhoiKienThuc)
        .input("ParentID", sql.VarChar(10), data.parentId || null)
        .execute("SP_ThemKhoiKienThuc");

      return {
        success: true,
        message: "Thêm khối kiến thức thành công",
        data: result.recordset?.[0] || null,
      };
    } catch (error) {
      console.error("Model - Error themKhoiKienThuc:", error);
      return {
        success: false,
        message: error.message || "Lỗi không xác định",
      };
    }
  }

  async capNhatKhoiKienThuc(maKhoiKienThuc, data) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaKhoiKienThuc", sql.VarChar(10), maKhoiKienThuc)
        .input("TenKhoiKienThuc", sql.NVarChar(255), data.tenKhoiKienThuc)
        .input("ParentID", sql.VarChar(10), data.parentId || null)
        .execute("SP_CapNhatKhoiKienThuc");

      return {
        success: true,
        message: "Cập nhật khối kiến thức thành công",
        data: result.recordset?.[0] || null,
      };
    } catch (error) {
      console.error("Model - Error capNhatKhoiKienThuc:", error);
      return {
        success: false,
        message: error.message || "Lỗi không xác định",
      };
    }
  }
  async capNhatMonHocKhoiKienThuc(maKhoiKienThuc, danhSachMaMonHoc) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaKhoiKienThuc", sql.VarChar(10), maKhoiKienThuc)
        .input("DanhSachMaMonHoc", sql.NVarChar(sql.MAX), danhSachMaMonHoc)
        .execute("SP_CapNhatNhieuMonHocTheoKhoiKienThuc");

      return {
        success: true,
        message: "Cập nhật môn học cho khối kiến thức thành công",
        data: result.recordset || null,
      };
    } catch (error) {
      console.error("Model - Error capNhatMonHocKhoiKienThuc:", error);
      return {
        success: false,
        message: error.message || "Lỗi không xác định",
      };
    }
  }

  async xoaKhoiKienThuc(maKhoiKienThuc) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaKhoiKienThuc", sql.VarChar(10), maKhoiKienThuc)
        .execute("SP_XoaKhoiKienThuc");

      return {
        success: true,
        message: "Xóa khối kiến thức thành công",
        data: result.recordset?.[0] || null,
      };
    } catch (error) {
      console.error("Model - Error xoaKhoiKienThuc:", error);
      return {
        success: false,
        message: error.message || "Lỗi không xác định",
      };
    }
  }
}

module.exports = KhoiKienThucModel;
