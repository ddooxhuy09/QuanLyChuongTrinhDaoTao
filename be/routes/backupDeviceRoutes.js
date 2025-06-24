const express = require("express");
const router = express.Router();
const BackupDeviceController = require("../controllers/backupDeviceController");
const { verifyToken, restrictTo } = require("../middleware/auth");

const backupDeviceController = new BackupDeviceController();

// POST /api/backup/device - Tạo backup device (chỉ Phòng đào tạo)
router.post(
    "/backup/device",
    verifyToken,
    restrictTo("Phòng đào tạo"),
    (req, res) => backupDeviceController.taoBackupDevice(req, res)
);

module.exports = router; 