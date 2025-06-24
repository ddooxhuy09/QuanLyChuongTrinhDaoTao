const GiangVienModel = require("../models/giangVienModel");

class GiangVienController {
  constructor() {
    this.giangVienModel = new GiangVienModel();
  }
  async themGiangVien(req, res) {
    try {
      const {
        maGiangVien,
        hoTen,
        maKhoa,
        email,
        ngaySinh,
        tenDangNhap,
        matKhau,
      } = req.body;
      if (!maGiangVien || !hoTen || !maKhoa || !tenDangNhap || !matKhau) {
        return res
          .status(400)
          .json({ success: false, message: "Thiếu thông tin bắt buộc" });
      }
      const result = await this.giangVienModel.themGiangVien(
        maGiangVien,
        hoTen,
        maKhoa,
        email,
        ngaySinh,
        tenDangNhap,
        matKhau
      );
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async capNhatGiangVien(req, res) {
    try {
      const { maGiangVien, hoTen, maKhoa, email, ngaySinh } = req.body;
      if (!maGiangVien) {
        return res
          .status(400)
          .json({ success: false, message: "Thiếu mã giảng viên" });
      }
      const result = await this.giangVienModel.capNhatGiangVien(
        maGiangVien,
        hoTen,
        maKhoa,
        email,
        ngaySinh
      );
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async xoaGiangVien(req, res) {
    try {
      const { maGiangVien } = req.params;
      if (!maGiangVien) {
        return res
          .status(400)
          .json({ success: false, message: "Thiếu mã giảng viên" });
      }
      const result = await this.giangVienModel.xoaGiangVien(maGiangVien);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async layDanhSachGiangVien(req, res) {
    try {
      const result = await this.giangVienModel.layDanhSachGiangVien();
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async layGiangVienTheoMa(req, res) {
    try {
      const { maGiangVien } = req.params;
      if (!maGiangVien) {
        return res
          .status(400)
          .json({ success: false, message: "Thiếu mã giảng viên" });
      }
      const result = await this.giangVienModel.layGiangVienTheoMa(maGiangVien);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async layMonHocTheoGiangVien(req, res) {
    try {
      const { maGiangVien } = req.params;
      console.log("Controller - Received request for giảng viên:", maGiangVien);

      if (!maGiangVien) {
        return res
          .status(400)
          .json({ success: false, message: "Thiếu mã giảng viên" });
      }

      const result = await GiangVienModel.layMonHocTheoGiangVien(maGiangVien);
      console.log("Controller - Model result:", result);

      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error("Controller - Error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = GiangVienController;
