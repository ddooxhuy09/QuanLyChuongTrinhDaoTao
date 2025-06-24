const { sql, poolPromise } = require("../config/database");

class ChuongTrinhDaoTaoModel {
  async getDanhSachChuongTrinhDaoTao() {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .execute("SP_GetDanhSachChuongTrinhDaoTao");

      return {
        success: true,
        data: result.recordset,
      };
    } catch (error) {
      console.error("Lỗi khi lấy danh sách chương trình đào tạo:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getToanBoChuongTrinhDaoTao(maChuongTrinh) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
        .execute("SP_GetToanBoChuongTrinhDaoTaoByMaCT");

      if (result.recordsets.length === 0) {
        return {
          success: false,
          message: `Không tìm thấy chương trình đào tạo với mã ${maChuongTrinh}`,
        };
      }

      // Lấy thông tin chương trình đào tạo
      const thongTinChuongTrinh = result.recordsets[0][0];
      // Lấy danh sách khối kiến thức chuyên ngành
      const khoiKienThucChuyenNganh = result.recordsets[1];
      // Lấy danh sách môn học và chuyển đổi format
      const danhSachMonHoc = result.recordsets[2].map((mon) => ({
        maMonHoc: mon.MaMonHoc,
        tenMonHoc: mon.TenMonHoc,
        soTinChi: mon.SoTinChi,
        soTietLiThuyet: mon.SoTietLiThuyet,
        soTietBaiTap: mon.SoTietBaiTap,
        soTietThucHanh: mon.SoTietThucHanh,
        soTietTuHoc: mon.SoTietTuHoc,
        ngonNguDay: mon.NgonNguDay,
        loaiMon: mon.LoaiMon,
        maKhoiKienThuc: mon.MaKhoiKienThuc,
        tenKhoiKienThuc: mon.TenKhoiKienThuc,
        maMonHocTruoc: mon.MaMonHocTruoc,
        maMonHocTienQuyet: mon.MaMonHocTienQuyet,
        tenMonHocTienQuyet: mon.TenMonHocTienQuyet,
        maMonHocSongHanh: mon.MaMonHocSongHanh,
        tenMonHocTiengAnh: mon.TenMonHocTiengAnh,
        hocKy: mon.KyHoc,
        maChuyenNganh: mon.MaChuyenNganh,
      }));

      return {
        success: true,
        data: {
          thongTinChuongTrinh,
          khoiKienThucChuyenNganh,
          danhSachMonHoc,
        },
      };
    } catch (error) {
      console.error("Lỗi khi lấy thông tin chương trình đào tạo:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async themMonHocVaoCTDT(maChuongTrinh, hocKy, maMonHoc) {
    try {
      const pool = await poolPromise;

      // Kiểm tra môn tiên quyết
      const checkTienQuyet = await pool
        .request()
        .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
        .input("MaMonHoc", sql.VarChar(15), maMonHoc)
        .execute("SP_CheckMonTienQuyetHocKy");

      if (checkTienQuyet.recordset.length > 0) {
        const monTienQuyet = checkTienQuyet.recordset[0];

        // Kiểm tra môn tiên quyết đã được thêm vào CTDT chưa
        if (!monTienQuyet.KyHocTienQuyet) {
          return {
            success: false,
            message: `Môn học "${monTienQuyet.TenMonHoc}" có môn tiên quyết "${monTienQuyet.TenMonHocTienQuyet}" chưa được thêm vào chương trình đào tạo. Vui lòng thêm môn tiên quyết trước.`,
          };
        }

        // Kiểm tra học kỳ của môn tiên quyết
        const soHocKyTienQuyet = parseInt(
          monTienQuyet.KyHocTienQuyet.replace("HK", "").replace(/^0+/, "")
        );
        const soHocKyMoi = parseInt(hocKy.replace("HK", "").replace(/^0+/, ""));

        if (soHocKyTienQuyet >= soHocKyMoi) {
          return {
            success: false,
            message: `Không thể thêm môn học "${monTienQuyet.TenMonHoc}" vào học kỳ ${hocKy} vì môn tiên quyết "${monTienQuyet.TenMonHocTienQuyet}" nằm ở học kỳ ${monTienQuyet.KyHocTienQuyet}`,
          };
        }
      }

      // Thêm môn học vào CTDT
      const result = await pool
        .request()
        .input("MaChuongTrinh", sql.VarChar(20), maChuongTrinh)
        .input("HocKy", sql.VarChar(50), hocKy)
        .input("MaMonHoc", sql.VarChar(20), maMonHoc)
        .execute("SP_ThemMonHocVaoCTDT");

      return {
        success: true,
        message: result.recordset[0]?.Message || "Thêm môn học thành công",
      };
    } catch (error) {
      console.error("Lỗi khi thêm môn học vào chương trình đào tạo:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async xoaMonHocKhoiChuongTrinh(maChuongTrinh, maMonHoc) {
    try {
      const pool = await poolPromise;

      // Kiểm tra xem môn học có phải là môn tiên quyết của môn học khác trong CTDT không
      const checkMonTienQuyet = await pool
        .request()
        .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
        .input("MaMonHoc", sql.VarChar(15), maMonHoc)
        .execute("SP_CheckMonTienQuyetHocKy");

      if (checkMonTienQuyet.recordset.length > 0) {
        const monPhuThuoc = checkMonTienQuyet.recordset[0];
        return {
          success: false,
          message: `Không thể xóa môn học này vì nó là môn tiên quyết của môn "${monPhuThuoc.TenMonHoc}" trong chương trình đào tạo`,
        };
      }

      // Thực hiện xóa môn học
      const result = await pool
        .request()
        .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
        .input("MaMonHoc", sql.VarChar(15), maMonHoc)
        .execute("SP_XoaMonHocKhoiCTDT");

      if (result.rowsAffected[0] === 0) {
        return {
          success: false,
          message: "Không tìm thấy môn học trong chương trình đào tạo",
        };
      }

      return {
        success: true,
        message: "Xóa môn học khỏi chương trình đào tạo thành công",
      };
    } catch (error) {
      console.error("Lỗi khi xóa môn học khỏi chương trình đào tạo:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async capNhatHocKyMonHoc(
    maChuongTrinh,
    maMonHoc,
    hocKyMoi,
    maChuyenNganh = null
  ) {
    try {
      const pool = await poolPromise;

      // Lấy thông tin môn học hiện tại
      const monHocInfo = await pool
        .request()
        .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
        .input("MaMonHoc", sql.VarChar(15), maMonHoc)
        .execute("SP_GetThongTinMonHoc");

      if (monHocInfo.recordset.length === 0) {
        return {
          success: false,
          message: "Không tìm thấy môn học trong chương trình đào tạo",
        };
      }

      const monHoc = monHocInfo.recordset[0];
      let hocKyMoiFull = hocKyMoi;
      if (maChuyenNganh) {
        hocKyMoiFull = hocKyMoi + "-" + maChuyenNganh;
      }

      const soHocKyMoi = parseInt(
        hocKyMoi.replace("HK", "").replace(/^0+/, "")
      );

      // Kiểm tra môn tiên quyết
      if (monHoc.MaMonHocTienQuyet) {
        const checkTienQuyet = await pool
          .request()
          .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
          .input("MaMonHoc", sql.VarChar(15), monHoc.MaMonHocTienQuyet)
          .execute("SP_GetThongTinMonHoc");

        if (checkTienQuyet.recordset.length === 0) {
          return {
            success: false,
            message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn tiên quyết "${monHoc.TenMonHocTienQuyet}" chưa được thêm vào chương trình đào tạo`,
          };
        }

        const monTienQuyet = checkTienQuyet.recordset[0];
        if (!monTienQuyet.KyHoc) {
          return {
            success: false,
            message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn tiên quyết "${monHoc.TenMonHocTienQuyet}" chưa được xếp học kỳ`,
          };
        }

        let soKyHocTienQuyet;
        if (monTienQuyet.KyHoc.includes("-")) {
          soKyHocTienQuyet = parseInt(
            monTienQuyet.KyHoc.split("-")[0]
              .replace("HK", "")
              .replace(/^0+/, "")
          );
        } else {
          soKyHocTienQuyet = parseInt(
            monTienQuyet.KyHoc.replace("HK", "").replace(/^0+/, "")
          );
        }

        if (soKyHocTienQuyet >= soHocKyMoi) {
          return {
            success: false,
            message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn tiên quyết "${monHoc.TenMonHocTienQuyet}" nằm ở học kỳ ${monTienQuyet.KyHoc}`,
          };
        }
      }

      // Kiểm tra môn học trước
      if (monHoc.MaMonHocTruoc) {
        const checkMonTruoc = await pool
          .request()
          .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
          .input("MaMonHoc", sql.VarChar(15), monHoc.MaMonHocTruoc)
          .execute("SP_CheckMonTienQuyetHocKy");

        if (checkMonTruoc.recordset.length === 0) {
          return {
            success: false,
            message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn học trước "${monHoc.TenMonHocTruoc}" chưa được thêm vào chương trình đào tạo`,
          };
        }

        const monTruoc = checkMonTruoc.recordset[0];
        if (!monTruoc.KyHocTienQuyet) {
          return {
            success: false,
            message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn học trước "${monTruoc.TenMonHocTienQuyet}" chưa được xếp học kỳ`,
          };
        }

        let soKyHocMonTruoc;
        if (monTruoc.KyHocTienQuyet.includes("-")) {
          soKyHocMonTruoc = parseInt(
            monTruoc.KyHocTienQuyet.split("-")[0]
              .replace("HK", "")
              .replace(/^0+/, "")
          );
        } else {
          soKyHocMonTruoc = parseInt(
            monTruoc.KyHocTienQuyet.replace("HK", "").replace(/^0+/, "")
          );
        }

        if (soKyHocMonTruoc >= soHocKyMoi) {
          return {
            success: false,
            message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn học trước "${monTruoc.TenMonHocTienQuyet}" nằm ở học kỳ ${monTruoc.KyHocTienQuyet}`,
          };
        }
      }

      // Kiểm tra môn song hành
      if (monHoc.MaMonHocSongHanh) {
        const checkMonSongHanh = await pool
          .request()
          .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
          .input("MaMonHoc", sql.VarChar(15), monHoc.MaMonHocSongHanh)
          .execute("SP_CheckMonTienQuyetHocKy");

        if (checkMonSongHanh.recordset.length === 0) {
          return {
            success: false,
            message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn song hành "${monHoc.TenMonHocSongHanh}" chưa được thêm vào chương trình đào tạo`,
          };
        }

        const monSongHanh = checkMonSongHanh.recordset[0];
        if (!monSongHanh.KyHocTienQuyet) {
          return {
            success: false,
            message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn song hành "${monSongHanh.TenMonHocTienQuyet}" chưa được xếp học kỳ`,
          };
        }

        if (monSongHanh.KyHocTienQuyet !== hocKyMoi) {
          return {
            success: false,
            message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn song hành "${monSongHanh.TenMonHocTienQuyet}" nằm ở học kỳ ${monSongHanh.KyHocTienQuyet}`,
          };
        }
      }

      // Cập nhật học kỳ
      const result = await pool
        .request()
        .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
        .input("MaMonHoc", sql.VarChar(15), maMonHoc)
        .input("KyHocMoi", sql.NVarChar(50), hocKyMoiFull)
        .execute("SP_CapNhatHocKyMonHoc");

      if (result.rowsAffected[0] === 0) {
        return {
          success: false,
          message: "Không tìm thấy môn học trong chương trình đào tạo",
        };
      }

      return {
        success: true,
        message: "Cập nhật học kỳ thành công",
      };
    } catch (error) {
      console.error("Lỗi khi cập nhật học kỳ môn học:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getChuyenNganhByMaCT(maChuongTrinh) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
        .execute("SP_GetChuyenNganhByMaCT");

      // Chuyển đổi tên trường từ PascalCase sang camelCase và parse JSON
      const chuyenNganh = result.recordset.map((item) => ({
        maKhoiKienThuc: item.MaKhoiKienThuc,
        tenKhoiKienThuc: item.TenKhoiKienThuc,
        keHoachHocTap: JSON.parse(item.keHoachHocTap),
      }));

      return {
        success: true,
        data: chuyenNganh,
      };
    } catch (error) {
      console.error("Lỗi khi lấy thông tin chuyên ngành:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async themMonTuChonVaoHocKy(maChuongTrinh, maKhoiKienThuc, hocKy) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
        .input("MaKhoiKienThuc", sql.VarChar(10), maKhoiKienThuc)
        .input("HocKy", sql.VarChar(50), hocKy)
        .execute("SP_ThemMonTuChonVaoHocKy");

      return {
        success: true,
        message: result.recordset[0]?.Message || "Thêm môn tự chọn thành công",
      };
    } catch (error) {
      console.error("Lỗi khi thêm môn tự chọn vào học kỳ:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async xoaMonTuChonKhoiHocKy(maChuongTrinh, maMonHoc, hocKy) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
        .input("MaMonHoc", sql.VarChar(15), maMonHoc)
        .input("HocKy", sql.VarChar(50), hocKy)
        .execute("SP_XoaMonTuChonKhoiHocKy");

      return {
        success: result.recordset[0]?.Success === 1,
        message: result.recordset[0]?.Message || "Xóa môn tự chọn thành công",
      };
    } catch (error) {
      console.error("Lỗi khi xóa môn tự chọn khỏi học kỳ:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getDanhSachMonTuChon(maChuongTrinh, maKhoiKienThuc, hocKy) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
        .input("MaKhoiKienThuc", sql.VarChar(10), maKhoiKienThuc)
        .input("HocKy", sql.VarChar(50), hocKy)
        .execute("SP_GetDanhSachMonTuChon");

      return {
        success: true,
        data: result.recordset,
      };
    } catch (error) {
      console.error("Lỗi khi lấy danh sách môn tự chọn:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async themChuongTrinhDaoTao(
    maChuongTrinh,
    tenChuongTrinh,
    maNganh,
    trinhDoDaoTao,
    hinhThucDaoTao,
    namApDung
  ) {
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
        .input("TenChuongTrinh", sql.NVarChar(100), tenChuongTrinh)
        .input("MaNganh", sql.VarChar(10), maNganh)
        .input("TrinhDoDaoTao", sql.NVarChar(50), trinhDoDaoTao)
        .input("HinhThucDaoTao", sql.NVarChar(50), hinhThucDaoTao)
        .input("NamApDung", sql.Int, namApDung)
        .query(`INSERT INTO ChuongTrinhDaoTao (MaChuongTrinh, TenChuongTrinh, MaNganh, TrinhDoDaoTao, HinhThucDaoTao, NamApDung)
                VALUES (@MaChuongTrinh, @TenChuongTrinh, @MaNganh, @TrinhDoDaoTao, @HinhThucDaoTao, @NamApDung)`);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async xoaChuongTrinhDaoTao(maChuongTrinh) {
    try {
      const pool = await poolPromise;
      // Kiểm tra liên kết với ChiTiet_CTDT
      const check = await pool
        .request()
        .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
        .query(
          "SELECT COUNT(*) AS count FROM ChiTiet_CTDT WHERE MaChuongTrinh = @MaChuongTrinh"
        );
      if (check.recordset[0].count > 0) {
        return {
          success: false,
          message: "Không thể xóa vì còn liên kết với các môn học.",
        };
      }
      await pool
        .request()
        .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
        .query(
          "DELETE FROM ChuongTrinhDaoTao WHERE MaChuongTrinh = @MaChuongTrinh"
        );
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async capNhatChuongTrinhDaoTao(
    maChuongTrinh,
    tenChuongTrinh,
    maNganh,
    trinhDoDaoTao,
    hinhThucDaoTao,
    namApDung
  ) {
    try {
      const pool = await poolPromise;

      // Kiểm tra khi thay đổi năm áp dụng (nếu có)
      if (namApDung !== null && namApDung !== undefined) {
        // 1. Kiểm tra xem chương trình đã có kế hoạch học tập chưa
        const keHoachResult = await this.getChuyenNganhByMaCT(maChuongTrinh);

        if (keHoachResult.success && keHoachResult.data.length > 0) {
          // Có kế hoạch học tập, kiểm tra tổng tín chỉ mỗi kì học
          for (const chuyenNganh of keHoachResult.data) {
            if (chuyenNganh.keHoachHocTap && chuyenNganh.keHoachHocTap.length > 0) {
              for (const hocKy of chuyenNganh.keHoachHocTap) {
                if (hocKy.monHoc && hocKy.monHoc.length > 0) {
                  // Tính tổng tín chỉ của học kì này (không tính môn tự chọn có mã 1-9)
                  const tongTinChi = hocKy.monHoc
                    .filter(mon => !/^[1-9]$/.test(mon.maMonHoc)) // Loại bỏ môn tự chọn
                    .reduce((tong, mon) => tong + (mon.soTinChi || 0), 0);

                  // Kiểm tra nếu tổng tín chỉ không trong khoảng 15-23
                  if (tongTinChi < 15 || tongTinChi > 23) {
                    return {
                      success: false,
                      message: `Không thể áp dụng năm ${namApDung} vì học kỳ ${hocKy.hocKy} của chuyên ngành "${chuyenNganh.tenKhoiKienThuc}" có tổng tín chỉ là ${tongTinChi} (phải từ 15-23 tín chỉ)`
                    };
                  }
                }
              }
            }
          }
        } else {
          // Chưa có kế hoạch học tập
          return {
            success: false,
            message: `Không thể áp dụng năm ${namApDung} vì chương trình đào tạo chưa có kế hoạch học tập. Vui lòng hoàn thiện kế hoạch học tập trước khi áp dụng.`
          };
        }
      }

      // Thực hiện cập nhật nếu tất cả kiểm tra đều hợp lệ
      await pool
        .request()
        .input("MaChuongTrinh", sql.VarChar(10), maChuongTrinh)
        .input("TenChuongTrinh", sql.NVarChar(100), tenChuongTrinh)
        .input("MaNganh", sql.VarChar(10), maNganh)
        .input("TrinhDoDaoTao", sql.NVarChar(50), trinhDoDaoTao)
        .input("HinhThucDaoTao", sql.NVarChar(50), hinhThucDaoTao)
        .input("NamApDung", sql.Int, namApDung)
        .query(
          `UPDATE ChuongTrinhDaoTao SET TenChuongTrinh = @TenChuongTrinh, MaNganh = @MaNganh, TrinhDoDaoTao = @TrinhDoDaoTao, HinhThucDaoTao = @HinhThucDaoTao, NamApDung = @NamApDung WHERE MaChuongTrinh = @MaChuongTrinh`
        );
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

module.exports = ChuongTrinhDaoTaoModel;
