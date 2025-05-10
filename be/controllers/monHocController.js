const MonHocModel = require('../models/monHocModel');

class MonHocController {
    constructor() {
        this.monHocModel = new MonHocModel();
    }

    async getDanhSachMonHoc(req, res) {
        try {
            const result = await this.monHocModel.getDanhSachMonHoc();
            
            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server: ' + (error.message || "Không xác định")
            });
        }
    }
    
    async getMonHocByMa(req, res) {
        try {
            const { mamonhoc } = req.params;
            
            if (!mamonhoc) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã môn học không được để trống'
                });
            }
            
            const result = await this.monHocModel.getMonHocByMa(mamonhoc);
            
            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server: ' + (error.message || "Không xác định")
            });
        }
    }
    
    async themMonHoc(req, res) {
        try {
            const { maMonHoc, tenMonHoc, soTinChi, ...otherData } = req.body;
            
            if (!maMonHoc || !tenMonHoc || soTinChi === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã môn học, tên môn học và số tín chỉ không được để trống'
                });
            }
            
            const monHocData = {
                maMonHoc,
                tenMonHoc,
                soTinChi,
                ...otherData
            };
            
            const result = await this.monHocModel.themMonHoc(monHocData);
            
            if (result.success) {
                return res.status(201).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server: ' + (error.message || "Không xác định")
            });
        }
    }
    
    async capNhatMonHoc(req, res) {
        try {
            const { mamonhoc } = req.params;
            const monHocData = req.body;
            
            if (!mamonhoc) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã môn học không được để trống'
                });
            }
            
            // Kiểm tra nếu body rỗng
            if (Object.keys(monHocData).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Dữ liệu cập nhật không được để trống'
                });
            }
            
            const result = await this.monHocModel.capNhatMonHoc(mamonhoc, monHocData);
            
            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server: ' + (error.message || "Không xác định")
            });
        }
    }
    
    async xoaMonHoc(req, res) {
        try {
            const { mamonhoc } = req.params;
            
            if (!mamonhoc) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã môn học không được để trống'
                });
            }
            
            const result = await this.monHocModel.xoaMonHoc(mamonhoc);
            
            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server: ' + (error.message || "Không xác định")
            });
        }
    }
    
    // Xử lý PUT (thay thế hoàn toàn)
    async thayTheMonHoc(req, res) {
        try {
            const { mamonhoc } = req.params;
            const { maMonHoc, tenMonHoc, soTinChi, ...otherData } = req.body;
            
            if (!mamonhoc || !tenMonHoc || soTinChi === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã môn học, tên môn học và số tín chỉ không được để trống'
                });
            }
            
            // Đảm bảo mã môn học trong URL và body phải giống nhau (nếu có trong body)
            if (maMonHoc && maMonHoc !== mamonhoc) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã môn học trong body phải trùng với mã môn học trong URL'
                });
            }
            
            // Kiểm tra môn học tồn tại
            const checkExist = await this.monHocModel.getMonHocByMa(mamonhoc);
            if (!checkExist.success) {
                return res.status(404).json(checkExist);
            }
            
            const monHocData = {
                maMonHoc: mamonhoc,
                tenMonHoc,
                soTinChi,
                ...otherData
            };
            
            // Thực hiện cập nhật đầy đủ
            const result = await this.monHocModel.capNhatMonHoc(mamonhoc, monHocData);
            
            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server: ' + (error.message || "Không xác định")
            });
        }
    }
}

module.exports = MonHocController;