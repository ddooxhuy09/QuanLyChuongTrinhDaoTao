const { sql, poolPromise } = require("../config/database");

class KhoiKienThucModel {
    async getDanhSachKhoiKienThuc() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().execute("SP_GetKhoiKienThucHierarchy");
            
            if (result.recordset && result.recordset.length > 0) {
                // Tổ chức kết quả thành cấu trúc cây
                const khoiKienThucMap = {};
                const rootKhoiKienThuc = [];
                
                // Đầu tiên tạo map các khối kiến thức
                result.recordset.forEach(item => {
                    khoiKienThucMap[item.MaKhoiKienThuc] = {
                        maKhoiKienThuc: item.MaKhoiKienThuc,
                        tenKhoiKienThuc: item.TenKhoiKienThuc,
                        parentId: item.ParentID,
                        level: item.Level,
                        tongSoTinChi: item.TongSoTinChi,
                        khoiKienThucCon: []
                    };
                });
                
                // Sau đó tổ chức thành cấu trúc cây
                result.recordset.forEach(item => {
                    if (item.ParentID) {
                        // Nếu có parent, thêm vào danh sách con của parent đó
                        khoiKienThucMap[item.ParentID].khoiKienThucCon.push(khoiKienThucMap[item.MaKhoiKienThuc]);
                    } else {
                        // Nếu không có parent, đây là khối kiến thức gốc
                        rootKhoiKienThuc.push(khoiKienThucMap[item.MaKhoiKienThuc]);
                    }
                });
                
                // Tính lại tổng số tín chỉ theo cấu trúc phân cấp
                this.tinhTongSoTinChi(rootKhoiKienThuc);
                
                return {
                    success: true,
                    data: rootKhoiKienThuc
                };
            }
            
            return {
                success: false,
                message: "Không tìm thấy dữ liệu khối kiến thức"
            };
        } catch (error) {
            console.error("Model - Error getDanhSachKhoiKienThuc:", error);
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    // Phương thức đệ quy tính tổng tín chỉ
    tinhTongSoTinChi(khoiKienThucList) {
        for (const kkt of khoiKienThucList) {
            if (kkt.khoiKienThucCon && kkt.khoiKienThucCon.length > 0) {
                // Đệ quy tính tổng tín chỉ cho các khối con
                this.tinhTongSoTinChi(kkt.khoiKienThucCon);
                
                // Tính lại tổng tín chỉ cho khối hiện tại (là tổng tín chỉ của các khối con)
                let tongTinChiCon = kkt.khoiKienThucCon.reduce((sum, item) => sum + item.tongSoTinChi, 0);
                
                // Tổng tín chỉ khối cha = tổng tín chỉ riêng + tổng tín chỉ từ các khối con
                kkt.tongSoTinChi = Number((kkt.tongSoTinChi + tongTinChiCon).toFixed(1));
            }
        }
    }
    
    async getDanhSachMonHocByKhoiKienThuc(maKhoiKienThuc) {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input("MaKhoiKienThuc", sql.VarChar(10), maKhoiKienThuc)
                .execute("SP_GetMonHocByKhoiKienThuc");
            
            if (result.recordset && result.recordset.length > 0) {
                return {
                    success: true,
                    data: result.recordset
                };
            }
            
            return {
                success: false,
                message: `Không tìm thấy môn học nào thuộc khối kiến thức ${maKhoiKienThuc}`
            };
        } catch (error) {
            console.error("Model - Error getDanhSachMonHocByKhoiKienThuc:", error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = KhoiKienThucModel;