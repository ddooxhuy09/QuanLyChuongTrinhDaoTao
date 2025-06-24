import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Edit2, Eye, Plus } from "lucide-react";
import axios from "axios";
import { showToast } from "../../../components/Common/showToast";

// Axios instance with token
const axiosAuth = axios.create({
  baseURL: "http://localhost:3000",
});

axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// List programs
const ProgramList = ({ chuongtrinh, loading, onEdit }) => {
  const navigate = useNavigate();
  const [showOldProgramsMap, setShowOldProgramsMap] = useState({});

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 gap-2 text-primary">
        <Loader2 className="animate-spin w-5 h-5" />
        Đang tải chương trình đào tạo...
      </div>
    );
  }

  // Hàm nhóm và xác định chương trình hiện tại dựa trên năm áp dụng
  const groupAndDetermineCurrentPrograms = (programs) => {
    const groupMap = new Map();

    // Group theo TenChuongTrinh, MaNganh, TrinhDoDaoTao, HinhThucDaoTao
    programs.forEach(program => {
      const key = `${program.TenChuongTrinh}_${program.MaNganh}_${program.TrinhDoDaoTao}_${program.HinhThucDaoTao}`;

      if (!groupMap.has(key)) {
        groupMap.set(key, []);
      }
      groupMap.get(key).push(program);
    });

    // Xác định chương trình hiện tại trong mỗi group và tạo cấu trúc dữ liệu mới
    const programGroups = [];
    groupMap.forEach((group, key) => {
      // Lọc những chương trình có năm áp dụng
      const validPrograms = group.filter(p => p.NamApDung && p.NamApDung !== null);

      let latestYear = null;
      if (validPrograms.length > 0) {
        latestYear = Math.max(...validPrograms.map(p => parseInt(p.NamApDung)));
      }

      // Đánh dấu chương trình hiện tại và sắp xếp theo năm áp dụng
      const updatedPrograms = group.map(program => {
        let status = 'notApplied'; // Mặc định chưa áp dụng

        if (program.NamApDung && parseInt(program.NamApDung) === latestYear) {
          status = 'current'; // Hiện tại
        } else if (program.NamApDung && program.NamApDung !== null) {
          status = 'old'; // Cũ hơn
        }

        return {
          ...program,
          isCurrentProgram: status === 'current',
          programStatus: status
        };
      }).sort((a, b) => {
        // Sắp xếp: chương trình hiện tại trước, sau đó theo năm giảm dần, cuối cùng là chưa áp dụng
        if (a.programStatus === 'current' && b.programStatus !== 'current') return -1;
        if (a.programStatus !== 'current' && b.programStatus === 'current') return 1;

        if (a.programStatus === 'notApplied' && b.programStatus !== 'notApplied') return 1;
        if (a.programStatus !== 'notApplied' && b.programStatus === 'notApplied') return -1;

        const yearA = parseInt(a.NamApDung) || 0;
        const yearB = parseInt(b.NamApDung) || 0;
        return yearB - yearA;
      });

      const currentProgram = updatedPrograms.find(p => p.isCurrentProgram);
      const oldPrograms = updatedPrograms.filter(p => p.programStatus === 'old');
      const notAppliedPrograms = updatedPrograms.filter(p => p.programStatus === 'notApplied');

      programGroups.push({
        key,
        groupInfo: currentProgram || updatedPrograms[0], // Thông tin đại diện cho nhóm
        currentProgram,
        oldPrograms,
        notAppliedPrograms,
        allPrograms: updatedPrograms
      });
    });

    return programGroups;
  };

  const toggleShowOldPrograms = (groupKey) => {
    setShowOldProgramsMap(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  const programGroups = groupAndDetermineCurrentPrograms(chuongtrinh);

  return (
    <div className="space-y-6">
      {programGroups.length > 0 ? (
        programGroups.map((group) => {
          const showOldPrograms = showOldProgramsMap[group.key] || false;

          // Logic hiển thị: luôn hiện current + notApplied, chỉ hiện old khi toggle
          let programsToShow = [];
          if (group.currentProgram) {
            programsToShow.push(group.currentProgram);
          }
          programsToShow.push(...group.notAppliedPrograms);
          if (showOldPrograms) {
            programsToShow.push(...group.oldPrograms);
          }

          return (
            <div key={group.key} className="space-y-4">
              {programsToShow.map((ctdt) => (
                <div
                  key={`ctdt-${ctdt.MaChuongTrinh}`}
                  className={`rounded-xl p-4 shadow ${ctdt.programStatus === 'current'
                    ? 'bg-primary-content'
                    : ctdt.programStatus === 'old'
                      ? 'bg-orange-50 border-l-4 border-orange-300'
                      : 'bg-gray-50 border-l-4 border-gray-300'
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-lg font-semibold">
                          {ctdt.TenChuongTrinh} ({ctdt.MaChuongTrinh})
                        </h2>
                        {ctdt.programStatus === 'current' && (
                          <span className="badge badge-success badge-sm">Hiện tại</span>
                        )}
                        {ctdt.programStatus === 'notApplied' && (
                          <span className="badge badge-neutral badge-sm">Chưa áp dụng</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Trình độ: {ctdt.TrinhDoDaoTao} - Hình thức:{" "}
                        {ctdt.HinhThucDaoTao} - Năm áp dụng: {ctdt.NamApDung || "Chưa xác định"}
                      </p>
                      {ctdt.programStatus === 'old' && (
                        <p className="text-sm text-orange-600 mt-1 font-medium">
                          (Chương trình cũ hơn)
                        </p>
                      )}
                      {ctdt.programStatus === 'notApplied' && (
                        <p className="text-sm text-gray-600 mt-1 font-medium">
                          (Chưa áp dụng)
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 items-center">
                      {/* Nút toggle cho từng nhóm - chỉ hiển thị trên chương trình hiện tại */}
                      {ctdt.programStatus === 'current' && group.oldPrograms.length > 0 && (
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => toggleShowOldPrograms(group.key)}
                        >
                          {showOldPrograms ? 'Ẩn phiên bản cũ hơn' : 'Hiện phiên bản cũ hơn'}
                        </button>
                      )}
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          navigate(
                            `/admin/chuongtrinhdaotao/chitiet?maChuongTrinh=${ctdt.MaChuongTrinh}`
                          )
                        }
                      >
                        <Eye className="w-4 h-4" />
                        Xem chi tiết
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => onEdit(ctdt)}
                      >
                        <Edit2 className="w-4 h-4" />
                        Chỉnh sửa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })
      ) : (
        <div className="text-warning">Không có chương trình đào tạo nào.</div>
      )}
    </div>
  );
};

// Main Management Component
const ChuongtrinhdaotaoManagement = () => {
  const [chuongtrinh, setChuongtrinh] = useState([]);
  const [loading, setLoading] = useState(false);

  // States for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    maChuongTrinh: "",
    tenChuongTrinh: "",
    maNganh: "",
    trinhDoDaoTao: "",
    hinhThucDaoTao: "",
    namApDung: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Handle edit program
  const handleEditProgram = (ctdt) => {
    setEditFormData({
      maChuongTrinh: ctdt.MaChuongTrinh,
      tenChuongTrinh: ctdt.TenChuongTrinh,
      maNganh: ctdt.MaNganh,
      trinhDoDaoTao: ctdt.TrinhDoDaoTao,
      hinhThucDaoTao: ctdt.HinhThucDaoTao,
      namApDung: ctdt.NamApDung || "",
    });
    setShowEditModal(true);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle update program
  const handleUpdateProgram = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const dataToSend = {
        ...editFormData,
        namApDung: editFormData.namApDung === "" ? null : parseInt(editFormData.namApDung)
      };

      const res = await axiosAuth.put("/api/ctdt/capnhat", dataToSend);

      if (res.data.success) {
        showToast("✅ Cập nhật chương trình đào tạo thành công!", "success");
        setShowEditModal(false);
        fetchAllPrograms(); // Refresh data
      } else {
        showToast(`❌ ${res.data.message || "Có lỗi xảy ra khi cập nhật"}`, "error");
      }
    } catch (err) {
      console.error("Lỗi cập nhật chương trình:", err);
      const errorMessage = err.response?.data?.message || "Có lỗi xảy ra khi cập nhật";
      showToast(`❌ ${errorMessage}`, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle add program
  const handleAddProgram = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const dataToSend = {
        ...editFormData,
        namApDung: editFormData.namApDung === "" ? null : parseInt(editFormData.namApDung)
      };

      const res = await axiosAuth.post("/api/ctdt/them", dataToSend);

      if (res.data.success) {
        showToast("✅ Thêm chương trình đào tạo thành công!", "success");
        setShowAddModal(false);
        setEditFormData({
          maChuongTrinh: "",
          tenChuongTrinh: "",
          maNganh: "",
          trinhDoDaoTao: "",
          hinhThucDaoTao: "",
          namApDung: "",
        });
        fetchAllPrograms(); // Refresh data
      } else {
        showToast(`❌ ${res.data.message || "Có lỗi xảy ra khi thêm"}`, "error");
      }
    } catch (err) {
      console.error("Lỗi thêm chương trình:", err);
      const errorMessage = err.response?.data?.message || "Có lỗi xảy ra khi thêm";
      showToast(`❌ ${errorMessage}`, "error");
    } finally {
      setIsAdding(false);
    }
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setEditFormData({
      maChuongTrinh: "",
      tenChuongTrinh: "",
      maNganh: "",
      trinhDoDaoTao: "",
      hinhThucDaoTao: "",
      namApDung: "",
    });
  };

  // Fetch all training programs on component mount
  const fetchAllPrograms = async () => {
    setLoading(true);
    try {
      const res = await axiosAuth.get("/api/chuongtrinhdaotao");
      if (res.data.success) {
        const data = Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data];
        setChuongtrinh(data);
      } else {
        setChuongtrinh([]);
      }
    } catch (err) {
      console.error("Lỗi lấy chương trình đào tạo:", err);
      setChuongtrinh([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all training programs on component mount
  useEffect(() => {
    fetchAllPrograms();
  }, []); // Empty dependency array to run only on mount

  return (
    <div className="p-6 max-w-screen-xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Chương trình đào tạo</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary gap-2"
        >
          <Plus className="w-5 h-5" />
          Thêm chương trình
        </button>
      </div>
      <ProgramList chuongtrinh={chuongtrinh} loading={loading} onEdit={handleEditProgram} />

      {/* Modal chỉnh sửa chương trình đào tạo */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[600px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-primary mb-6">
              ✏️ Chỉnh sửa chương trình đào tạo
            </h3>

            <form onSubmit={handleUpdateProgram} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã chương trình <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="maChuongTrinh"
                    value={editFormData.maChuongTrinh}
                    disabled
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Năm áp dụng
                  </label>
                  <input
                    type="number"
                    name="namApDung"
                    value={editFormData.namApDung}
                    onChange={handleInputChange}
                    min="2000"
                    max="2100"
                    placeholder="Nhập năm áp dụng (để trống nếu chưa xác định)"
                    className="input input-bordered w-full"
                  />
                  <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      ⚠️ <strong>Lưu ý:</strong> Khi đặt năm áp dụng, hệ thống sẽ kiểm tra:
                    </p>
                    <ul className="text-xs text-yellow-700 mt-1 ml-4 list-disc">
                      <li>Chương trình đã có kế hoạch học tập</li>
                      <li>Tổng tín chỉ mỗi kì học từ 15-23 tín chỉ</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên chương trình đào tạo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tenChuongTrinh"
                  value={editFormData.tenChuongTrinh}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mã ngành <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="maNganh"
                  value={editFormData.maNganh}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trình độ đào tạo <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="trinhDoDaoTao"
                    value={editFormData.trinhDoDaoTao}
                    onChange={handleInputChange}
                    required
                    className="select select-bordered w-full"
                  >
                    <option value="">Chọn trình độ</option>
                    <option value="Đại học">Đại học</option>
                    <option value="Thạc sĩ">Thạc sĩ</option>
                    <option value="Tiến sĩ">Tiến sĩ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hình thức đào tạo <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="hinhThucDaoTao"
                    value={editFormData.hinhThucDaoTao}
                    onChange={handleInputChange}
                    required
                    className="select select-bordered w-full"
                  >
                    <option value="">Chọn hình thức</option>
                    <option value="Chính quy">Chính quy</option>
                    <option value="Liên thông">Liên thông</option>
                    <option value="Từ xa">Từ xa</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-focus transition-colors disabled:opacity-50"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
                      Đang cập nhật...
                    </>
                  ) : (
                    "Cập nhật"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal thêm chương trình đào tạo */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[600px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-primary mb-6">
              ➕ Thêm chương trình đào tạo mới
            </h3>

            <form onSubmit={handleAddProgram} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã chương trình <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="maChuongTrinh"
                    value={editFormData.maChuongTrinh}
                    onChange={handleInputChange}
                    required
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Năm áp dụng
                  </label>
                  <input
                    type="number"
                    name="namApDung"
                    value={editFormData.namApDung}
                    onChange={handleInputChange}
                    min="2000"
                    max="2100"
                    placeholder="Nhập năm áp dụng (để trống nếu chưa xác định)"
                    className="input input-bordered w-full"
                  />
                  <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      ⚠️ <strong>Lưu ý:</strong> Khi đặt năm áp dụng, hệ thống sẽ kiểm tra:
                    </p>
                    <ul className="text-xs text-yellow-700 mt-1 ml-4 list-disc">
                      <li>Chương trình đã có kế hoạch học tập</li>
                      <li>Tổng tín chỉ mỗi kì học từ 15-23 tín chỉ</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên chương trình đào tạo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tenChuongTrinh"
                  value={editFormData.tenChuongTrinh}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mã ngành <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="maNganh"
                  value={editFormData.maNganh}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trình độ đào tạo <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="trinhDoDaoTao"
                    value={editFormData.trinhDoDaoTao}
                    onChange={handleInputChange}
                    required
                    className="select select-bordered w-full"
                  >
                    <option value="">Chọn trình độ</option>
                    <option value="Đại học">Đại học</option>
                    <option value="Thạc sĩ">Thạc sĩ</option>
                    <option value="Tiến sĩ">Tiến sĩ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hình thức đào tạo <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="hinhThucDaoTao"
                    value={editFormData.hinhThucDaoTao}
                    onChange={handleInputChange}
                    required
                    className="select select-bordered w-full"
                  >
                    <option value="">Chọn hình thức</option>
                    <option value="Chính quy">Chính quy</option>
                    <option value="Liên thông">Liên thông</option>
                    <option value="Từ xa">Từ xa</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isAdding}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-focus transition-colors disabled:opacity-50"
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
                      Đang thêm...
                    </>
                  ) : (
                    "Thêm mới"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChuongtrinhdaotaoManagement;
