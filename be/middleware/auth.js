const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ success: false, message: 'Không có token, truy cập bị từ chối' });
    }

    jwt.verify(token, 'ttcs', (err, decoded) => {
        if (err) {
            console.log("Token verification error:", err.message);
            return res.status(401).json({ success: false, message: 'Token không hợp lệ' });
        }
        req.user = decoded;
        next();
    });
};

// Middleware kiểm tra quyền cụ thể
const restrictTo = (...roles) => {
    return (req, res, next) => {
        console.log("=== restrictTo Debug ===");
        console.log("Required roles:", roles);
        console.log("User from token:", req.user);
        console.log("User role:", req.user.role);
        console.log("Request method:", req.method);
        console.log("Request path:", req.path);

        // Map role từ database sang format hiển thị
        const roleMapping = {
            'SINHVIEN': 'Sinh Viên',
            'GIANGVIEN': 'Giảng Viên',
            'PHONGDAOTAO': 'Phòng đào tạo'
        };

        const mappedRole = roleMapping[req.user.role] || req.user.role;
        console.log("Mapped role:", mappedRole);

        // Cho phép Sinh Viên và Giảng Viên truy cập các API GET
        if (req.method === 'GET' && (roles.includes('Sinh Viên') || roles.includes('Giảng Viên'))) {
            console.log("Allowing GET request for Sinh Viên/Giảng Viên");
            return next();
        }

        // Kiểm tra role match với nhiều format khác nhau
        const isAllowed = roles.some(requiredRole => {
            const match = requiredRole === mappedRole ||
                requiredRole === req.user.role ||
                (requiredRole === 'Sinh Viên' && req.user.role === 'SINHVIEN') ||
                (requiredRole === 'Sinh viên' && req.user.role === 'SINHVIEN');
            console.log(`Checking role: ${requiredRole} === ${mappedRole} || ${req.user.role}? ${match}`);
            return match;
        });

        console.log("Is allowed:", isAllowed);
        console.log("=== End restrictTo Debug ===");

        if (!isAllowed) {
            return res.status(403).json({
                success: false,
                message: `Không có quyền truy cập. Required: ${roles.join(', ')}, Got: ${mappedRole} (${req.user.role})`
            });
        }

        next();
    };
};

module.exports = { verifyToken, restrictTo };