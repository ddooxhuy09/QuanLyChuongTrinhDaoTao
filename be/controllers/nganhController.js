const NganhModel = require("../models/nganhModel");

class NganhController {
  constructor() {
    this.nganhModel = new NganhModel();
  }

  async getDanhSachNganh(req, res) {
    try {
      const result = await this.nganhModel.getDanhSachNganh();

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message,
      });
    }
  }

  async layDanhSachNganh(req, res) {
    const result = await this.nganhModel.layDanhSachNganh();
    return res.status(result.success ? 200 : 400).json(result);
  }

  async layNganhTheoMa(req, res) {
    const { maNganh } = req.params;
    const result = await this.nganhModel.layNganhTheoMa(maNganh);
    return res.status(result.success ? 200 : 400).json(result);
  }

  async themNganh(req, res) {
    const { maNganh, maKhoa, tenNganh, moTa } = req.body;
    if (!maNganh || !maKhoa || !tenNganh)
      return res
        .status(400)
        .json({
          success: false,
          message: "Thiếu mã ngành, mã khoa hoặc tên ngành",
        });
    const result = await this.nganhModel.themNganh(
      maNganh,
      maKhoa,
      tenNganh,
      moTa
    );
    return res.status(result.success ? 200 : 400).json(result);
  }

  async capNhatNganh(req, res) {
    const { maNganh, maKhoa, tenNganh, moTa } = req.body;
    if (!maNganh || !maKhoa || !tenNganh)
      return res
        .status(400)
        .json({
          success: false,
          message: "Thiếu mã ngành, mã khoa hoặc tên ngành",
        });
    const result = await this.nganhModel.capNhatNganh(
      maNganh,
      maKhoa,
      tenNganh,
      moTa
    );
    return res.status(result.success ? 200 : 400).json(result);
  }

  async xoaNganh(req, res) {
    const { maNganh } = req.params;
    const result = await this.nganhModel.xoaNganh(maNganh);
    return res.status(result.success ? 200 : 400).json(result);
  }
}

module.exports = NganhController;
