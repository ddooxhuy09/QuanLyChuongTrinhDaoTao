const DashboardModel = require("../models/dashboardModel");

class DashboardController {
  constructor() {
    this.dashboardModel = new DashboardModel();
  }
  async getSummary(req, res) {
    try {
      console.log("Dashboard getSummary called");
      const result = await this.dashboardModel.getSummary();
      console.log("Dashboard getSummary result:", result);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error("Dashboard getSummary error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async getTopNganhSinhVien(req, res) {
    try {
      console.log("Dashboard getTopNganhSinhVien called");
      const result = await this.dashboardModel.getTopNganhSinhVien();
      console.log("Dashboard getTopNganhSinhVien result:", result);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error("Dashboard getTopNganhSinhVien error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async getSinhVienNienKhoa(req, res) {
    try {
      console.log("Dashboard getSinhVienNienKhoa called");
      const result = await this.dashboardModel.getSinhVienNienKhoa();
      console.log("Dashboard getSinhVienNienKhoa result:", result);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error("Dashboard getSinhVienNienKhoa error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async getGiangVienKhoa(req, res) {
    try {
      console.log("Dashboard getGiangVienKhoa called");
      const result = await this.dashboardModel.getGiangVienKhoa();
      console.log("Dashboard getGiangVienKhoa result:", result);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error("Dashboard getGiangVienKhoa error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async getMonHocCTDT(req, res) {
    try {
      console.log("Dashboard getMonHocCTDT called");
      const result = await this.dashboardModel.getMonHocCTDT();
      console.log("Dashboard getMonHocCTDT result:", result);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error("Dashboard getMonHocCTDT error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = DashboardController;
