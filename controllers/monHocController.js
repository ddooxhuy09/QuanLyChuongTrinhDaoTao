const MonHocModel = require('../models/monHocModel');

class MonHocController {
  constructor() {
    this.monHocModel = new MonHocModel();
  }

  async themMonHoc(req, res) {
    try {
      const {
        tenMonHoc,
        soTinChi,
        soTietLiThuyet,
        soTietBaiTap,
        soTietThucHanh,
        soTietTuHoc,
        ngonNguDay,
        laMonTuChon
      } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!tenMonHoc || !soTinChi) {
        return res.status(400).json({
          success: false,
          message: 'Tên môn học và số tín chỉ không được để trống'
        });
      }

      if (soTinChi <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Số tín chỉ phải lớn hơn 0'
        });
      }

      // Tạo đối tượng monHocData để truyền vào model
      const monHocData = {
        tenMonHoc,
        soTinChi,
        soTietLiThuyet,
        soTietBaiTap,
        soTietThucHanh,
        soTietTuHoc,
        ngonNguDay,
        laMonTuChon
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
        message: 'Lỗi server: ' + error.message
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
            message: 'Lỗi server: ' + error.message
        });
    }
}
}

module.exports = MonHocController;
