import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { getMyChuongTrinhDaoTaoFromUser } from "../../../api/services/userService";
import { fetchAllChuongTrinhDaoTao } from "../../../api/services/ctdtService";

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
const ProgramList = ({ chuongtrinh, loading, userLoading, userInfo }) => {
  const navigate = useNavigate();
  const [showOldPrograms, setShowOldPrograms] = useState(false);

  if (loading || userLoading) {
    return (
      <div className="flex justify-center items-center py-8 gap-2 text-primary">
        <Loader2 className="animate-spin w-5 h-5" />
        Đang tải chương trình đào tạo...
      </div>
    );
  }

  // Kiểm tra role của user
  const isStudent = userInfo && (
    userInfo.roles === "Sinh Viên" || userInfo.Role === "Sinh Viên" ||
    userInfo.roles === "SINHVIEN" || userInfo.Role === "SINHVIEN" ||
    userInfo.roles === "Sinh viên" || userInfo.Role === "Sinh viên"
  );

  // Lọc chương trình theo trạng thái hiển thị (chỉ áp dụng cho sinh viên)
  const filteredPrograms = (isStudent && showOldPrograms)
    ? chuongtrinh
    : isStudent
      ? chuongtrinh.filter(ctdt => ctdt.isCurrentProgram)
      : chuongtrinh; // Giảng viên xem tất cả

  // Tìm chương trình hiện tại để hiển thị nút (chỉ cho sinh viên)
  const currentProgram = chuongtrinh.find(ctdt => ctdt.isCurrentProgram);
  const hasOldPrograms = chuongtrinh.some(ctdt => !ctdt.isCurrentProgram);

  return (
    <div className="space-y-6">
      {filteredPrograms.length > 0 ? (
        filteredPrograms.map((ctdt) => (
          <div key={`ctdt-${ctdt.MaChuongTrinh}`} className={`rounded-xl p-4 shadow ${ctdt.isCurrentProgram ? 'bg-primary-content' : 'bg-orange-50 border-l-4 border-orange-300'}`}>
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-semibold">
                    {ctdt.TenChuongTrinh} ({ctdt.MaChuongTrinh})
                  </h2>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Trình độ: {ctdt.TrinhDoDaoTao} - Hình thức: {ctdt.HinhThucDaoTao} - Năm áp dụng: {ctdt.NamApDung}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Ngành: {ctdt.TenNganh} - Khoa: {ctdt.TenKhoa}
                </p>
                {isStudent && !ctdt.isCurrentProgram && (
                  <p className="text-sm text-orange-600 mt-1 font-medium">
                    (Chương trình cũ hơn)
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {isStudent && ctdt.isCurrentProgram && hasOldPrograms && (
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setShowOldPrograms(!showOldPrograms)}
                  >
                    {showOldPrograms ? 'Ẩn chương trình cũ hơn' : 'Hiện chương trình cũ hơn'}
                  </button>
                )}
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    navigate(
                      `/user/chuongtrinhdaotao/chitiet?maChuongTrinh=${ctdt.MaChuongTrinh}`
                    )
                  }
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <div className="text-warning text-lg font-medium">
            📋 Không có chương trình đào tạo nào
          </div>
          <p className="text-gray-600 mt-2">
            Bạn chưa được gán vào chương trình đào tạo nào.
          </p>
        </div>
      )}
    </div>
  );
};

// Main Management Component
const ChuongtrinhdaotaoView = () => {
  const [chuongtrinh, setChuongtrinh] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // Lấy thông tin user từ localStorage
  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem("user");
    if (userInfoFromStorage) {
      try {
        const user = JSON.parse(userInfoFromStorage);
        setUserInfo(user);
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    }
    setUserLoading(false);
  }, []);

  // Fetch training programs based on user role
  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        // Kiểm tra role của user
        const isStudent = userInfo && (
          userInfo.roles === "Sinh Viên" ||
          userInfo.Role === "Sinh Viên" ||
          userInfo.roles === "SINHVIEN" ||
          userInfo.Role === "SINHVIEN" ||
          userInfo.roles === "Sinh viên" ||
          userInfo.Role === "Sinh viên"
        );

        const isTeacher = userInfo && (
          userInfo.roles === "Giảng Viên" ||
          userInfo.Role === "Giảng Viên" ||
          userInfo.roles === "GIANGVIEN" ||
          userInfo.Role === "GIANGVIEN" ||
          userInfo.roles === "Giảng viên" ||
          userInfo.Role === "Giảng viên"
        );

        if (isStudent) {
          try {
            // Sinh viên: Lấy chương trình đào tạo của mình
            const result = await getMyChuongTrinhDaoTaoFromUser();

            if (result.success) {
              // result.data bây giờ là array chứa chương trình hiện tại + các chương trình cũ hơn cùng loại
              setChuongtrinh(result.data || []);
            } else {
              setChuongtrinh([]);
            }
          } catch (error) {
            console.error("Error fetching student program:", error);
            setChuongtrinh([]);
          }
        } else if (isTeacher) {
          try {
            // Giảng viên: Lấy tất cả chương trình đào tạo
            const result = await fetchAllChuongTrinhDaoTao();

            if (result.success) {
              // Chuyển đổi format để phù hợp với component hiện tại
              const formattedData = result.data.map(ctdt => ({
                MaChuongTrinh: ctdt.MaChuongTrinh,
                TenChuongTrinh: ctdt.TenChuongTrinh,
                MaNganh: ctdt.MaNganh,
                TrinhDoDaoTao: ctdt.TrinhDoDaoTao,
                HinhThucDaoTao: ctdt.HinhThucDaoTao,
                NamApDung: ctdt.NamApDung,
                TenNganh: ctdt.TenNganh,
                TenKhoa: ctdt.TenKhoa,
                isCurrentProgram: true // Giảng viên xem tất cả là "hiện tại"
              }));
              setChuongtrinh(formattedData);
            } else {
              setChuongtrinh([]);
            }
          } catch (error) {
            console.error("Error fetching all programs for teacher:", error);
            setChuongtrinh([]);
          }
        } else {
          // Nếu không phải sinh viên hoặc giảng viên, không hiển thị gì
          setChuongtrinh([]);
        }
      } catch (err) {
        console.error("General error:", err);
        setChuongtrinh([]);
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading) { // Chỉ fetch khi đã hoàn tất việc lấy thông tin user
      fetchPrograms();
    }
  }, [userInfo, userLoading]); // Dependency array bao gồm userInfo và userLoading

  // Tạo title phù hợp dựa trên role
  const getPageTitle = () => {
    const isStudent = userInfo && (
      userInfo.roles === "Sinh Viên" || userInfo.Role === "Sinh Viên" ||
      userInfo.roles === "SINHVIEN" || userInfo.Role === "SINHVIEN" ||
      userInfo.roles === "Sinh viên" || userInfo.Role === "Sinh viên"
    );
    const isTeacher = userInfo && (
      userInfo.roles === "Giảng Viên" || userInfo.Role === "Giảng Viên" ||
      userInfo.roles === "GIANGVIEN" || userInfo.Role === "GIANGVIEN" ||
      userInfo.roles === "Giảng viên" || userInfo.Role === "Giảng viên"
    );

    if (isStudent) {
      return "📚 Chương trình đào tạo của bạn";
    } else if (isTeacher) {
      return "📚 Tất cả chương trình đào tạo";
    }
    return "📚 Chương trình đào tạo";
  };

  const getPageDescription = () => {
    const isStudent = userInfo && (
      userInfo.roles === "Sinh Viên" || userInfo.Role === "Sinh Viên" ||
      userInfo.roles === "SINHVIEN" || userInfo.Role === "SINHVIEN" ||
      userInfo.roles === "Sinh viên" || userInfo.Role === "Sinh viên"
    );
    const isTeacher = userInfo && (
      userInfo.roles === "Giảng Viên" || userInfo.Role === "Giảng Viên" ||
      userInfo.roles === "GIANGVIEN" || userInfo.Role === "GIANGVIEN" ||
      userInfo.roles === "Giảng viên" || userInfo.Role === "Giảng viên"
    );

    if (isStudent) {
      return "Xem chương trình đào tạo hiện tại và các phiên bản trước đây";
    } else if (isTeacher) {
      return "Xem tất cả chương trình đào tạo của trường";
    }
    return null;
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">{getPageTitle()}</h1>
        {getPageDescription() && (
          <p className="text-sm text-gray-600 mt-2">
            {getPageDescription()}
          </p>
        )}
      </div>
      <ProgramList
        chuongtrinh={chuongtrinh}
        loading={loading}
        userLoading={userLoading}
        userInfo={userInfo}
      />
    </div>
  );
};

export default ChuongtrinhdaotaoView;
