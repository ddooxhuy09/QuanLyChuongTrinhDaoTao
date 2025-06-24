import React, { useState, useEffect } from "react";
import { getUserProfile, changePassword } from "../../api/services/userService";
import { showToast } from "../../components/Common/showToast";

const UserProfile = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passwordForm, setPasswordForm] = useState({
    matKhauCu: "",
    matKhauMoi: "",
    xacNhanMatKhau: ""
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    fetchUserDetail();
  }, []);



  const fetchUserDetail = async () => {
    try {
      const response = await getUserProfile();
      if (response.success) {
        setUserDetail(response.data);
      } else {
        showToast(response.message || "Không thể tải thông tin user", "error");
      }
    } catch (error) {
      showToast("Lỗi khi tải thông tin user: " + (error.response?.data?.message || error.message), "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordForm.matKhauMoi !== passwordForm.xacNhanMatKhau) {
      showToast("Mật khẩu mới và xác nhận mật khẩu không khớp", "error");
      return;
    }

    if (passwordForm.matKhauMoi.length < 6) {
      showToast("Mật khẩu mới phải có ít nhất 6 ký tự", "error");
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await changePassword({
        matKhauCu: passwordForm.matKhauCu,
        matKhauMoi: passwordForm.matKhauMoi
      });

      if (response.success) {
        showToast(response.message || "Đổi mật khẩu thành công", "success");
        setPasswordForm({
          matKhauCu: "",
          matKhauMoi: "",
          xacNhanMatKhau: ""
        });
      } else {
        showToast(response.message || "Đổi mật khẩu thất bại", "error");
      }
    } catch (error) {
      showToast("Lỗi khi đổi mật khẩu", "error");
    } finally {
      setPasswordLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!userDetail) {
    return (
      <div className="p-6">
        <h2 className="text-xl text-error font-semibold">
          Không tìm thấy thông tin người dùng.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">
          🧑‍💼 Thông tin cá nhân
        </h1>
        <p className="text-lg text-base-content">
          Đây là thông tin chi tiết của bạn.
        </p>


      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4">Thông tin cá nhân</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold text-base-content/70">Tên đăng nhập:</span>
                <span className="col-span-2">{userDetail.TenDangNhap}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold text-base-content/70">Họ tên:</span>
                <span className="col-span-2">{userDetail.HoTen}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold text-base-content/70">Vai trò:</span>
                <span className="col-span-2">
                  <span className="badge badge-primary">
                    {userDetail.Role === 'SINHVIEN' ? 'Sinh viên' :
                      userDetail.Role === 'GIANGVIEN' ? 'Giảng viên' :
                        userDetail.Role === 'PHONGDAOTAO' ? 'Phòng đào tạo' :
                          userDetail.Role || 'Sinh viên'}
                  </span>
                </span>
              </div>

              {userDetail.MaSinhVien && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-base-content/70">Mã sinh viên:</span>
                  <span className="col-span-2">{userDetail.MaSinhVien}</span>
                </div>
              )}

              {userDetail.MaGiangVien && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-base-content/70">Mã giảng viên:</span>
                  <span className="col-span-2">{userDetail.MaGiangVien}</span>
                </div>
              )}

              {userDetail.NgaySinh && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-base-content/70">Ngày sinh:</span>
                  <span className="col-span-2">{formatDate(userDetail.NgaySinh)}</span>
                </div>
              )}

              {userDetail.Email && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-base-content/70">Email:</span>
                  <span className="col-span-2">{userDetail.Email}</span>
                </div>
              )}

              {userDetail.NamNhapHoc && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-base-content/70">Năm nhập học:</span>
                  <span className="col-span-2">{userDetail.NamNhapHoc}</span>
                </div>
              )}

              {userDetail.TenChuongTrinh && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-base-content/70">Chương trình đào tạo:</span>
                  <span className="col-span-2">
                    <span className="badge badge-secondary py-6">{userDetail.TenChuongTrinh}</span>
                  </span>
                </div>
              )}

              {userDetail.MaChuongTrinh && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-base-content/70">Mã chương trình:</span>
                  <span className="col-span-2">{userDetail.MaChuongTrinh}</span>
                </div>
              )}

              {userDetail.TenNganh && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-base-content/70">Ngành:</span>
                  <span className="col-span-2">
                    <span className="badge badge-accent">{userDetail.TenNganh}</span>
                  </span>
                </div>
              )}

              {userDetail.TenKhoa && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-base-content/70">Khoa:</span>
                  <span className="col-span-2">
                    <span className="badge badge-secondary">{userDetail.TenKhoa}</span>
                  </span>
                </div>
              )}




            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4">🔒 Đổi mật khẩu</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mật khẩu hiện tại</span>
                </label>
                <input
                  type="password"
                  name="matKhauCu"
                  value={passwordForm.matKhauCu}
                  onChange={handlePasswordChange}
                  className="input input-bordered"
                  placeholder="Nhập mật khẩu hiện tại"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mật khẩu mới</span>
                </label>
                <input
                  type="password"
                  name="matKhauMoi"
                  value={passwordForm.matKhauMoi}
                  onChange={handlePasswordChange}
                  className="input input-bordered"
                  placeholder="Nhập mật khẩu mới"
                  minLength={6}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Xác nhận mật khẩu mới</span>
                </label>
                <input
                  type="password"
                  name="xacNhanMatKhau"
                  value={passwordForm.xacNhanMatKhau}
                  onChange={handlePasswordChange}
                  className="input input-bordered"
                  placeholder="Nhập lại mật khẩu mới"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`btn btn-primary ${passwordLoading ? 'loading' : ''}`}
                  disabled={passwordLoading}
                >
                  {passwordLoading ? 'Đang đổi...' : 'Đổi mật khẩu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
