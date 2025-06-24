const { sql, poolPromise } = require("../config/database");

class BackupDatabaseModel {
    async layThongTinSaoLuu() {
        try {
            console.log("Calling SP_LayThongTinSaoLuu with database_name: QLChuongTrinhDaoTao");
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input("database_name", sql.NVarChar(128), "QLChuongTrinhDaoTao")
                .execute("SP_LayThongTinSaoLuu");

            console.log("SP_LayThongTinSaoLuu result:", result.recordset);

            // Lọc bỏ các record có position = NULL (không có backup)
            const filteredData = result.recordset.filter(record => record.position !== null);

            console.log("Filtered data:", filteredData);

            return {
                success: true,
                data: filteredData,
                message: filteredData.length === 0 ? "Không tìm thấy bản sao lưu cho cơ sở dữ liệu QLChuongTrinhDaoTao" : null
            };
        } catch (error) {
            console.error("Model - Error layThongTinSaoLuu:", error);
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async backupDatabase(withInit = false) {
        try {
            const pool = await poolPromise;

            // Thực hiện backup database (sử dụng logical device name như trong code C#)
            const backupCommand = withInit
                ? `BACKUP DATABASE QLChuongTrinhDaoTao TO QLChuongTrinhDaoTao_Device WITH INIT;`
                : `BACKUP DATABASE QLChuongTrinhDaoTao TO QLChuongTrinhDaoTao_Device;`;

            console.log("Executing backup command:", backupCommand);
            await pool.request().query(backupCommand);

            console.log("Backup completed successfully");
            return {
                success: true,
                data: {
                    message: "Sao lưu cơ sở dữ liệu thành công!",
                    backupType: withInit ? "Full Backup (With Init)" : "Full Backup",
                    timestamp: new Date().toISOString()
                }
            };
        } catch (error) {
            console.error("Model - Error backupDatabase:", error);
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async restoreDatabase(filePosition, isPointInTime = false, restoreTime = null) {
        try {
            const pool = await poolPromise;

            let restoreCommand;

            if (isPointInTime && restoreTime) {
                // Point-in-time recovery
                restoreCommand = `
          ALTER DATABASE QLChuongTrinhDaoTao SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
          USE tempdb;
          BACKUP LOG QLChuongTrinhDaoTao TO DISK = 'D:\\Backup\\QLChuongTrinhDaoTao_Device.trn' WITH INIT, NORECOVERY;
          RESTORE DATABASE QLChuongTrinhDaoTao FROM DISK = 'D:\\Backup\\QLChuongTrinhDaoTao_Device.bak' WITH NORECOVERY, FILE = ${filePosition};
          RESTORE LOG QLChuongTrinhDaoTao FROM DISK = 'D:\\Backup\\QLChuongTrinhDaoTao_Device.trn' WITH STOPAT = '${restoreTime}', RECOVERY;
          ALTER DATABASE QLChuongTrinhDaoTao SET MULTI_USER;
        `;
            } else {
                // Normal restore
                restoreCommand = `
          ALTER DATABASE QLChuongTrinhDaoTao SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
          USE tempdb;
          RESTORE DATABASE QLChuongTrinhDaoTao 
          FROM QLChuongTrinhDaoTao_Device 
          WITH FILE = ${filePosition}, REPLACE;
          ALTER DATABASE QLChuongTrinhDaoTao SET MULTI_USER;
        `;
            }

            await pool.request().query(restoreCommand);

            // Switch back to database
            await pool.request().query("USE QLChuongTrinhDaoTao;");

            return {
                success: true,
                data: {
                    message: "Khôi phục cơ sở dữ liệu thành công!",
                    restoreType: isPointInTime ? "Point-in-time Recovery" : "Full Restore",
                    filePosition: filePosition,
                    restoreTime: restoreTime,
                    timestamp: new Date().toISOString()
                }
            };
        } catch (error) {
            console.error("Model - Error restoreDatabase:", error);
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async kiemTraBackupDevice() {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input("logicalName", sql.NVarChar(128), "QLChuongTrinhDaoTao_Device")
                .query("SELECT 1 FROM sys.backup_devices WHERE name = @logicalName");

            return {
                success: true,
                data: {
                    exists: result.recordset.length > 0
                }
            };
        } catch (error) {
            console.error("Model - Error kiemTraBackupDevice:", error);
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async layMaxBackupTime() {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input("database_name", sql.NVarChar(128), "QLChuongTrinhDaoTao")
                .execute("SP_LayThongTinSaoLuu");

            // Lọc bỏ các record có position = NULL và lấy record đầu tiên (mới nhất)
            const filteredData = result.recordset.filter(record => record.position !== null);

            if (filteredData.length > 0) {
                const latestBackup = filteredData[0]; // SP trả về theo thứ tự position DESC
                return {
                    success: true,
                    data: {
                        backupTime: latestBackup.backup_start_date,
                        position: latestBackup.position
                    }
                };
            }

            return {
                success: true,
                data: {
                    backupTime: null,
                    position: null
                }
            };
        } catch (error) {
            console.error("Model - Error layMaxBackupTime:", error);
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async testConnection() {
        try {
            const pool = await poolPromise;

            // Test 1: Kiểm tra database hiện tại
            const dbResult = await pool.request().query("SELECT DB_NAME() AS CurrentDatabase");
            console.log("Current Database:", dbResult.recordset[0]);

            // Test 2: Kiểm tra stored procedure
            const spResult = await pool.request().query(`
        SELECT name, type_desc, create_date, modify_date
        FROM sys.objects 
        WHERE type = 'P' AND name = 'SP_LayThongTinSaoLuu'
      `);
            console.log("Stored Procedure exists:", spResult.recordset);

            // Test 3: Kiểm tra backup device
            const deviceResult = await pool.request().query(`
        SELECT name, physical_name, device_type
        FROM sys.backup_devices 
        WHERE name = 'QLChuongTrinhDaoTao_Device'
      `);
            console.log("Backup Device exists:", deviceResult.recordset);

            // Test 4: Kiểm tra backup history trực tiếp từ msdb
            const historyResult = await pool.request().query(`
        SELECT TOP 10
          database_name,
          backup_start_date,
          backup_finish_date,
          type,
          position,
          user_name,
          backup_size
        FROM msdb.dbo.backupset 
        WHERE database_name = 'QLChuongTrinhDaoTao'
        ORDER BY backup_start_date DESC
      `);
            console.log("Direct backup history:", historyResult.recordset);

            return {
                success: true,
                data: {
                    currentDatabase: dbResult.recordset[0],
                    storedProcedure: spResult.recordset,
                    backupDevice: deviceResult.recordset,
                    backupHistory: historyResult.recordset
                }
            };
        } catch (error) {
            console.error("Model - Error testConnection:", error);
            return {
                success: false,
                message: error.message,
            };
        }
    }
}

module.exports = BackupDatabaseModel; 