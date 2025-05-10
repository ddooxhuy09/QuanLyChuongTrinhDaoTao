const { sql, poolPromise } = require("../config/database");
const jwt = require("jsonwebtoken");

class UserModel {
    async dangNhap(tenDangNhap, matKhau) {
        try {
            const pool = await poolPromise;

            const result = await pool
                .request()
                .input("TenDangNhap", sql.VarChar(50), tenDangNhap)
                .input("MatKhau", sql.NVarChar(100), matKhau)
                .execute("SP_Login");

            if (result.recordset && result.recordset.length > 0) {
                const user = result.recordset[0];

                const token = jwt.sign(
                    {
                        id: user.ID,
                        name: user.HoTen,
                        role: user.Role
                    },
                    "ttcs",
                    { expiresIn: "30d" }
                );

                const responseData = {
                    success: true,
                    access_token: token,
                    token_type: "bearer",
                    userName: tenDangNhap,
                    id: user.ID,
                    name: user.HoTen,
                    roles: user.Role
                };

                if (user.Role === "SINHVIEN") {
                    responseData.maNganh = user.MaNganh;
                    responseData.tenNganh = user.TenNganh;
                } else if (user.Role === "GIANGVIEN" || user.Role === "PHONGDAOTAO") {
                    responseData.maKhoa = user.MaKhoa;
                    responseData.tenKhoa = user.TenKhoa;
                }

                return responseData;
            } else {
                return {
                    success: false,
                    message: "Tên đăng nhập hoặc mật khẩu không đúng"
                };
            }
        } catch (error) {
            console.error("Model - Error dangNhap:", error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = UserModel;