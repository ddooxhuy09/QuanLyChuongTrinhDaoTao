const MonHocModel = require("../models/monHocModel");

class MonHocController {
  constructor() {
    this.monHocModel = new MonHocModel();
  }

  async themMonHoc(req, res) {
    try {
      const {
        maMonHoc,
        tenMonHoc,
        soTinChi,
        soTietLiThuyet,
        soTietBaiTap,
        soTietThucHanh,
        soTietTuHoc,
        ngonNguDay,
        laMonTuChon,
        maKhoiKienThuc,
      } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!maMonHoc || !tenMonHoc || !soTinChi || !maKhoiKienThuc) {
        return res.status(400).json({
          success: false,
          message:
            "Mã môn học, tên môn học, số tín chỉ và mã khối kiến thức không được để trống",
        });
      }

      if (soTinChi <= 0) {
        return res.status(400).json({
          success: false,
          message: "Số tín chỉ phải lớn hơn 0",
        });
      }

      // Tạo đối tượng monHocData để truyền vào model
      const monHocData = {
        maMonHoc,
        tenMonHoc,
        soTinChi,
        soTietLiThuyet,
        soTietBaiTap,
        soTietThucHanh,
        soTietTuHoc,
        ngonNguDay,
        laMonTuChon,
        maKhoiKienThuc,
      };

      // Gọi phương thức từ model
      const result = await this.monHocModel.themMonHoc(monHocData);

      if (result.success) {
        return res.status(201).json(result);
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

  async layDanhSachMonHoc(req, res) {
    try {
      // Gọi phương thức từ model
      const result = await this.monHocModel.layDanhSachMonHoc();

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

  async layDanhSachMonHocTheoKhoiKienThuc(req, res) {
    try {
      const { maKhoiKienThuc } = req.params;

      // Validate input
      if (!maKhoiKienThuc) {
        return res.status(400).json({
          success: false,
          message: "Mã khối kiến thức không được để trống",
        });
      }

      // Call model method
      const result = await this.monHocModel.layDanhSachMonHocTheoKhoiKienThuc(
        maKhoiKienThuc
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
}

module.exports = MonHocController;
