import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  getAllPhongDaoTao,
  addPhongDaoTao,
  deletePhongDaoTao,
} from "../../../api/services/phongDaoTaoService";
import { showToast } from "../../../components/Common/showToast";

const PhongDaoTao = () => {
  const [trainingRooms, setTrainingRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPasswords, setShowPasswords] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    tenDangNhap: "",
    matKhau: "",
  });
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchTrainingRooms = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await getAllPhongDaoTao(token);
        if (response.data.success) {
          setTrainingRooms(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Không thể lấy danh sách phòng đào tạo");
      } finally {
        setLoading(false);
      }
    };
    fetchTrainingRooms();
  }, []);

  const togglePasswordVisibility = (maPhong) => {
    setShowPasswords((prev) => ({
      ...prev,
      [maPhong]: !prev[maPhong],
    }));
  };

  // Fixed length for password display (8 characters)
  const displayPassword = (password, show) => {
    if (show) {
      // Pad or truncate password to 8 characters for consistent width
      return password.length > 8
        ? password.slice(0, 8)
        : password.padEnd(8, " ");
    }
    return "********"; // Always show 8 asterisks when masked
  };

  const openAddModal = () => {
    setForm({ tenDangNhap: "", matKhau: "" });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!form.tenDangNhap || !form.matKhau) {
      showToast("Vui lòng nhập đủ thông tin", "error");
      return;
    }
    try {
      setLoading(true);
      await addPhongDaoTao(form, token);
      showToast("Thêm thành công", "success");
      const response = await getAllPhongDaoTao(token);
      setTrainingRooms(response.data.data);
      closeModal();
    } catch (err) {
      showToast("Có lỗi xảy ra", "error");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => setDeleteId(id);
  const handleDelete = async () => {
    const token = localStorage.getItem("access_token");
    try {
      setLoading(true);
      await deletePhongDaoTao(deleteId, token);
      showToast("Xóa thành công", "success");
      setTrainingRooms((prev) => prev.filter((r) => r.ID !== deleteId));
      setDeleteId(null);
    } catch (err) {
      showToast("Xóa thất bại", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Quản lý Phòng Đào tạo
          </h1>
          <p className="text-lg text-base-content">
            Danh sách các phòng đào tạo hiện có
          </p>
        </div>
        <button className="btn btn-primary" onClick={openAddModal}>
          Thêm tài khoản
        </button>
      </div>

      {/* Content */}
      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}
      {!loading && !error && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Mã Phòng</th>
                    <th>Tên Đăng Nhập</th>
                    <th>Mật Khẩu</th>
                    <th>Mã Khoa</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingRooms.map((room) => (
                    <tr key={room.MaPhongDaoTao || room.ID}>
                      <td>{room.MaPhongDaoTao || room.ID}</td>
                      <td>{room.TenDangNhap}</td>
                      <td className="flex items-center gap-2">
                        <span className="font-mono">
                          {displayPassword(
                            room.MatKhau,
                            showPasswords[room.MaPhongDaoTao || room.ID]
                          )}
                        </span>
                      </td>
                      <td>{room.MaKhoa || room.Quyen}</td>
                      <td>
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() =>
                            confirmDelete(room.MaPhongDaoTao || room.ID)
                          }
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal Thêm */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Thêm tài khoản Phòng đào tạo
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                className="input input-bordered w-full"
                name="tenDangNhap"
                placeholder="Tên Đăng Nhập"
                value={form.tenDangNhap}
                onChange={handleChange}
                required
              />
              <input
                className="input input-bordered w-full"
                name="matKhau"
                placeholder="Mật Khẩu"
                value={form.matKhau}
                onChange={handleChange}
                required
                type="text"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={closeModal}
                >
                  Hủy
                </button>
                <button className="btn btn-primary" type="submit">
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal xác nhận xóa */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-bold mb-4">Xác nhận xóa</h2>
            <p>Bạn có chắc muốn xóa tài khoản này?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="btn btn-ghost"
                onClick={() => setDeleteId(null)}
              >
                Hủy
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhongDaoTao;
