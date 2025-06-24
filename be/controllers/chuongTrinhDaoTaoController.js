const ChuongTrinhDaoTaoModel = require("../models/chuongTrinhDaoTaoModel");

class ChuongTrinhDaoTaoController {
  constructor() {
    this.chuongTrinhDaoTaoModel = new ChuongTrinhDaoTaoModel();
  }

  async getDanhSachChuongTrinhDaoTao(req, res) {
    try {
      const result =
        await this.chuongTrinhDaoTaoModel.getDanhSachChuongTrinhDaoTao();
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

  async getToanBoChuongTrinhDaoTao(req, res) {
    try {
      const { machuongtrinhdaotao } = req.params;
      const result =
        await this.chuongTrinhDaoTaoModel.getToanBoChuongTrinhDaoTao(
          machuongtrinhdaotao
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

  // Phương thức mới để xem chi tiết chương trình hoặc học kỳ
  async xemChiTietChuongTrinh(req, res) {
    try {
      const { machuongtrinh } = req.params;
      const { hocky, chuyennganh } = req.query;

      // Nếu có tham số hocky, gọi API xem chi tiết học kỳ
      if (hocky) {
        const result = await this.chuongTrinhDaoTaoModel.layThongTinHocKy(
          machuongtrinh,
          hocky,
          chuyennganh
        );

        if (result.success) {
          return res.status(200).json(result);
        } else {
          return res.status(400).json(result);
        }
      }
      // Nếu không có tham số hocky, xem toàn bộ chương trình
      else {
        const result =
          await this.chuongTrinhDaoTaoModel.getToanBoChuongTrinhDaoTao(
            machuongtrinh
          );

        if (result.success) {
          return res.status(200).json(result);
        } else {
          return res.status(404).json(result);
        }
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message,
      });
    }
  }

  async themMonHocVaoCTDT(req, res) {
    try {
      const { machuongtrinh } = req.params;
      const { maMonHoc, hocky } = req.body;

      if (!machuongtrinh || !maMonHoc) {
        return res.status(400).json({
          success: false,
          message: "Thiếu thông tin bắt buộc (mã chương trình, mã môn học)",
        });
      }

      const result = await this.chuongTrinhDaoTaoModel.themMonHocVaoCTDT(
        machuongtrinh,
        hocky,
        maMonHoc
      );

      if (result.success) {
        return res.status(201).json({
          success: true,
          message: result.message || "Thêm môn học thành công",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: result.message || "Không thể thêm môn học",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message,
      });
    }
  }

  async xoaMonHocKhoiCTDT(req, res) {
    try {
      const { machuongtrinh, mamonhoc } = req.params;

      if (!machuongtrinh || !mamonhoc) {
        return res.status(400).json({
          success: false,
          message: "Thiếu thông tin bắt buộc",
        });
      }

      const result = await this.chuongTrinhDaoTaoModel.xoaMonHocKhoiChuongTrinh(
        machuongtrinh,
        mamonhoc
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

  async capNhatHocKyMonHoc(req, res) {
    try {
      const { machuongtrinh, mamonhoc } = req.params;
      const { hocky, chuyennganh } = req.body;

      if (!machuongtrinh || !mamonhoc || !hocky) {
        return res.status(400).json({
          success: false,
          message: "Thiếu thông tin bắt buộc",
        });
      }

      const result = await this.chuongTrinhDaoTaoModel.capNhatHocKyMonHoc(
        machuongtrinh,
        mamonhoc,
        hocky,
        chuyennganh
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

  async getChuyenNganhByMaCT(req, res) {
    try {
      const { machuongtrinh } = req.params;

      if (!machuongtrinh) {
        return res.status(400).json({
          success: false,
          message: "Thiếu mã chương trình đào tạo",
        });
      }

      const result = await this.chuongTrinhDaoTaoModel.getChuyenNganhByMaCT(
        machuongtrinh
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

  async themMonTuChonVaoHocKy(req, res) {
    try {
      const { machuongtrinh } = req.params;
      const { maKhoiKienThuc, hocKy } = req.body;

      if (!machuongtrinh || !maKhoiKienThuc || !hocKy) {
        return res.status(400).json({
          success: false,
          message:
            "Thiếu thông tin bắt buộc (mã chương trình, mã khối kiến thức, học kỳ)",
        });
      }

      const result = await this.chuongTrinhDaoTaoModel.themMonTuChonVaoHocKy(
        machuongtrinh,
        maKhoiKienThuc,
        hocKy
      );

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

  async xoaMonTuChonKhoiHocKy(req, res) {
    try {
      const { machuongtrinh, mamonhoc } = req.params;
      const { hocKy } = req.body;

      if (!machuongtrinh || !mamonhoc || !hocKy) {
        return res.status(400).json({
          success: false,
          message:
            "Thiếu thông tin bắt buộc (mã chương trình, mã môn học, học kỳ)",
        });
      }

      const result = await this.chuongTrinhDaoTaoModel.xoaMonTuChonKhoiHocKy(
        machuongtrinh,
        mamonhoc,
        hocKy
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

  async getDanhSachMonTuChon(req, res) {
    try {
      const { machuongtrinh } = req.params;
      // Lấy tham số từ cả query và body
      const maKhoiKienThuc =
        req.query.maKhoiKienThuc || req.body.maKhoiKienThuc;
      const hocKy = req.query.hocKy || req.body.hocKy;

      if (!machuongtrinh || !maKhoiKienThuc || !hocKy) {
        return res.status(400).json({
          success: false,
          message:
            "Thiếu thông tin bắt buộc (mã chương trình, mã khối kiến thức, học kỳ)",
        });
      }

      const result = await this.chuongTrinhDaoTaoModel.getDanhSachMonTuChon(
        machuongtrinh,
        maKhoiKienThuc,
        hocKy
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

  async themChuongTrinhDaoTao(req, res) {
    const {
      maChuongTrinh,
      tenChuongTrinh,
      maNganh,
      trinhDoDaoTao,
      hinhThucDaoTao,
      namApDung,
    } = req.body;
    if (
      !maChuongTrinh ||
      !tenChuongTrinh ||
      !maNganh ||
      !trinhDoDaoTao ||
      !hinhThucDaoTao
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu thông tin bắt buộc" });
    }
    const result = await this.chuongTrinhDaoTaoModel.themChuongTrinhDaoTao(
      maChuongTrinh,
      tenChuongTrinh,
      maNganh,
      trinhDoDaoTao,
      hinhThucDaoTao,
      namApDung || null
    );
    return res.status(result.success ? 200 : 400).json(result);
  }

  async xoaChuongTrinhDaoTao(req, res) {
    const { maChuongTrinh } = req.params;
    if (!maChuongTrinh)
      return res
        .status(400)
        .json({ success: false, message: "Thiếu mã chương trình" });
    const result = await this.chuongTrinhDaoTaoModel.xoaChuongTrinhDaoTao(
      maChuongTrinh
    );
    return res.status(result.success ? 200 : 400).json(result);
  }

  async capNhatChuongTrinhDaoTao(req, res) {
    const {
      maChuongTrinh,
      tenChuongTrinh,
      maNganh,
      trinhDoDaoTao,
      hinhThucDaoTao,
      namApDung,
    } = req.body;
    if (
      !maChuongTrinh ||
      !tenChuongTrinh ||
      !maNganh ||
      !trinhDoDaoTao ||
      !hinhThucDaoTao
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu thông tin bắt buộc" });
    }
    const result = await this.chuongTrinhDaoTaoModel.capNhatChuongTrinhDaoTao(
      maChuongTrinh,
      tenChuongTrinh,
      maNganh,
      trinhDoDaoTao,
      hinhThucDaoTao,
      namApDung || null
    );
    return res.status(result.success ? 200 : 400).json(result);
  }
}

module.exports = ChuongTrinhDaoTaoController;
