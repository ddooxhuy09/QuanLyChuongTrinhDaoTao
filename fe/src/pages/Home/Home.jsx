// src/pages/Home/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Header from "../../components/Layout/Header/Header";
import Breadcrumb from "../../components/Sections/Breadcrumb";
import { fetchAllChuongTrinhDaoTaoPublic } from "../../api/services/publicCtdtService";

function Home() {
  const [chuongTrinhList, setChuongTrinhList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function để lọc chương trình đào tạo, chỉ giữ lại phiên bản mới nhất
  const filterLatestPrograms = (programs) => {
    const groupMap = new Map();

    // Lọc bỏ những chương trình không có năm áp dụng hoặc năm áp dụng null
    const validPrograms = programs.filter(program =>
      program.NamApDung && program.NamApDung !== null && program.NamApDung !== ""
    );

    // Group theo TenChuongTrinh, MaNganh, TrinhDoDaoTao, HinhThucDaoTao
    validPrograms.forEach(program => {
      const key = `${program.TenChuongTrinh}_${program.MaNganh}_${program.TrinhDoDaoTao}_${program.HinhThucDaoTao}`;

      if (!groupMap.has(key)) {
        groupMap.set(key, program);
      } else {
        const existing = groupMap.get(key);
        // So sánh năm áp dụng, giữ lại năm mới nhất
        const programYear = parseInt(program.NamApDung);
        const existingYear = parseInt(existing.NamApDung);

        if (!isNaN(programYear) && !isNaN(existingYear) && programYear > existingYear) {
          groupMap.set(key, program);
        }
      }
    });

    // Trả về array từ Map values, sắp xếp theo năm áp dụng giảm dần
    return Array.from(groupMap.values()).sort((a, b) => {
      const yearA = parseInt(a.NamApDung);
      const yearB = parseInt(b.NamApDung);
      return yearB - yearA;
    });
  };

  useEffect(() => {
    const fetchChuongTrinh = async () => {
      try {
        setLoading(true);
        const result = await fetchAllChuongTrinhDaoTaoPublic();
        if (result.success) {
          // Lọc chỉ giữ lại chương trình có năm mới nhất
          const filteredPrograms = filterLatestPrograms(result.data);
          setChuongTrinhList(filteredPrograms);
        } else {
          setError(result.message || "Không thể tải danh sách chương trình đào tạo");
        }
      } catch (err) {
        console.error("Lỗi khi tải chương trình đào tạo:", err);
        setError("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchChuongTrinh();
  }, []);

  const handleViewDetail = (maChuongTrinh) => {
    navigate(`/chuong-trinh/${maChuongTrinh}`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-focus py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            🎓 Chương Trình Đào Tạo
          </h1>
          <p className="text-xl text-white/90">
            Khám phá các chương trình đào tạo chất lượng cao tại PTIT
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="flex items-center gap-3 text-primary">
              <Loader2 className="animate-spin w-6 h-6" />
              <span className="text-lg">Đang tải chương trình đào tạo...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-error text-lg mb-4">⚠️ {error}</div>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Thử lại
            </button>
          </div>
        ) : chuongTrinhList.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg">
              📚 Hiện tại chưa có chương trình đào tạo nào
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Danh Sách Chương Trình Đào Tạo
              </h2>
              <p className="text-gray-600">
                Có {chuongTrinhList.length} chương trình đào tạo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {chuongTrinhList.map((chuongTrinh) => (
                <div
                  key={chuongTrinh.MaChuongTrinh}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="card-body">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="card-title text-primary text-lg">
                        {chuongTrinh.TenChuongTrinh}
                      </h3>
                      <div className="badge badge-secondary">
                        {chuongTrinh.MaChuongTrinh}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Trình độ:</span>
                        <span className="badge badge-outline">
                          {chuongTrinh.TrinhDoDaoTao}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-medium">Hình thức:</span>
                        <span className="text-gray-600">
                          {chuongTrinh.HinhThucDaoTao}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-medium">Năm áp dụng:</span>
                        <span className="text-gray-600">
                          {chuongTrinh.NamApDung}
                        </span>
                      </div>

                      {chuongTrinh.TenNganh && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Ngành:</span>
                          <span className="text-gray-600">
                            {chuongTrinh.TenNganh}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="card-actions justify-end mt-6">
                      <button
                        onClick={() => handleViewDetail(chuongTrinh.MaChuongTrinh)}
                        className="btn btn-primary btn-sm gap-2"
                      >
                        📖 Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
