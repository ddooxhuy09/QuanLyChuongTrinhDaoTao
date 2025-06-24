const KhoaModel = require("../models/khoaModel");

class KhoaController {
  constructor() {
    this.khoaModel = new KhoaModel();
  }
  async layDanhSachKhoa(req, res) {
    const result = await this.khoaModel.layDanhSachKhoa();
    return res.status(result.success ? 200 : 400).json(result);
  }
  async layKhoaTheoMa(req, res) {
    const { maKhoa } = req.params;
    const result = await this.khoaModel.layKhoaTheoMa(maKhoa);
    return res.status(result.success ? 200 : 400).json(result);
  }
  async themKhoa(req, res) {
    const { maKhoa, tenKhoa } = req.body;
    if (!maKhoa || !tenKhoa)
      return res
        .status(400)
        .json({ success: false, message: "Thiếu mã hoặc tên khoa" });
    const result = await this.khoaModel.themKhoa(maKhoa, tenKhoa);
    return res.status(result.success ? 200 : 400).json(result);
  }
  async capNhatKhoa(req, res) {
    const { maKhoa, tenKhoa } = req.body;
    if (!maKhoa || !tenKhoa)
      return res
        .status(400)
        .json({ success: false, message: "Thiếu mã hoặc tên khoa" });
    const result = await this.khoaModel.capNhatKhoa(maKhoa, tenKhoa);
    return res.status(result.success ? 200 : 400).json(result);
  }
  async xoaKhoa(req, res) {
    const { maKhoa } = req.params;
    const result = await this.khoaModel.xoaKhoa(maKhoa);
    return res.status(result.success ? 200 : 400).json(result);
  }
}

module.exports = KhoaController;
