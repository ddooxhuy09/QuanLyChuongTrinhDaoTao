const { sql, poolPromise } = require("../config/database");

class DashboardModel {
  async getSummary() {
    try {
      console.log("DashboardModel getSummary started");
      const pool = await poolPromise;

      // Check if pool is available
      if (!pool) {
        throw new Error("Database pool is not available");
      }

      const query = `
                SELECT
                    (SELECT COUNT(*) FROM SinhVien) AS soSinhVien,
                    (SELECT COUNT(*) FROM GiangVien) AS soGiangVien,
                    (SELECT COUNT(*) FROM Nganh) AS soNganh,
                    (SELECT COUNT(*) FROM Khoa) AS soKhoa,
                    (SELECT COUNT(*) FROM ChuongTrinhDaoTao) AS soChuongTrinhDaoTao,
                    (SELECT COUNT(*) FROM MonHoc) AS soMonHoc
            `;
      console.log("Executing query:", query);
      const result = await pool.request().query(query);
      console.log("Query result:", result.recordset[0]);

      if (!result.recordset || result.recordset.length === 0) {
        throw new Error("No data returned from database");
      }

      return { success: true, data: result.recordset[0] };
    } catch (error) {
      console.error("DashboardModel getSummary error:", error);
      return { success: false, message: `Database error: ${error.message}` };
    }
  }
  async getTopNganhSinhVien() {
    try {
      console.log("DashboardModel getTopNganhSinhVien started");
      const pool = await poolPromise;

      if (!pool) {
        throw new Error("Database pool is not available");
      }

      const result = await pool.request().query(`
                SELECT TOP 5 n.TenNganh, COUNT(sv.MaSinhVien) AS soSinhVien
                FROM Nganh n
                LEFT JOIN ChuongTrinhDaoTao ctdt ON n.MaNganh = ctdt.MaNganh
                LEFT JOIN SinhVien sv ON ctdt.MaChuongTrinh = sv.MaChuongTrinh
                GROUP BY n.TenNganh
                ORDER BY soSinhVien DESC
            `);
      console.log("getTopNganhSinhVien result:", result.recordset);
      return { success: true, data: result.recordset || [] };
    } catch (error) {
      console.error("DashboardModel getTopNganhSinhVien error:", error);
      return { success: false, message: `Database error: ${error.message}` };
    }
  }
  async getSinhVienNienKhoa() {
    try {
      console.log("DashboardModel getSinhVienNienKhoa started");
      const pool = await poolPromise;

      if (!pool) {
        throw new Error("Database pool is not available");
      }

      const result = await pool.request().query(`
                SELECT NamNhapHoc, COUNT(*) AS soSinhVien
                FROM SinhVien
                GROUP BY NamNhapHoc
                ORDER BY NamNhapHoc
            `);
      console.log("getSinhVienNienKhoa result:", result.recordset);
      return { success: true, data: result.recordset || [] };
    } catch (error) {
      console.error("DashboardModel getSinhVienNienKhoa error:", error);
      return { success: false, message: `Database error: ${error.message}` };
    }
  }
  async getGiangVienKhoa() {
    try {
      console.log("DashboardModel getGiangVienKhoa started");
      const pool = await poolPromise;

      if (!pool) {
        throw new Error("Database pool is not available");
      }

      const result = await pool.request().query(`
                SELECT k.TenKhoa, COUNT(gv.MaGiangVien) AS soGiangVien
                FROM Khoa k
                LEFT JOIN GiangVien gv ON k.MaKhoa = gv.MaKhoa
                GROUP BY k.TenKhoa
                ORDER BY soGiangVien DESC
            `);
      console.log("getGiangVienKhoa result:", result.recordset);
      return { success: true, data: result.recordset || [] };
    } catch (error) {
      console.error("DashboardModel getGiangVienKhoa error:", error);
      return { success: false, message: `Database error: ${error.message}` };
    }
  }
  async getMonHocCTDT() {
    try {
      console.log("DashboardModel getMonHocCTDT started");
      const pool = await poolPromise;

      if (!pool) {
        throw new Error("Database pool is not available");
      }

      const result = await pool.request().query(`
                SELECT ctdt.TenChuongTrinh, COUNT(ctctdt.MaMonHoc) AS soMonHoc
                FROM ChuongTrinhDaoTao ctdt
                LEFT JOIN ChiTiet_CTDT ctctdt ON ctdt.MaChuongTrinh = ctctdt.MaChuongTrinh
                GROUP BY ctdt.TenChuongTrinh
                ORDER BY soMonHoc DESC
            `);
      console.log("getMonHocCTDT result:", result.recordset);
      return { success: true, data: result.recordset || [] };
    } catch (error) {
      console.error("DashboardModel getMonHocCTDT error:", error);
      return { success: false, message: `Database error: ${error.message}` };
    }
  }
}

module.exports = DashboardModel;
