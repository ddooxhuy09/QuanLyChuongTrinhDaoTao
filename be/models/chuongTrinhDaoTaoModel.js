const { sql, poolPromise } = require("../config/database");

class ChuongTrinhDaoTaoModel {
    async getDanhSachChuongTrinhDaoTao() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query(`
                SELECT 
                    c.MaChuongTrinh as maChuongTrinh,
                    c.TenChuongTrinh as tenChuongTrinh,
                    c.MaNganh as maNganh,
                    c.NamApDung as namApDung,
                    c.TrinhDoDaoTao as trinhDoDaoTao,
                    c.HinhThucDaoTao as hinhThucDaoTao
                FROM ChuongTrinhDaoTao c
                ORDER BY c.NamApDung DESC, c.TenChuongTrinh ASC
            `);
            
            return {
                success: true,
                data: result.recordset
            };
        } catch (error) {
            console.error('Lỗi khi lấy danh sách chương trình đào tạo:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    async getToanBoChuongTrinhDaoTao(maChuongTrinh) {
        try {
            // Thực hiện truy vấn lấy thông tin chương trình đào tạo
            const pool = await poolPromise;
            
            // Lấy thông tin cơ bản của chương trình
            const resultChuongTrinh = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .query(`
                    SELECT 
                        c.MaChuongTrinh as maChuongTrinh,
                        c.TenChuongTrinh as tenChuongTrinh,
                        c.MaNganh as maNganh,
                        c.NamApDung as namApDung,
                        c.TrinhDoDaoTao as trinhDoDaoTao,
                        c.HinhThucDaoTao as hinhThucDaoTao
                    FROM ChuongTrinhDaoTao c
                    WHERE c.MaChuongTrinh = @MaChuongTrinh
                `);
            
            if (resultChuongTrinh.recordset.length === 0) {
                return {
                    success: false,
                    message: `Không tìm thấy chương trình đào tạo với mã ${maChuongTrinh}`
                };
            }
            
            const thongTinChuongTrinh = resultChuongTrinh.recordset[0];
            
            // Lấy danh sách môn học theo học kỳ
            const resultMonHoc = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .query(`
                    SELECT 
                        ct.KyHoc as kyHoc,
                        mh.MaMonHoc as maMonHoc,
                        mh.TenMonHoc as tenMonHoc,
                        mh.SoTinChi as soTinChi,
                        mh.MaKhoiKienThuc as maKhoiKienThuc,
                        kkt.TenKhoiKienThuc as tenKhoiKienThuc,
                        mh.MaMonHocTienQuyet as maMonHocTienQuyet,
                        mhtq.TenMonHoc as tenMonHocTienQuyet,
                        mh.LoaiMon as loaiMon
                    FROM ChiTiet_CTDT ct
                    INNER JOIN MonHoc mh ON ct.MaMonHoc = mh.MaMonHoc
                    LEFT JOIN KhoiKienThuc kkt ON mh.MaKhoiKienThuc = kkt.MaKhoiKienThuc
                    LEFT JOIN MonHoc mhtq ON mh.MaMonHocTienQuyet = mhtq.MaMonHoc
                    WHERE ct.MaChuongTrinh = @MaChuongTrinh
                    ORDER BY 
                        CASE 
                            WHEN ct.KyHoc LIKE 'HK%-%' THEN 
                                CAST(SUBSTRING(ct.KyHoc, 3, CHARINDEX('-', ct.KyHoc) - 3) AS int)
                            ELSE 
                                CAST(SUBSTRING(ct.KyHoc, 3, LEN(ct.KyHoc)) AS int)
                        END,
                        ct.KyHoc,
                        mh.TenMonHoc
                `);
            
            // Nhóm môn học theo học kỳ
            const danhSachHocKyVaMonHoc = {};
            
            resultMonHoc.recordset.forEach(monHoc => {
                if (!danhSachHocKyVaMonHoc[monHoc.kyHoc]) {
                    danhSachHocKyVaMonHoc[monHoc.kyHoc] = [];
                }
                
                danhSachHocKyVaMonHoc[monHoc.kyHoc].push({
                    maMonHoc: monHoc.maMonHoc,
                    tenMonHoc: monHoc.tenMonHoc,
                    soTinChi: monHoc.soTinChi,
                    maKhoiKienThuc: monHoc.maKhoiKienThuc,
                    tenKhoiKienThuc: monHoc.tenKhoiKienThuc,
                    maMonHocTienQuyet: monHoc.maMonHocTienQuyet,
                    tenMonHocTienQuyet: monHoc.tenMonHocTienQuyet,
                    loaiMon: monHoc.loaiMon
                });
            });
            
            return {
                success: true,
                data: {
                    thongTinChuongTrinh,
                    danhSachHocKyVaMonHoc
                }
            };
        } catch (error) {
            console.error('Lỗi khi lấy thông tin chương trình đào tạo:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Thêm phương thức layThongTinHocKy
    async layThongTinHocKy(maChuongTrinh, hocKy, maChuyenNganh = null) {
        try {
            const pool = await poolPromise;
            const request = pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('HocKy', sql.NVarChar(50), hocKy)
                .input('MaChuyenNganh', sql.VarChar(10), maChuyenNganh);
                
            const result = await request.execute('SP_LayThongTinHocKy');
            
            // Kết quả sẽ có 2 recordset: thông tin chương trình và danh sách môn học
            const thongTinChuongTrinh = result.recordsets[0][0] || {};
            const danhSachMonHoc = result.recordsets[1] || [];
            
            // Định dạng kết quả tùy theo có chuyên ngành hay không
            if (maChuyenNganh) {
                // Có chỉ định chuyên ngành, chỉ trả về danh sách môn học của học kỳ đó cho chuyên ngành đó
                return {
                    success: true,
                    data: {
                        thongTinChuongTrinh,
                        danhSachMonHoc: danhSachMonHoc.map(mon => ({
                            maMonHoc: mon.maMonHoc,
                            tenMonHoc: mon.tenMonHoc,
                            soTinChi: mon.soTinChi,
                            maKhoiKienThuc: mon.maKhoiKienThuc,
                            tenKhoiKienThuc: mon.tenKhoiKienThuc,
                            maMonHocTienQuyet: mon.maMonHocTienQuyet,
                            tenMonHocTienQuyet: mon.tenMonHocTienQuyet,
                            loaiMon: mon.loaiMon
                        }))
                    }
                };
            } else {
                // Khi không có chuyên ngành, nhóm môn học theo học kỳ 
                // (môn chung và môn theo chuyên ngành)
                const monHocTheoHocKy = {};
                
                // Thêm các môn học vào học kỳ tương ứng
                danhSachMonHoc.forEach(mon => {
                    let kyHoc = 'HK' + hocKy.replace(/[^0-9]/g, '');
                    
                    if (mon.maChuyenNganh) {
                        kyHoc = kyHoc + ' - chuyên ngành ' + mon.tenChuyenNganh;
                    }
                    
                    if (!monHocTheoHocKy[kyHoc]) {
                        monHocTheoHocKy[kyHoc] = [];
                    }
                    
                    monHocTheoHocKy[kyHoc].push({
                        maMonHoc: mon.maMonHoc,
                        tenMonHoc: mon.tenMonHoc,
                        soTinChi: mon.soTinChi,
                        maKhoiKienThuc: mon.maKhoiKienThuc,
                        tenKhoiKienThuc: mon.tenKhoiKienThuc,
                        maMonHocTienQuyet: mon.maMonHocTienQuyet,
                        tenMonHocTienQuyet: mon.tenMonHocTienQuyet,
                        loaiMon: mon.loaiMon
                    });
                });
                
                return {
                    success: true,
                    data: {
                        thongTinChuongTrinh,
                        danhSachHocKyVaMonHoc: monHocTheoHocKy
                    }
                };
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin học kỳ:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    async themMonHocVaoCTDT(maChuongTrinh, hocKy, maMonHoc, maChuyenNganh = null) {
        try {
            const pool = await poolPromise;
            const request = pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('HocKy', sql.NVarChar(50), hocKy)
                .input('MaMonHoc', sql.VarChar(15), maMonHoc);
            
            if (maChuyenNganh) {
                request.input('MaChuyenNganh', sql.VarChar(10), maChuyenNganh);
            }
                
            const result = await request.execute('SP_ThemMonHocVaoCTDT');
            
            return {
                success: true,
                data: result.recordset[0],
                message: 'Thêm môn học vào chương trình đào tạo thành công'
            };
        } catch (error) {
            console.error('Lỗi khi thêm môn học vào chương trình đào tạo:', error);
            if (error.number >= 50001 && error.number <= 50099) {
                return {
                    success: false,
                    message: error.message
                };
            }
            return {
                success: false,
                message: 'Lỗi khi thêm môn học: ' + error.message
            };
        }
    }

    async xoaMonHocKhoiCTDT(maChuongTrinh, maMonHoc) {
        try {
            const pool = await poolPromise;
            
            // Kiểm tra xem môn học có phải là môn tiên quyết của môn nào khác không
            const checkTienQuyet = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('MaMonHoc', sql.VarChar(15), maMonHoc)
                .query(`
                    SELECT ct2.MaMonHoc, mh2.TenMonHoc
                    FROM ChiTiet_CTDT ct1
                    INNER JOIN MonHoc mh1 ON ct1.MaMonHoc = mh1.MaMonHoc
                    INNER JOIN ChiTiet_CTDT ct2 ON ct1.MaChuongTrinh = ct2.MaChuongTrinh
                    INNER JOIN MonHoc mh2 ON ct2.MaMonHoc = mh2.MaMonHoc
                    WHERE ct1.MaChuongTrinh = @MaChuongTrinh
                        AND ct1.MaMonHoc = @MaMonHoc
                        AND mh2.MaMonHocTienQuyet = mh1.MaMonHoc
                `);
            
            if (checkTienQuyet.recordset.length > 0) {
                const tenCacMonHoc = checkTienQuyet.recordset.map(m => m.TenMonHoc).join(', ');
                return {
                    success: false,
                    message: `Không thể xóa môn học này vì nó là môn tiên quyết của: ${tenCacMonHoc}`
                };
            }
            
            // Thực hiện xóa môn học
            const result = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('MaMonHoc', sql.VarChar(15), maMonHoc)
                .query(`
                    DELETE FROM ChiTiet_CTDT 
                    WHERE MaChuongTrinh = @MaChuongTrinh AND MaMonHoc = @MaMonHoc
                `);
            
            if (result.rowsAffected[0] === 0) {
                return {
                    success: false,
                    message: 'Không tìm thấy môn học trong chương trình đào tạo'
                };
            }
            
            return {
                success: true,
                message: 'Xóa môn học khỏi chương trình đào tạo thành công'
            };
        } catch (error) {
            console.error('Lỗi khi xóa môn học khỏi chương trình đào tạo:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    async capNhatHocKyMonHoc(maChuongTrinh, maMonHoc, hocKyMoi, maChuyenNganh = null) {
        try {
            const pool = await poolPromise;
            
            // Lấy thông tin môn học và học kỳ hiện tại
            const currentInfo = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('MaMonHoc', sql.VarChar(15), maMonHoc)
                .query(`
                    SELECT 
                        ct.KyHoc, 
                        mh.TenMonHoc,
                        mh.MaMonHocTienQuyet,
                        mhtq.TenMonHoc as TenMonHocTienQuyet
                    FROM ChiTiet_CTDT ct
                    INNER JOIN MonHoc mh ON ct.MaMonHoc = mh.MaMonHoc
                    LEFT JOIN MonHoc mhtq ON mh.MaMonHocTienQuyet = mhtq.MaMonHoc
                    WHERE ct.MaChuongTrinh = @MaChuongTrinh AND ct.MaMonHoc = @MaMonHoc
                `);
            
            if (currentInfo.recordset.length === 0) {
                return {
                    success: false,
                    message: 'Không tìm thấy môn học trong chương trình đào tạo'
                };
            }
            
            const monHocInfo = currentInfo.recordset[0];
            
            // Xử lý học kỳ mới (thêm chuyên ngành nếu có)
            let hocKyMoiFull = hocKyMoi;
            if (maChuyenNganh) {
                hocKyMoiFull = hocKyMoi + '-' + maChuyenNganh;
            }
            
            // Lấy học kỳ dạng số để so sánh
            const soHocKyMoi = parseInt(hocKyMoi.replace('HK', '').replace(/^0+/, ''));
            
            // Kiểm tra ràng buộc môn tiên quyết
            if (monHocInfo.MaMonHocTienQuyet) {
                const checkTienQuyet = await pool.request()
                    .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                    .input('MaMonHocTienQuyet', sql.VarChar(15), monHocInfo.MaMonHocTienQuyet)
                    .query(`
                        SELECT ct.KyHoc
                        FROM ChiTiet_CTDT ct
                        WHERE ct.MaChuongTrinh = @MaChuongTrinh AND ct.MaMonHoc = @MaMonHocTienQuyet
                    `);
                
                if (checkTienQuyet.recordset.length > 0) {
                    const kyHocTienQuyet = checkTienQuyet.recordset[0].KyHoc;
                    
                    // Lấy học kỳ dạng số
                    let soKyHocTienQuyet;
                    if (kyHocTienQuyet.includes('-')) {
                        soKyHocTienQuyet = parseInt(kyHocTienQuyet.split('-')[0].replace('HK', '').replace(/^0+/, ''));
                    } else {
                        soKyHocTienQuyet = parseInt(kyHocTienQuyet.replace('HK', '').replace(/^0+/, ''));
                    }
                    
                    if (soKyHocTienQuyet >= soHocKyMoi) {
                        return {
                            success: false,
                            message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn tiên quyết "${monHocInfo.TenMonHocTienQuyet}" nằm ở học kỳ ${kyHocTienQuyet}`
                        };
                    }
                }
            }
            
            // Kiểm tra xem môn học có phải là môn tiên quyết của môn nào khác không
            const checkMonSau = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('MaMonHoc', sql.VarChar(15), maMonHoc)
                .query(`
                    SELECT ct.KyHoc, mh.TenMonHoc
                    FROM ChiTiet_CTDT ct
                    INNER JOIN MonHoc mh ON ct.MaMonHoc = mh.MaMonHoc
                    WHERE ct.MaChuongTrinh = @MaChuongTrinh AND mh.MaMonHocTienQuyet = @MaMonHoc
                `);
            
            if (checkMonSau.recordset.length > 0) {
                for (const monSau of checkMonSau.recordset) {
                    let soKyHocMonSau;
                    if (monSau.KyHoc.includes('-')) {
                        soKyHocMonSau = parseInt(monSau.KyHoc.split('-')[0].replace('HK', '').replace(/^0+/, ''));
                    } else {
                        soKyHocMonSau = parseInt(monSau.KyHoc.replace('HK', '').replace(/^0+/, ''));
                    }
                    
                    if (soHocKyMoi >= soKyHocMonSau) {
                        return {
                            success: false,
                            message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì nó là môn tiên quyết của "${monSau.TenMonHoc}" ở học kỳ ${monSau.KyHoc}`
                        };
                    }
                }
            }
            
            // Thực hiện cập nhật học kỳ
            const result = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('MaMonHoc', sql.VarChar(15), maMonHoc)
                .input('KyHocMoi', sql.NVarChar(50), hocKyMoiFull)
                .query(`
                    UPDATE ChiTiet_CTDT 
                    SET KyHoc = @KyHocMoi
                    WHERE MaChuongTrinh = @MaChuongTrinh AND MaMonHoc = @MaMonHoc
                `);
            
            if (result.rowsAffected[0] === 0) {
                return {
                    success: false,
                    message: 'Không tìm thấy môn học trong chương trình đào tạo'
                };
            }
            
            // Lấy thông tin đã cập nhật
            const updatedInfo = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('MaMonHoc', sql.VarChar(15), maMonHoc)
                .query(`
                    SELECT 
                        ct.MaChuongTrinh,
                        ct.MaMonHoc,
                        mh.TenMonHoc,
                        mh.SoTinChi,
                        ct.KyHoc,
                        mh.MaKhoiKienThuc,
                        kkt.TenKhoiKienThuc,
                        mh.MaMonHocTienQuyet,
                        mhtq.TenMonHoc AS TenMonHocTienQuyet
                    FROM ChiTiet_CTDT ct
                    INNER JOIN MonHoc mh ON ct.MaMonHoc = mh.MaMonHoc
                    LEFT JOIN KhoiKienThuc kkt ON mh.MaKhoiKienThuc = kkt.MaKhoiKienThuc
                    LEFT JOIN MonHoc mhtq ON mh.MaMonHocTienQuyet = mhtq.MaMonHoc
                    WHERE ct.MaChuongTrinh = @MaChuongTrinh AND ct.MaMonHoc = @MaMonHoc
                `);
            
            return {
                success: true,
                data: updatedInfo.recordset[0],
                message: 'Cập nhật học kỳ thành công'
            };
        } catch (error) {
            console.error('Lỗi khi cập nhật học kỳ môn học:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    async layDanhSachMonTuChon(maChuongTrinh, hocKy, maChuyenNganh, maMonTuChon) {
        try {
            const pool = await poolPromise;
            const request = pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('HocKy', sql.NVarChar(50), hocKy)
                .input('MaChuyenNganh', sql.VarChar(10), maChuyenNganh)
                .input('MaMonTuChon', sql.VarChar(15), maMonTuChon);
            
            const result = await request.execute('SP_LayDanhSachMonTuChon');
            
            return {
                success: true,
                data: result.recordset
            };
        } catch (error) {
            console.error('Lỗi khi lấy danh sách môn tự chọn:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = ChuongTrinhDaoTaoModel;