const KhoiKienThucModel = require("../models/khoiKienThucModel");

class KhoiKienThucController {
  constructor() {
    this.khoiKienThucModel = new KhoiKienThucModel();
  }

  async getDanhSachKhoiKienThuc(req, res) {
    try {
      const result = await this.khoiKienThucModel.getDanhSachKhoiKienThuc();

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

  async getDanhSachMonHocByKhoiKienThuc(req, res) {
    try {
      const { makhoikienthuc } = req.params;

      if (!makhoikienthuc) {
        return res.status(400).json({
          success: false,
          message: "Mã khối kiến thức không được để trống",
        });
      }

      const result =
        await this.khoiKienThucModel.getDanhSachMonHocByKhoiKienThuc(
          makhoikienthuc
        );

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

  async themKhoiKienThuc(req, res) {
    try {
      const { maKhoiKienThuc, tenKhoiKienThuc, tongSoTinChi, parentId } =
        req.body;

      if (!maKhoiKienThuc || !tenKhoiKienThuc) {
        return res.status(400).json({
          success: false,
          message: "Mã và tên khối kiến thức không được để trống",
        });
      }

      const result = await this.khoiKienThucModel.themKhoiKienThuc({
        maKhoiKienThuc,
        tenKhoiKienThuc,
        parentId,
      });

      if (result.success) {
        return res.status(201).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + (error.message || "Không xác định"),
      });
    }
  }

  async capNhatKhoiKienThuc(req, res) {
    try {
      const { makhoikienthuc } = req.params;
      const { tenKhoiKienThuc, parentId } = req.body;

      if (!makhoikienthuc) {
        return res.status(400).json({
          success: false,
          message: "Mã khối kiến thức không được để trống",
        });
      }

      const result = await this.khoiKienThucModel.capNhatKhoiKienThuc(
        makhoikienthuc,
        {
          tenKhoiKienThuc,
          parentId,
        }
      );

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + (error.message || "Không xác định"),
      });
    }
  }

  async xoaKhoiKienThuc(req, res) {
    try {
      const { makhoikienthuc } = req.params;

      if (!makhoikienthuc) {
        return res.status(400).json({
          success: false,
          message: "Mã khối kiến thức không được để trống",
        });
      }

      const result = await this.khoiKienThucModel.xoaKhoiKienThuc(
        makhoikienthuc
      );

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + (error.message || "Không xác định"),
      });
    }
  }

  async capNhatMonHocKhoiKienThuc(req, res) {
    try {
      const { makhoikienthuc } = req.params;
      const { danhSachMaMonHoc } = req.body;

      if (!makhoikienthuc) {
        return res.status(400).json({
          success: false,
          message: "Mã khối kiến thức không được để trống",
        });
      }

      const result = await this.khoiKienThucModel.capNhatMonHocKhoiKienThuc(
        makhoikienthuc,
        danhSachMaMonHoc || ""
      );

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + (error.message || "Không xác định"),
      });
    }
  }
}

module.exports = KhoiKienThucController;
