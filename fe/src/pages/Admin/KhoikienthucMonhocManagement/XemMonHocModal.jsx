import React, { useEffect, useState } from "react";
import {
  fetchMonhocByMaKKT,
  updateMonHocForKKT,
  fetchAllKhoiKienThuc,
} from "../../../api/services/khoiKienThucService";
import { fetchAllMonHoc } from "../../../api/services/monHocService";
import { showToast } from "../../../components/Common/showToast";

const XemMonHocModal = ({ selectedKKT, onClose }) => {
  const [monhocs, setMonhocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [allMonHoc, setAllMonHoc] = useState([]);
  const [selectedMonHoc, setSelectedMonHoc] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [assignedMonHocSet, setAssignedMonHocSet] = useState(new Set());

  useEffect(() => {
    if (!selectedKKT) return;

    const fetchData = async () => {
      const res = await fetchMonhocByMaKKT(selectedKKT.maKhoiKienThuc);
      if (res.success) {
        setMonhocs(res.data);
      } else {
        console.error("Không lấy được môn học:", res.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedKKT]);

  // Lấy tất cả môn học đã được phân công cho các khối kiến thức khác
  const getAssignedMonHoc = async () => {
    const allKKTRes = await fetchAllKhoiKienThuc();
    if (allKKTRes.success) {
      const assignedMonHoc = new Set();

      // Lấy tất cả môn học đã được phân công
      for (const kkt of allKKTRes.data) {
        const flatKKT = [];
        const collectKKT = (list) => {
          list.forEach((node) => {
            flatKKT.push(node.maKhoiKienThuc);
            if (node.khoiKienThucCon?.length) {
              collectKKT(node.khoiKienThucCon);
            }
          });
        };
        collectKKT([kkt]);

        // Lấy môn học của từng khối kiến thức
        for (const maKKT of flatKKT) {
          if (maKKT !== selectedKKT.maKhoiKienThuc) {
            const monRes = await fetchMonhocByMaKKT(maKKT);
            if (monRes.success && monRes.data) {
              monRes.data.forEach((mon) => {
                assignedMonHoc.add(mon.MaMonHoc);
              });
            }
          }
        }
      }

      setAssignedMonHocSet(assignedMonHoc);
      return assignedMonHoc;
    }
    return new Set();
  };

  const handleUpdateClick = async () => {
    setUpdateLoading(true);
    try {
      // Lấy danh sách tất cả môn học
      const allMonRes = await fetchAllMonHoc();
      if (allMonRes.success) {
        setAllMonHoc(allMonRes.data);

        // Lấy danh sách môn học đã được phân công cho khối kiến thức khác
        await getAssignedMonHoc();

        // Lấy danh sách môn học hiện tại của KKT
        const currentMonRes = await fetchMonhocByMaKKT(
          selectedKKT.maKhoiKienThuc
        );
        if (currentMonRes.success) {
          setSelectedMonHoc(currentMonRes.data.map((mh) => mh.MaMonHoc));
        }

        setShowUpdateModal(true);
      } else {
        showToast("Không thể tải danh sách môn học", "error");
      }
    } catch (err) {
      showToast("Lỗi khi tải dữ liệu", "error");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleMonCheck = (maMonHoc) => {
    setSelectedMonHoc((prev) =>
      prev.includes(maMonHoc)
        ? prev.filter((m) => m !== maMonHoc)
        : [...prev, maMonHoc]
    );
  };

  const handleSaveUpdate = async () => {
    if (!selectedKKT) return;

    try {
      setUpdateLoading(true);
      const danhSachMaMonHoc = selectedMonHoc.join(",");
      const res = await updateMonHocForKKT(
        selectedKKT.maKhoiKienThuc,
        danhSachMaMonHoc
      );

      if (res.success) {
        showToast("Cập nhật môn học thành công", "success");
        setShowUpdateModal(false);
        // Refresh danh sách môn học
        const refreshRes = await fetchMonhocByMaKKT(selectedKKT.maKhoiKienThuc);
        if (refreshRes.success) {
          setMonhocs(refreshRes.data);
        }
      } else {
        showToast("Cập nhật thất bại: " + res.message, "error");
      }
    } catch (err) {
      showToast("Lỗi khi cập nhật", "error");
    } finally {
      setUpdateLoading(false);
    }
  };

  // Lọc môn học để hiển thị (chỉ hiển thị môn chưa được phân công hoặc đã thuộc KKT hiện tại)
  const getFilteredMonHoc = () => {
    return allMonHoc.filter(
      (mon) =>
        !mon.TenMonHoc.toLowerCase().includes("tự chọn") &&
        (selectedMonHoc.includes(mon.MaMonHoc) ||
          !assignedMonHocSet.has(mon.MaMonHoc))
    );
  };

  return (
    <>
      <dialog open className="modal modal-open">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">
            Danh sách môn học – {selectedKKT?.tenKhoiKienThuc}
          </h3>

          <div className="mb-4">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleUpdateClick}
              disabled={updateLoading}
            >
              {updateLoading ? "Đang tải..." : "Cập nhật môn học"}
            </button>
          </div>

          {loading ? (
            <div className="text-center">Đang tải dữ liệu...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra text-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Mã môn</th>
                    <th>Tên môn học</th>
                    <th>Số TC</th>
                    <th>LT</th>
                    <th>BT</th>
                    <th>TH</th>
                    <th>Tự học</th>
                    <th>Ngôn ngữ</th>
                    <th>Loại môn</th>
                  </tr>
                </thead>
                <tbody>
                  {monhocs.map((mh, idx) => (
                    <tr key={mh.MaMonHoc}>
                      <td>{idx + 1}</td>
                      <td>{mh.MaMonHoc}</td>
                      <td>{mh.TenMonHoc}</td>
                      <td>{mh.SoTinChi}</td>
                      <td>{mh.SoTietLiThuyet}</td>
                      <td>{mh.SoTietBaiTap}</td>
                      <td>{mh.SoTietThucHanh}</td>
                      <td>{mh.SoTietTuHoc}</td>
                      <td>{mh.NgonNguDay}</td>
                      <td>{mh.LoaiMon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Đóng
            </button>
          </div>
        </form>
      </dialog>

      {/* Modal cập nhật môn học */}
      {showUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Cập nhật môn học cho: {selectedKKT?.tenKhoiKienThuc}
            </h2>
            <div className="max-h-80 overflow-y-auto border rounded p-2 mb-4">
              {allMonHoc.length === 0 ? (
                <div>Không có môn học nào.</div>
              ) : (
                <ul className="space-y-2">
                  {getFilteredMonHoc().map((mon) => (
                    <li key={mon.MaMonHoc} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={selectedMonHoc.includes(mon.MaMonHoc)}
                        onChange={() => handleMonCheck(mon.MaMonHoc)}
                        id={`monhoc-${mon.MaMonHoc}`}
                      />
                      <label htmlFor={`monhoc-${mon.MaMonHoc}`}>
                        {mon.TenMonHoc}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-ghost"
                onClick={() => setShowUpdateModal(false)}
                disabled={updateLoading}
              >
                Đóng
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSaveUpdate}
                disabled={updateLoading}
              >
                {updateLoading ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default XemMonHocModal;
