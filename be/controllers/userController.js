const UserModel = require("../models/userModel");

class UserController {
  constructor() {
    this.userModel = new UserModel();
  }

  async dangNhap(req, res) {
    try {
      const { tenDangNhap, matKhau } = req.body;

      if (!tenDangNhap || !matKhau) {
        return res.status(400).json({
          success: false,
          message: "Tên đăng nhập và mật khẩu không được để trống",
        });
      }

      const result = await this.userModel.dangNhap(tenDangNhap, matKhau);

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

  async themPhongDaoTao(req, res) {
    try {
      const { tenDangNhap, matKhau } = req.body;
      if (!tenDangNhap || !matKhau) {
        return res.status(400).json({
          success: false,
          message: "Tên đăng nhập và mật khẩu không được để trống",
        });
      }
      const result = await this.userModel.themPhongDaoTao(tenDangNhap, matKhau);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async xoaPhongDaoTao(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "Thiếu ID tài khoản" });
      }
      const result = await this.userModel.xoaPhongDaoTao(id);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async layDanhSachPhongDaoTao(req, res) {
    try {
      const result = await this.userModel.layDanhSachPhongDaoTao();
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async layThongTinChiTiet(req, res) {
    try {
      if (!req.user || !req.user.id) {
        return res.status(400).json({
          success: false,
          message: "Không tìm thấy thông tin user trong token"
        });
      }

      const userId = req.user.id;
      const result = await this.userModel.layThongTinChiTiet(userId);

      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error("Controller - Error layThongTinChiTiet:", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message
      });
    }
  }

  async doiMatKhau(req, res) {
    try {
      const userId = req.user.id; // Lấy từ token
      const { matKhauCu, matKhauMoi } = req.body;

      if (!matKhauCu || !matKhauMoi) {
        return res.status(400).json({
          success: false,
          message: "Mật khẩu cũ và mật khẩu mới không được để trống"
        });
      }

      if (matKhauMoi.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Mật khẩu mới phải có ít nhất 6 ký tự"
        });
      }

      const result = await this.userModel.doiMatKhau(userId, matKhauCu, matKhauMoi);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message
      });
    }
  }

  async debugUsers(req, res) {
    try {
      const result = await this.userModel.debugUsers();
      return res.status(200).json(result);
    } catch (error) {
      console.error("Controller - Error debugUsers:", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message
      });
    }
  }

  async testSinhVien(req, res) {
    try {
      const { maSinhVien } = req.params;
      const result = await this.userModel.layThongTinChiTiet(maSinhVien);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Controller - Error testSinhVien:", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message
      });
    }
  }

  async testGiangVien(req, res) {
    try {
      const { maGiangVien } = req.params;
      const result = await this.userModel.layThongTinChiTiet(maGiangVien);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Controller - Error testGiangVien:", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message
      });
    }
  }

  async layChuongTrinhDaoTaoCuaToi(req, res) {
    try {
      // Lấy mã sinh viên từ token
      const maSinhVien = req.user?.id;

      if (!maSinhVien) {
        return res.status(400).json({
          success: false,
          message: "Không tìm thấy thông tin sinh viên trong token"
        });
      }

      // Kiểm tra role để đảm bảo là sinh viên - mở rộng điều kiện
      const userRole = req.user?.role;
      const isStudent = userRole === 'SINHVIEN' ||
        userRole === 'Sinh viên' ||
        userRole === 'Sinh Viên' ||
        userRole === 'sinh viên' ||
        userRole === 'sinhvien';

      if (!isStudent) {
        return res.status(403).json({
          success: false,
          message: `Chỉ sinh viên mới có thể sử dụng API này. Role hiện tại: ${userRole}`
        });
      }

      const result = await this.userModel.layChuongTrinhDaoTaoTheoToken(maSinhVien);

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
      console.error("Controller - Error layChuongTrinhDaoTaoCuaToi:", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message
      });
    }
  }
}

module.exports = UserController;
