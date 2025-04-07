const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); // Để hỗ trợ CORS nếu cần

// Import các routes
const khoaRoutes = require('./routes/khoaRoutes');
const monHocRoutes = require('./routes/monHocRoutes');
const nganhRoutes = require('./routes/nganhRoutes');
const bangCapRoutes = require('./routes/bangCapRoutes');
const chuyenNganhRoutes = require('./routes/chuyenNganhRoutes');
const khoiKienThucRoutes = require('./routes/khoiKienThucRoutes');
const nienKhoaRoutes = require('./routes/nienKhoaRoutes');
const chuongTrinhDaoTaoRoutes = require('./routes/chuongTrinhDaoTaoRoutes');
const sinhVienRoutes = require('./routes/sinhVienRoutes');
const giangVienRoutes = require('./routes/giangVienRoutes');
const phongDaoTaoRoutes = require('./routes/phongDaoTaoRoutes');
const userRoutes = require('./routes/userRoutes'); // Import routes xác thực
const verifyToken = require('./middleware/auth'); // Import middleware xác thực

// Middleware
app.use(cors()); // Thêm CORS nếu cần
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes không cần xác thực
app.use('/api/user', userRoutes); // Đường dẫn đăng nhập

// Routes cần xác thực
app.use('/api/khoa', verifyToken, khoaRoutes);
app.use('/api/monhoc', verifyToken, monHocRoutes);
app.use('/api/nganh', verifyToken, nganhRoutes);
app.use('/api/bangcap', verifyToken, bangCapRoutes);
app.use('/api/chuyennganh', verifyToken, chuyenNganhRoutes);
app.use('/api/khoikienthuc', verifyToken, khoiKienThucRoutes);
app.use('/api/nienkhoa', verifyToken, nienKhoaRoutes);
app.use('/api/chuongtrinhdaotao', verifyToken, chuongTrinhDaoTaoRoutes);
app.use('/api/sinhvien', verifyToken, sinhVienRoutes);
app.use('/api/giangvien', verifyToken, giangVienRoutes);
app.use('/api/phongdaotao', verifyToken, phongDaoTaoRoutes);

// Xử lý lỗi 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Không tìm thấy đường dẫn yêu cầu'
    });
});

// Xử lý lỗi 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Lỗi server: ' + err.message
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
