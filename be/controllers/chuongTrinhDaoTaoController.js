const ChuongTrinhDaoTaoModel = require('../models/chuongTrinhDaoTaoModel');

class ChuongTrinhDaoTaoController {
    constructor() {
        this.chuongTrinhDaoTaoModel = new ChuongTrinhDaoTaoModel();
    }

    async getDanhSachChuongTrinhDaoTao(req, res) {
        try {
            const result = await this.chuongTrinhDaoTaoModel.getDanhSachChuongTrinhDaoTao();
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

    async getToanBoChuongTrinhDaoTao(req, res) {
        try {
            const { machuongtrinhdaotao } = req.params;
            const result = await this.chuongTrinhDaoTaoModel.getToanBoChuongTrinhDaoTao(machuongtrinhdaotao);
            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server: ' + error.message
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
                const result = await this.chuongTrinhDaoTaoModel.getToanBoChuongTrinhDaoTao(machuongtrinh);
                
                if (result.success) {
                    return res.status(200).json(result);
                } else {
                    return res.status(404).json(result);
                }
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server: ' + error.message
            });
        }
    }

    async themMonHocVaoCTDT(req, res) {
        try {
            const { machuongtrinh } = req.params;
            const { hocky, chuyennganh } = req.query;
            const { maMonHoc } = req.body;

            if (!machuongtrinh || !hocky || !maMonHoc) {
                return res.status(400).json({
                    success: false,
                    message: 'Thiếu thông tin bắt buộc (mã chương trình, học kỳ, mã môn học)'
                });
            }

            const result = await this.chuongTrinhDaoTaoModel.themMonHocVaoCTDT(machuongtrinh, hocky, maMonHoc, chuyennganh);
            
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

    async xoaMonHocKhoiCTDT(req, res) {
        try {
            const { machuongtrinh, mamonhoc } = req.params;
            
            if (!machuongtrinh || !mamonhoc) {
                return res.status(400).json({
                    success: false,
                    message: 'Thiếu thông tin bắt buộc'
                });
            }

            const result = await this.chuongTrinhDaoTaoModel.xoaMonHocKhoiCTDT(machuongtrinh, mamonhoc);
            
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

    async capNhatHocKyMonHoc(req, res) {
        try {
            const { machuongtrinh, mamonhoc } = req.params;
            const { hocky, chuyennganh } = req.body;

            if (!machuongtrinh || !mamonhoc || !hocky) {
                return res.status(400).json({
                    success: false,
                    message: 'Thiếu thông tin bắt buộc'
                });
            }

            const result = await this.chuongTrinhDaoTaoModel.capNhatHocKyMonHoc(machuongtrinh, mamonhoc, hocky, chuyennganh);

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

    async layDanhSachMonTuChon(req, res) {
        try {
            const { machuongtrinh, mamonhoctuchon } = req.params;
            const { hocky, chuyennganh } = req.query;
            
            if (!machuongtrinh || !hocky || !mamonhoctuchon) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã chương trình, học kỳ và mã môn tự chọn không được để trống'
                });
            }
            
            const result = await this.chuongTrinhDaoTaoModel.layDanhSachMonTuChon(
                machuongtrinh, 
                hocky, 
                chuyennganh, 
                mamonhoctuchon
            );
            
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

module.exports = ChuongTrinhDaoTaoController;