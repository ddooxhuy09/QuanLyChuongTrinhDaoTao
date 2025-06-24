import React, { useState, useEffect } from "react";
import { Database, Download, Upload, History, RefreshCw } from "lucide-react";
import { showToast } from "../../components/Common/showToast";

const BackupManagement = () => {
    const [loading, setLoading] = useState(false);
    const [backupDevice, setBackupDevice] = useState(null);
    const [backupHistory, setBackupHistory] = useState([]);
    const [hasDevice, setHasDevice] = useState(false);
    const [selectedBackup, setSelectedBackup] = useState(null);
    const [withInit, setWithInit] = useState(false);
    const [pointInTimeRestore, setPointInTimeRestore] = useState(false);
    const [restoreTime, setRestoreTime] = useState('');

    const getToken = () => localStorage.getItem("access_token");

    // Helper function để chuyển đổi thời gian về múi giờ Việt Nam (UTC+7)
    const formatVietnameseDateTime = (dateString) => {
        const date = new Date(dateString);
        const vietnamTime = new Date(date.getTime() - 7 * 60 * 60 * 1000);
        return vietnamTime.toLocaleString('vi-VN');
    };

    // Load data when component mounts
    useEffect(() => {
        checkBackupDevice();
        loadBackupHistory();
        loadDeviceInfo();
    }, []);

    const loadDeviceInfo = () => {
        const savedDevice = localStorage.getItem('backupDevice');
        if (savedDevice) {
            try {
                setBackupDevice(JSON.parse(savedDevice));
            } catch (error) {
                console.error('Error parsing saved device info:', error);
                localStorage.removeItem('backupDevice');
            }
        }
    };

    // Reload history when device is created
    useEffect(() => {
        if (backupDevice) {
            loadBackupHistory();
        }
    }, [backupDevice]);

    const checkBackupDevice = async () => {
        try {
            const token = getToken();
            const response = await fetch('http://localhost:3000/api/backup/database/check-device', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            if (result.success) {
                setHasDevice(result.data.exists);

                // Nếu device không tồn tại trên server nhưng có thông tin trong localStorage, xóa nó
                if (!result.data.exists && localStorage.getItem('backupDevice')) {
                    localStorage.removeItem('backupDevice');
                    setBackupDevice(null);
                }
            }
        } catch (error) {
            console.error('Error checking device:', error);
        }
    };

    const loadBackupHistory = async () => {
        try {
            const token = getToken();
            console.log('Loading backup history...');
            const response = await fetch('http://localhost:3000/api/backup/database/info', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Response status:', response.status);
            const result = await response.json();
            console.log('Response result:', result);

            if (result.success) {
                setBackupHistory(result.data);
                console.log('Backup history loaded:', result.data);
                // Hiển thị message nếu không có backup
                if (result.message) {
                    showToast(result.message, "info");
                }
            } else {
                console.error('API returned error:', result.message);
                showToast("Lỗi từ server: " + result.message, "error");
            }
        } catch (error) {
            console.error('Error loading backup history:', error);
            showToast("Lỗi khi tải lịch sử backup: " + error.message, "error");
        }
    };

    const handleDatabaseBackup = async () => {
        try {
            setLoading(true);
            const token = getToken();
            const response = await fetch('http://localhost:3000/api/backup/database', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ withInit })
            });

            const result = await response.json();
            if (result.success) {
                showToast(result.data.message, "success");
                loadBackupHistory(); // Reload backup history
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            showToast("Lỗi khi backup database: " + error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDatabaseRestore = async () => {
        if (!selectedBackup) {
            showToast("Vui lòng chọn một bản backup để restore!", "error");
            return;
        }

        if (!window.confirm("Bạn có chắc chắn muốn restore database? Dữ liệu hiện tại sẽ bị ghi đè!")) {
            return;
        }

        try {
            setLoading(true);
            const token = getToken();
            const response = await fetch('http://localhost:3000/api/backup/database/restore', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    filePosition: selectedBackup.position,
                    isPointInTime: pointInTimeRestore,
                    restoreTime: pointInTimeRestore ? new Date(restoreTime).toISOString().slice(0, 19).replace('T', ' ') : null
                })
            });

            const result = await response.json();
            if (result.success) {
                showToast(result.data.message, "success");
                loadBackupHistory(); // Reload backup history
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            showToast("Lỗi khi restore database: " + error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDeviceBackup = async () => {
        try {
            setLoading(true);

            // Sử dụng đường dẫn mặc định
            const selectedPath = "D:\\Backup\\QLChuongTrinhDaoTao_Device.bak";

            // Call API to create backup device
            const token = getToken();
            const response = await fetch('http://localhost:3000/api/backup/device', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    logicalName: "QLChuongTrinhDaoTao_Device",
                    physicalPath: selectedPath
                })
            });

            const result = await response.json();

            if (result.success) {
                showToast(result.data.message, "success");
                if (result.data.deviceExists) {
                    showToast("Device backup cũ đã được thay thế", "info");
                }

                // Save backup device info
                const deviceInfo = {
                    logicalName: result.data.logicalName,
                    physicalPath: result.data.physicalPath,
                    createdAt: new Date().toLocaleString('vi-VN'),
                    deviceExists: result.data.deviceExists
                };

                setBackupDevice(deviceInfo);

                // Save to localStorage to persist after refresh
                localStorage.setItem('backupDevice', JSON.stringify(deviceInfo));

                // Reload device status
                checkBackupDevice();
            } else {
                throw new Error(result.message);
            }

        } catch (error) {
            showToast("Lỗi khi tạo device backup: " + error.message, "error");
            console.error('Device backup error:', error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
                    <Database size={32} />
                    Quản lý Backup Cơ sở dữ liệu
                </h1>
                <p className="text-lg text-base-content">
                    Sao lưu và khôi phục dữ liệu hệ thống
                </p>
            </div>

            {/* Backup Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Device Backup Card */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-primary flex items-center gap-2">
                            <Database size={24} />
                            Device Backup
                        </h2>
                        <p className="text-base-content mb-4">
                            Tạo backup device "QLChuongTrinhDaoTao_Device" tại đường dẫn: D:\Backup\QLChuongTrinhDaoTao_Device.bak
                        </p>
                        <div className="card-actions justify-end">
                            <button
                                className="btn btn-primary"
                                onClick={handleDeviceBackup}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Đang tạo backup...
                                    </>
                                ) : (
                                    <>
                                        <Database size={18} />
                                        Tạo Device backup
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Database Backup Card */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-success flex items-center gap-2">
                            <Download size={24} />
                            Database Backup
                        </h2>
                        <p className="text-base-content mb-4">
                            Sao lưu cơ sở dữ liệu "QLChuongTrinhDaoTao"
                        </p>
                        <div className="form-control mb-4">
                            <label className="label cursor-pointer">
                                <span className="label-text">Ghi đè backup cũ (WITH INIT)</span>
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                    checked={withInit}
                                    onChange={(e) => setWithInit(e.target.checked)}
                                />
                            </label>
                        </div>
                        <div className="card-actions justify-end">
                            <button
                                className="btn btn-success"
                                onClick={handleDatabaseBackup}
                                disabled={loading || !hasDevice}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Đang backup...
                                    </>
                                ) : (
                                    <>
                                        <Download size={18} />
                                        Backup Database
                                    </>
                                )}
                            </button>
                        </div>
                        {!hasDevice && (
                            <div className="alert alert-warning mt-2">
                                <span>Vui lòng tạo Device backup trước!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Backup Device Info */}
            {backupDevice && (
                <div className="card bg-base-100 shadow-xl mt-6">
                    <div className="card-body">
                        <h2 className="card-title text-success flex items-center gap-2">
                            <Database size={24} />
                            Thông tin Device Backup đã tạo
                            <button
                                className="btn btn-ghost btn-sm ml-auto"
                                onClick={() => {
                                    setBackupDevice(null);
                                    localStorage.removeItem('backupDevice');
                                    showToast("Đã xóa thông tin device", "info");
                                }}
                                title="Xóa thông tin device"
                            >
                                ✕
                            </button>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Logical Name:</span>
                                </label>
                                <div className="input input-bordered bg-base-200">
                                    {backupDevice.logicalName}
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Physical Path:</span>
                                </label>
                                <div className="input input-bordered bg-base-200">
                                    {backupDevice.physicalPath}
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Thời gian tạo:</span>
                                </label>
                                <div className="input input-bordered bg-base-200">
                                    {backupDevice.createdAt}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Backup History & Restore */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Backup History */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-info flex items-center gap-2 mb-4">
                            <History size={24} />
                            Lịch sử Backup
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={loadBackupHistory}
                                disabled={loading}
                            >
                                <RefreshCw size={16} />
                            </button>
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={async () => {
                                    try {
                                        const token = getToken();
                                        const response = await fetch('http://localhost:3000/api/backup/database/test', {
                                            headers: { 'Authorization': `Bearer ${token}` }
                                        });
                                        const result = await response.json();
                                        console.log('Test result:', result);
                                        showToast("Kiểm tra console để xem kết quả test", "info");
                                    } catch (error) {
                                        console.error('Test error:', error);
                                        showToast("Lỗi test: " + error.message, "error");
                                    }
                                }}
                                disabled={loading}
                                title="Test Database Connection"
                            >
                                🔧
                            </button>
                        </h2>

                        {backupHistory.length === 0 ? (
                            <div className="text-center py-8 text-base-content">
                                <Database size={48} className="mx-auto mb-4 opacity-50" />
                                <p>Chưa có backup nào được tạo</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto max-h-80">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th>Position</th>
                                            <th>Ngày backup</th>
                                            <th>Người thực hiện</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {backupHistory.map((backup, index) => (
                                            <tr
                                                key={index}
                                                className={`cursor-pointer hover:bg-base-200 ${selectedBackup?.position === backup.position ? 'bg-primary/20' : ''
                                                    }`}
                                                onClick={() => setSelectedBackup(backup)}
                                                title={backup.DienGiai || 'Không có ghi chú'}
                                            >
                                                <td>{backup.position}</td>
                                                <td>{formatVietnameseDateTime(backup.backup_start_date)}</td>
                                                <td>{backup.user_name || 'N/A'}</td>
                                                <td>
                                                    {selectedBackup?.position === backup.position && (
                                                        <div className="badge badge-primary">Đã chọn</div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Database Restore */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-warning flex items-center gap-2">
                            <Upload size={24} />
                            Database Restore
                        </h2>
                        <p className="text-base-content mb-4">
                            Khôi phục cơ sở dữ liệu từ backup đã chọn
                        </p>

                        {selectedBackup && (
                            <div className="alert alert-info mb-4">
                                <span>Backup đã chọn: Position {selectedBackup.position}
                                    ({formatVietnameseDateTime(selectedBackup.backup_start_date)})</span>
                            </div>
                        )}

                        <div className="form-control mb-4">
                            <label className="label cursor-pointer">
                                <span className="label-text">Point-in-time Recovery</span>
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                    checked={pointInTimeRestore}
                                    onChange={(e) => setPointInTimeRestore(e.target.checked)}
                                />
                            </label>
                        </div>

                        {pointInTimeRestore && (
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Thời gian restore (YYYY-MM-DD HH:MM:SS)</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    className="input input-bordered"
                                    value={restoreTime}
                                    onChange={(e) => setRestoreTime(e.target.value)}
                                />
                            </div>
                        )}

                        <div className="alert alert-warning mb-4">
                            <span>⚠️ Cảnh báo: Thao tác này sẽ ghi đè toàn bộ dữ liệu hiện tại!</span>
                        </div>

                        <div className="card-actions justify-end">
                            <button
                                className="btn btn-warning"
                                onClick={handleDatabaseRestore}
                                disabled={loading || !selectedBackup || !hasDevice}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Đang restore...
                                    </>
                                ) : (
                                    <>
                                        <Upload size={18} />
                                        Restore Database
                                    </>
                                )}
                            </button>
                        </div>

                        {!selectedBackup && (
                            <div className="alert alert-info mt-2">
                                <span>Vui lòng chọn một backup từ lịch sử!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BackupManagement; 