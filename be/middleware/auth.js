const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(403).json({ success: false, message: 'Không có token, truy cập bị từ chối' });
    }

    jwt.verify(token, 'ttcs', (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Token không hợp lệ' });
        }
        req.user = decoded;
        next();
    });
};

// Middleware kiểm tra quyền cụ thể
const restrictTo = (...roles) => {
    return (req, res, next) => {
        // Cho phép Sinh viên và Giảng viên truy cập các API GET
        if (req.method === 'GET' && (roles.includes('Sinh viên') || roles.includes('Giảng viên'))) {
            return next();
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Không có quyền truy cập' });
        }
        next();
    };
};

module.exports = { verifyToken, restrictTo };