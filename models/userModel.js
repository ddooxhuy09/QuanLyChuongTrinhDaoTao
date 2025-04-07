const { sql, poolPromise } = require('../config/database');
const jwt = require('jsonwebtoken');

class UserModel {
    // Đăng nhập
    async dangNhap(tenDangNhap, matKhau) {
        try {
            const pool = await poolPromise;
            
            // Gọi stored procedure SP_DangNhap đã có
            const result = await pool.request()
                .input('TenDangNhap', sql.NVarChar(100), tenDangNhap)
                .input('MatKhau', sql.NVarChar(100), matKhau)
                .execute('SP_DangNhap');

            if (result.recordset && result.recordset.length > 0) {
                const user = result.recordset[0];
                
                // Tạo token JWT
                const token = jwt.sign(
                    {
                        id: user.Id,
                        name: user.HoTen,
                        role: user.Role,
                    },
                    'your_jwt_secret', // Thay thế bằng secret key của bạn
                    { expiresIn: '2h' } // Thời gian hết hạn token
                );

                // Cấu trúc dữ liệu trả về
                const responseData = {
                    success: true,
                    access_token: token,
                    token_type: "bearer",
                    expires_in: 7200, // 2 giờ tính theo giây
                    userName: tenDangNhap,
                    id: user.Id,
                    name: user.HoTen,
                    roles: user.Role,
                    // Thêm các thông tin khác tùy thuộc vào loại người dùng
                };
                
                // Thêm thông tin cụ thể cho từng loại người dùng
                if (user.Role === 'SINHVIEN') {
                    responseData.maNganh = user.MaNganh;
                    responseData.tenNganh = user.TenNganh;
                } else if (user.Role === 'GIANGVIEN' || user.Role === 'PHONGDAOTAO') {
                    responseData.maKhoa = user.MaKhoa;
                    responseData.tenKhoa = user.TenKhoa;
                }
                
                return responseData;
            } else {
                return {
                    success: false,
                    message: 'Tên đăng nhập hoặc mật khẩu không đúng'
                };
            }
        } catch (error) {
            console.error('Model - Error dangNhap:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = UserModel;