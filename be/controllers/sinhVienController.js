const SinhVienModel = require("../models/sinhVienModel");

class SinhVienController {
  constructor() {
    this.sinhVienModel = new SinhVienModel();
  }

  async themSinhVien(req, res) {
    try {
      const {
        maSinhVien,
        hoTen,
        ngaySinh,
        maNganh,
        namNhapHoc,
        email,
        tenDangNhap,
        matKhau,
      } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (
        !maSinhVien ||
        !hoTen ||
        !ngaySinh ||
        !maNganh ||
        !namNhapHoc ||
        !tenDangNhap ||
        !matKhau
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Mã sinh viên, họ tên, ngày sinh, mã ngành, năm nhập học, tên đăng nhập và mật khẩu không được để trống",
        });
      }

      let ngaySinhValue = null;
      if (ngaySinh) {
        // Nếu là chuỗi hợp lệ, giữ nguyên
        // Nếu là Date object, chuyển sang yyyy-mm-dd
        const d = new Date(ngaySinh);
        if (isNaN(d.getTime())) {
          return res
            .status(400)
            .json({ success: false, message: "Ngày sinh không hợp lệ" });
        }
        ngaySinhValue = d.toISOString().slice(0, 10);
      }

      // Gọi phương thức từ model để thêm sinh viên
      const result = await this.sinhVienModel.themSinhVien(
        maSinhVien,
        hoTen,
        ngaySinhValue,
        maNganh,
        namNhapHoc,
        email,
        tenDangNhap,
        matKhau
      );

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message,
      });
    }
  }

  async capNhatSinhVien(req, res) {
    try {
      const { maSinhVien, hoTen, ngaySinh, maNganh, namNhapHoc, email } =
        req.body;
      if (!maSinhVien) {
        return res
          .status(400)
          .json({ success: false, message: "Thiếu mã sinh viên" });
      }
      const result = await this.sinhVienModel.capNhatSinhVien(
        maSinhVien,
        hoTen,
        ngaySinh,
        maNganh,
        namNhapHoc,
        email
      );
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async xoaSinhVien(req, res) {
    try {
      const { maSinhVien } = req.params;
      if (!maSinhVien) {
        return res
          .status(400)
          .json({ success: false, message: "Thiếu mã sinh viên" });
      }
      const result = await this.sinhVienModel.xoaSinhVien(maSinhVien);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async layDanhSachSinhVien(req, res) {
    try {
      const result = await this.sinhVienModel.layDanhSachSinhVien();
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async laySinhVienTheoMa(req, res) {
    try {
      const { maSinhVien } = req.params;
      if (!maSinhVien) {
        return res
          .status(400)
          .json({ success: false, message: "Thiếu mã sinh viên" });
      }
      const result = await this.sinhVienModel.laySinhVienTheoMa(maSinhVien);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async layChuongTrinhDaoTaoCuaSinhVien(req, res) {
    try {
      const { maSinhVien } = req.params;
      if (!maSinhVien) {
        return res.status(400).json({
          success: false,
          message: "Thiếu mã sinh viên"
        });
      }

      const result = await this.sinhVienModel.layChuongTrinhDaoTaoCuaSinhVien(maSinhVien);

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: "Lấy thông tin chương trình đào tạo thành công",
          data: result.data
        });
      } else {
        return res.status(404).json(result);
      }
    } catch (error) {
      console.error("Controller - Error layChuongTrinhDaoTaoCuaSinhVien:", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message
      });
    }
  }

  async layTatCaChuongTrinhDaoTaoCuaSinhVienHienTai(req, res) {
    try {
      // Lấy mã sinh viên từ token (thông qua middleware auth)
      const maSinhVien = req.user?.id;

      if (!maSinhVien) {
        return res.status(400).json({
          success: false,
          message: "Không tìm thấy thông tin sinh viên trong token"
        });
      }

      // Kiểm tra role để đảm bảo là sinh viên
      if (req.user?.role !== 'SINHVIEN') {
        return res.status(403).json({
          success: false,
          message: "Chỉ sinh viên mới có thể sử dụng API này"
        });
      }

      const result = await this.sinhVienModel.layChuongTrinhDaoTaoVaCacChuongTrinhCungLoai(maSinhVien);

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: "Lấy thông tin chương trình đào tạo thành công",
          data: result.data
        });
      } else {
        return res.status(404).json(result);
      }
    } catch (error) {
      console.error("Controller - Error layTatCaChuongTrinhDaoTaoCuaSinhVienHienTai:", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message
      });
    }
  }

  // Debug method để kiểm tra thông tin token
  async debugToken(req, res) {
    try {
      return res.status(200).json({
        success: true,
        message: "Debug thông tin token",
        data: {
          user: req.user,
          userKeys: Object.keys(req.user || {}),
          userId: req.user?.id,
          userName: req.user?.name,
          userRole: req.user?.role
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message
      });
    }
  }
}

module.exports = SinhVienController;
