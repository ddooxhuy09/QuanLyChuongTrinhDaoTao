const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Lấy token từ header

    if (!token) {
        return res.status(403).json({ success: false, message: 'Không có token, truy cập bị từ chối' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Token không hợp lệ' });
        }
        req.user = decoded; // Lưu thông tin người dùng vào request
        next(); // Tiếp tục đến route tiếp theo
    });
};

module.exports = verifyToken;
