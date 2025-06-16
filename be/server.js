const express = require('express');
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const sinhVienRoutes = require('./routes/sinhVienRoutes');
const khoiKienThucRoutes = require('./routes/khoiKienThucRoutes');
const nganhRoutes = require('./routes/nganhRoutes');
const chuongTrinhDaoTaoRoutes = require('./routes/chuongTrinhDaoTaoRoutes');
const monHocRoutes = require('./routes/monHocRoutes'); // Thêm route mới

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);
app.use('/api', sinhVienRoutes);
app.use('/api', khoiKienThucRoutes);
app.use('/api', nganhRoutes);
app.use('/api', chuongTrinhDaoTaoRoutes);
app.use('/api', monHocRoutes); // Sử dụng route mới

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});