const { sql, poolPromise } = require("../config/database");

class ChuongTrinhDaoTaoModel {
    async getDanhSachChuongTrinhDaoTao() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('SP_GetDanhSachChuongTrinhDaoTao');

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
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .execute('SP_GetToanBoChuongTrinhDaoTaoByMaCT');

            if (result.recordsets.length === 0) {
                return {
                    success: false,
                    message: `Không tìm thấy chương trình đào tạo với mã ${maChuongTrinh}`
                };
            }

            // Lấy thông tin chương trình đào tạo
            const thongTinChuongTrinh = result.recordsets[0][0];
            // Lấy danh sách khối kiến thức chuyên ngành
            const khoiKienThucChuyenNganh = result.recordsets[1];
            // Lấy danh sách môn học và chuyển đổi format
            const danhSachMonHoc = result.recordsets[2].map(mon => ({
                maMonHoc: mon.MaMonHoc,
                tenMonHoc: mon.TenMonHoc,
                soTinChi: mon.SoTinChi,
                soTietLiThuyet: mon.SoTietLiThuyet,
                soTietBaiTap: mon.SoTietBaiTap,
                soTietThucHanh: mon.SoTietThucHanh,
                soTietTuHoc: mon.SoTietTuHoc,
                ngonNguDay: mon.NgonNguDay,
                loaiMon: mon.LoaiMon,
                maKhoiKienThuc: mon.MaKhoiKienThuc,
                tenKhoiKienThuc: mon.TenKhoiKienThuc,
                maMonHocTruoc: mon.MaMonHocTruoc,
                maMonHocTienQuyet: mon.MaMonHocTienQuyet,
                tenMonHocTienQuyet: mon.TenMonHocTienQuyet,
                maMonHocSongHanh: mon.MaMonHocSongHanh,
                tenMonHocTiengAnh: mon.TenMonHocTiengAnh,
                hocKy: mon.KyHoc,
                maChuyenNganh: mon.MaChuyenNganh
            }));

            return {
                success: true,
                data: {
                    thongTinChuongTrinh,
                    khoiKienThucChuyenNganh,
                    danhSachMonHoc
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

    async themMonHocVaoCTDT(maChuongTrinh, hocKy, maMonHoc) {
        try {
            const pool = await poolPromise;

            // Kiểm tra môn tiên quyết
            const checkTienQuyet = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('MaMonHoc', sql.VarChar(15), maMonHoc)
                .execute('SP_CheckMonTienQuyetHocKy');

            if (checkTienQuyet.recordset.length > 0) {
                const monTienQuyet = checkTienQuyet.recordset[0];

                // Kiểm tra môn tiên quyết đã được thêm vào CTDT chưa
                if (!monTienQuyet.KyHocTienQuyet) {
                    return {
                        success: false,
                        message: `Môn học "${monTienQuyet.TenMonHoc}" có môn tiên quyết "${monTienQuyet.TenMonHocTienQuyet}" chưa được thêm vào chương trình đào tạo. Vui lòng thêm môn tiên quyết trước.`
                    };
                }

                // Kiểm tra học kỳ của môn tiên quyết
                const soHocKyTienQuyet = parseInt(monTienQuyet.KyHocTienQuyet.replace('HK', '').replace(/^0+/, ''));
                const soHocKyMoi = parseInt(hocKy.replace('HK', '').replace(/^0+/, ''));

                if (soHocKyTienQuyet >= soHocKyMoi) {
                    return {
                        success: false,
                        message: `Không thể thêm môn học "${monTienQuyet.TenMonHoc}" vào học kỳ ${hocKy} vì môn tiên quyết "${monTienQuyet.TenMonHocTienQuyet}" nằm ở học kỳ ${monTienQuyet.KyHocTienQuyet}`
                    };
                }
            }

            // Thêm môn học vào CTDT
            const result = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(20), maChuongTrinh)
                .input('HocKy', sql.VarChar(50), hocKy)
                .input('MaMonHoc', sql.VarChar(20), maMonHoc)
                .execute('SP_ThemMonHocVaoCTDT');

            return {
                success: true,
                message: result.recordset[0]?.Message || 'Thêm môn học thành công'
            };
        } catch (error) {
            console.error('Lỗi khi thêm môn học vào chương trình đào tạo:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    async xoaMonHocKhoiChuongTrinh(maChuongTrinh, maMonHoc) {
        try {
            const pool = await poolPromise;

            // Kiểm tra xem môn học có phải là môn tiên quyết của môn học khác trong CTDT không
            const checkMonTienQuyet = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('MaMonHoc', sql.VarChar(15), maMonHoc)
                .execute('SP_CheckMonTienQuyetHocKy');

            if (checkMonTienQuyet.recordset.length > 0) {
                const monPhuThuoc = checkMonTienQuyet.recordset[0];
                return {
                    success: false,
                    message: `Không thể xóa môn học này vì nó là môn tiên quyết của môn "${monPhuThuoc.TenMonHoc}" trong chương trình đào tạo`
                };
            }

            // Thực hiện xóa môn học
            const result = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('MaMonHoc', sql.VarChar(15), maMonHoc)
                .execute('SP_XoaMonHocKhoiCTDT');

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

            // Lấy thông tin môn học hiện tại
            const monHocInfo = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('MaMonHoc', sql.VarChar(15), maMonHoc)
                .execute('SP_GetThongTinMonHoc');

            if (monHocInfo.recordset.length === 0) {
                return {
                    success: false,
                    message: 'Không tìm thấy môn học trong chương trình đào tạo'
                };
            }

            const monHoc = monHocInfo.recordset[0];
            let hocKyMoiFull = hocKyMoi;
            if (maChuyenNganh) {
                hocKyMoiFull = hocKyMoi + '-' + maChuyenNganh;
            }

            const soHocKyMoi = parseInt(hocKyMoi.replace('HK', '').replace(/^0+/, ''));

            // Kiểm tra môn tiên quyết
            if (monHoc.MaMonHocTienQuyet) {
                const checkTienQuyet = await pool.request()
                    .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                    .input('MaMonHoc', sql.VarChar(15), monHoc.MaMonHocTienQuyet)
                    .execute('SP_GetThongTinMonHoc');

                if (checkTienQuyet.recordset.length === 0) {
                    return {
                        success: false,
                        message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn tiên quyết "${monHoc.TenMonHocTienQuyet}" chưa được thêm vào chương trình đào tạo`
                    };
                }

                const monTienQuyet = checkTienQuyet.recordset[0];
                if (!monTienQuyet.KyHoc) {
                    return {
                        success: false,
                        message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn tiên quyết "${monHoc.TenMonHocTienQuyet}" chưa được xếp học kỳ`
                    };
                }

                let soKyHocTienQuyet;
                if (monTienQuyet.KyHoc.includes('-')) {
                    soKyHocTienQuyet = parseInt(monTienQuyet.KyHoc.split('-')[0].replace('HK', '').replace(/^0+/, ''));
                } else {
                    soKyHocTienQuyet = parseInt(monTienQuyet.KyHoc.replace('HK', '').replace(/^0+/, ''));
                }

                if (soKyHocTienQuyet >= soHocKyMoi) {
                    return {
                        success: false,
                        message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn tiên quyết "${monHoc.TenMonHocTienQuyet}" nằm ở học kỳ ${monTienQuyet.KyHoc}`
                    };
                }
            }

            // Kiểm tra môn học trước
            if (monHoc.MaMonHocTruoc) {
                const checkMonTruoc = await pool.request()
                    .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                    .input('MaMonHoc', sql.VarChar(15), monHoc.MaMonHocTruoc)
                    .execute('SP_CheckMonTienQuyetHocKy');

                if (checkMonTruoc.recordset.length === 0) {
                    return {
                        success: false,
                        message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn học trước "${monHoc.TenMonHocTruoc}" chưa được thêm vào chương trình đào tạo`
                    };
                }

                const monTruoc = checkMonTruoc.recordset[0];
                if (!monTruoc.KyHocTienQuyet) {
                    return {
                        success: false,
                        message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn học trước "${monTruoc.TenMonHocTienQuyet}" chưa được xếp học kỳ`
                    };
                }

                let soKyHocMonTruoc;
                if (monTruoc.KyHocTienQuyet.includes('-')) {
                    soKyHocMonTruoc = parseInt(monTruoc.KyHocTienQuyet.split('-')[0].replace('HK', '').replace(/^0+/, ''));
                } else {
                    soKyHocMonTruoc = parseInt(monTruoc.KyHocTienQuyet.replace('HK', '').replace(/^0+/, ''));
                }

                if (soKyHocMonTruoc >= soHocKyMoi) {
                    return {
                        success: false,
                        message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn học trước "${monTruoc.TenMonHocTienQuyet}" nằm ở học kỳ ${monTruoc.KyHocTienQuyet}`
                    };
                }
            }

            // Kiểm tra môn song hành
            if (monHoc.MaMonHocSongHanh) {
                const checkMonSongHanh = await pool.request()
                    .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                    .input('MaMonHoc', sql.VarChar(15), monHoc.MaMonHocSongHanh)
                    .execute('SP_CheckMonTienQuyetHocKy');

                if (checkMonSongHanh.recordset.length === 0) {
                    return {
                        success: false,
                        message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn song hành "${monHoc.TenMonHocSongHanh}" chưa được thêm vào chương trình đào tạo`
                    };
                }

                const monSongHanh = checkMonSongHanh.recordset[0];
                if (!monSongHanh.KyHocTienQuyet) {
                    return {
                        success: false,
                        message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn song hành "${monSongHanh.TenMonHocTienQuyet}" chưa được xếp học kỳ`
                    };
                }

                if (monSongHanh.KyHocTienQuyet !== hocKyMoi) {
                    return {
                        success: false,
                        message: `Không thể chuyển môn học này sang học kỳ ${hocKyMoi} vì môn song hành "${monSongHanh.TenMonHocTienQuyet}" nằm ở học kỳ ${monSongHanh.KyHocTienQuyet}`
                    };
                }
            }

            // Cập nhật học kỳ
            const result = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('MaMonHoc', sql.VarChar(15), maMonHoc)
                .input('KyHocMoi', sql.NVarChar(50), hocKyMoiFull)
                .execute('SP_CapNhatHocKyMonHoc');

            if (result.rowsAffected[0] === 0) {
                return {
                    success: false,
                    message: 'Không tìm thấy môn học trong chương trình đào tạo'
                };
            }

            return {
                success: true,
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

    async getChuyenNganhByMaCT(maChuongTrinh) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .execute('SP_GetChuyenNganhByMaCT');

            // Chuyển đổi tên trường từ PascalCase sang camelCase và parse JSON
            const chuyenNganh = result.recordset.map(item => ({
                maKhoiKienThuc: item.MaKhoiKienThuc,
                tenKhoiKienThuc: item.TenKhoiKienThuc,
                keHoachHocTap: JSON.parse(item.keHoachHocTap)
            }));

            return {
                success: true,
                data: chuyenNganh
            };
        } catch (error) {
            console.error('Lỗi khi lấy thông tin chuyên ngành:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    async themMonTuChonVaoHocKy(maChuongTrinh, maKhoiKienThuc, hocKy) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('MaKhoiKienThuc', sql.VarChar(10), maKhoiKienThuc)
                .input('HocKy', sql.VarChar(50), hocKy)
                .execute('SP_ThemMonTuChonVaoHocKy');

            return {
                success: true,
                message: result.recordset[0]?.Message || 'Thêm môn tự chọn thành công'
            };
        } catch (error) {
            console.error('Lỗi khi thêm môn tự chọn vào học kỳ:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    async xoaMonTuChonKhoiHocKy(maChuongTrinh, maMonHoc, hocKy) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('MaMonHoc', sql.VarChar(15), maMonHoc)
                .input('HocKy', sql.VarChar(50), hocKy)
                .execute('SP_XoaMonTuChonKhoiHocKy');

            return {
                success: result.recordset[0]?.Success === 1,
                message: result.recordset[0]?.Message || 'Xóa môn tự chọn thành công'
            };
        } catch (error) {
            console.error('Lỗi khi xóa môn tự chọn khỏi học kỳ:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    async getDanhSachMonTuChon(maChuongTrinh, maKhoiKienThuc, hocKy) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('MaChuongTrinh', sql.VarChar(10), maChuongTrinh)
                .input('MaKhoiKienThuc', sql.VarChar(10), maKhoiKienThuc)
                .input('HocKy', sql.VarChar(50), hocKy)
                .execute('SP_GetDanhSachMonTuChon');

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