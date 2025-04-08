const { sql, poolPromise } = require('../config/database');

class ChuongTrinhDaoTaoModel {
    // Thêm chương trình đào tạo mới
    async themChuongTrinhDaoTao(tenChuongTrinh, maChuyenNganh, maNienKhoa) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('TenChuongTrinh', sql.NVarChar(100), tenChuongTrinh)
                .input('MaChuyenNganh', sql.NVarChar(10), maChuyenNganh)
                .input('MaNienKhoa', sql.NVarChar(10), maNienKhoa)
                .execute('SP_ThemChuongTrinhDaoTao');

            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    message: 'Thêm chương trình đào tạo thành công',
                    data: result.recordset[0]
                };
            } else {
                return {
                    success: false,
                    message: 'Thêm chương trình đào tạo thất bại'
                };
            }
        } catch (error) {
            console.error('Model - Error themChuongTrinhDaoTao:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Lấy danh sách chương trình đào tạo
    async layDanhSachChuongTrinhDaoTao() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_DocDanhSachChuongTrinhDaoTao');

            return {
                success: true,
                message: 'Lấy danh sách chương trình đào tạo thành công',
                data: result.recordset
            };
        } catch (error) {
            console.error('Model - Error layDanhSachChuongTrinhDaoTao:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    async layChiTietChuongTrinhDaoTaoTheoChuyenNganh(maChuyenNganh) {
        try {
            const pool = await poolPromise;
            
            // Set các biến để lưu kết quả
            let curriculumInfo = [];
            let subjectList = [];
            
            // Thực hiện stored procedure với tối ưu
            const result = await pool.request()
                .input('MaChuyenNganh', sql.NVarChar(10), maChuyenNganh)
                .execute('SP_LayChiTietChuongTrinhDaoTao_TheoChuyenNganh');
            
            // Lấy recordsets[0] cho thông tin chương trình và recordsets[1] cho danh sách môn học
            if (result.recordsets && result.recordsets.length >= 2) {
                curriculumInfo = result.recordsets[0];
                subjectList = result.recordsets[1];
            }
            
            // Cấu trúc dữ liệu trả về
            return {
                success: true,
                message: 'Lấy thông tin chương trình đào tạo thành công',
                data: {
                    thongTinChung: curriculumInfo,
                    danhSachMon: subjectList
                }
            };
        } catch (error) {
            console.error('Model - Error layChiTietChuongTrinhDaoTaoTheoChuyenNganh:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    async layDanhSachChuongTrinhDaoTaoTheoFilter(maChuyenNganh, maNienKhoa) {
        try {
            const pool = await poolPromise;
            
            // Prepare request with optional parameters
            const request = pool.request();
            
            if (maChuyenNganh) {
                request.input('MaChuyenNganh', sql.NVarChar(10), maChuyenNganh);
            } else {
                request.input('MaChuyenNganh', sql.NVarChar(10), null);
            }
            
            if (maNienKhoa) {
                request.input('MaNienKhoa', sql.NVarChar(10), maNienKhoa);
            } else {
                request.input('MaNienKhoa', sql.NVarChar(10), null);
            }
            
            // Execute stored procedure
            const result = await request.execute('SP_DocDanhSachChuongTrinhDaoTao_TheoFilter');
            
            // Process data: curricula and their details
            let curricula = result.recordsets[0] || [];
            let details = result.recordsets[1] || [];
            
            // Structure the response with nested data
            if (curricula.length > 0) {
                // Group details by MaChuongTrinh
                const detailsByCurriculum = details.reduce((acc, detail) => {
                    if (!acc[detail.MaChuongTrinh]) {
                        acc[detail.MaChuongTrinh] = [];
                    }
                    acc[detail.MaChuongTrinh].push(detail);
                    return acc;
                }, {});
                
                // Attach details to each curriculum
                curricula = curricula.map(curriculum => ({
                    ...curriculum,
                    chiTiet: detailsByCurriculum[curriculum.MaChuongTrinh] || []
                }));
            }
            
            return {
                success: true,
                message: curricula.length > 0 ? 
                    'Lấy danh sách chương trình đào tạo thành công' : 
                    'Không tìm thấy chương trình đào tạo phù hợp với điều kiện lọc',
                data: curricula,
                meta: {
                    filter: {
                        maChuyenNganh: maChuyenNganh || null,
                        maNienKhoa: maNienKhoa || null
                    },
                    total: curricula.length
                }
            };
        } catch (error) {
            console.error('Model - Error layDanhSachChuongTrinhDaoTaoTheoFilter:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = ChuongTrinhDaoTaoModel;
