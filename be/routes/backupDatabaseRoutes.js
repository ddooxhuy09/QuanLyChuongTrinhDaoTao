const express = require("express");
const router = express.Router();
const BackupDatabaseController = require("../controllers/backupDatabaseController");
const { verifyToken, restrictTo } = require("../middleware/auth");

const backupDatabaseController = new BackupDatabaseController();

// GET /api/backup/database/info - Lấy thông tin sao lưu (chỉ Phòng đào tạo)
router.get(
    "/backup/database/info",
    verifyToken,
    restrictTo("Phòng đào tạo"),
    (req, res) => backupDatabaseController.layThongTinSaoLuu(req, res)
);

// POST /api/backup/database - Backup database (chỉ Phòng đào tạo)
router.post(
    "/backup/database",
    verifyToken,
    restrictTo("Phòng đào tạo"),
    (req, res) => backupDatabaseController.backupDatabase(req, res)
);

// POST /api/backup/database/restore - Restore database (chỉ Phòng đào tạo)
router.post(
    "/backup/database/restore",
    verifyToken,
    restrictTo("Phòng đào tạo"),
    (req, res) => backupDatabaseController.restoreDatabase(req, res)
);

// GET /api/backup/database/check-device - Kiểm tra backup device (chỉ Phòng đào tạo)
router.get(
    "/backup/database/check-device",
    verifyToken,
    restrictTo("Phòng đào tạo"),
    (req, res) => backupDatabaseController.kiemTraBackupDevice(req, res)
);

// GET /api/backup/database/max-backup-time - Lấy thời gian backup mới nhất (chỉ Phòng đào tạo)
router.get(
    "/backup/database/max-backup-time",
    verifyToken,
    restrictTo("Phòng đào tạo"),
    (req, res) => backupDatabaseController.layMaxBackupTime(req, res)
);

// GET /api/backup/database/test - Test database connection và stored procedure (chỉ Phòng đào tạo)
router.get(
    "/backup/database/test",
    verifyToken,
    restrictTo("Phòng đào tạo"),
    (req, res) => backupDatabaseController.testConnection(req, res)
);

module.exports = router; 