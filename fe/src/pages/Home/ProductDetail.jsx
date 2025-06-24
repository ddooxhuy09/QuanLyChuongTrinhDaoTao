// src/pages/Home/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import Header from "../../components/Layout/Header/Header";
import {
  fetchChuongTrinhByMaPublic,
  fetchChuyenNganhPublic,
  fetchMonTuChonPublic
} from "../../api/services/publicCtdtService";

export default function ProductDetail() {
  const [chuongtrinh, setChuongtrinh] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chuyenNganh, setChuyenNganh] = useState([]);
  const [loadingChuyenNganh, setLoadingChuyenNganh] = useState(false);
  const [selectedChuyenNganh, setSelectedChuyenNganh] = useState(null);
  const [showMonTuChonModal, setShowMonTuChonModal] = useState(false);
  const [selectedMonTuChon, setSelectedMonTuChon] = useState(null);
  const [selectedHocKy, setSelectedHocKy] = useState(null);
  const [danhSachMonTuChon, setDanhSachMonTuChon] = useState([]);

  const { productName: maChuongTrinh } = useParams();
  const navigate = useNavigate();



  useEffect(() => {
    const fetchChuongTrinh = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchChuongTrinhByMaPublic(maChuongTrinh);
        if (result.success) {
          setChuongtrinh(result.data);
        } else {
          setError(result.message || "Không tìm thấy chương trình đào tạo");
        }
      } catch (err) {
        console.error("Lỗi lấy chương trình đào tạo:", err);
        setError("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    const fetchChuyenNganhData = async () => {
      setLoadingChuyenNganh(true);
      try {
        const result = await fetchChuyenNganhPublic(maChuongTrinh);
        if (result.success) {
          setChuyenNganh(result.data);
        }
      } catch (err) {
        console.error("Lỗi lấy thông tin chuyên ngành:", err);
      } finally {
        setLoadingChuyenNganh(false);
      }
    };

    if (maChuongTrinh) {
      fetchChuongTrinh();
      fetchChuyenNganhData();
    }
  }, [maChuongTrinh]);

  // Hàm xử lý xem môn tự chọn
  const handleShowMonTuChon = async (monTuChon, hocKy) => {
    try {
      if (!selectedChuyenNganh) {
        alert("Vui lòng chọn chuyên ngành trước");
        return;
      }

      const result = await fetchMonTuChonPublic(maChuongTrinh, selectedChuyenNganh.maKhoiKienThuc, hocKy);

      if (result.success) {
        setSelectedMonTuChon(monTuChon);
        setSelectedHocKy(hocKy);
        setDanhSachMonTuChon(result.data);
        setShowMonTuChonModal(true);
      }
    } catch (err) {
      console.error("Lỗi lấy danh sách môn tự chọn:", err);
      alert("Có lỗi xảy ra khi lấy danh sách môn tự chọn");
    }
  };

  // Component kế hoạch học tập
  const KeHoachHocTapComponent = ({ chuyenNganh }) => {
    if (!chuyenNganh) return null;

    const groupHocKyByNamHoc = (keHoachHocTap) => {
      const result = [];
      for (let i = 0; i < keHoachHocTap.length; i += 2) {
        if (i + 1 < keHoachHocTap.length) {
          result.push({
            namHoc: `Năm học thứ ${Math.floor(i / 2) + 1}`,
            hocKy1: keHoachHocTap[i],
            hocKy2: keHoachHocTap[i + 1],
          });
        } else {
          result.push({
            namHoc: `Năm học thứ ${Math.floor(i / 2) + 1}`,
            hocKy1: keHoachHocTap[i],
            hocKy2: null,
          });
        }
      }
      return result;
    };

    const namHocGroups = groupHocKyByNamHoc(chuyenNganh.keHoachHocTap);

    return (
      <div className="mt-6 space-y-6">
        <h3 className="text-lg font-semibold text-primary">
          Kế hoạch học tập - {chuyenNganh.tenKhoiKienThuc}
        </h3>

        {namHocGroups.map((namHoc, index) => (
          <div key={index} className="bg-base-100 rounded-xl shadow p-4">
            <h4 className="text-md font-semibold mb-4 text-center">
              {namHoc.namHoc}
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium mb-2">
                  Học kỳ {namHoc.hocKy1.hocKy}
                </h5>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên môn học</th>
                        <th>Số tín chỉ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {namHoc.hocKy1.monHoc
                        .filter((mon) => mon.loaiMon !== "Tự chọn")
                        .sort((a, b) => b.maMonHoc.localeCompare(a.maMonHoc))
                        .map((mon, idx) =>
                          mon.maMonHoc.match(/^[1-9]$/) ? (
                            <tr
                              key={mon.maMonHoc}
                              className="cursor-pointer hover:bg-gray-100"
                              onClick={() => handleShowMonTuChon(mon, namHoc.hocKy1.hocKy)}
                            >
                              <td>{idx + 1}</td>
                              <td className="text-primary font-medium">{mon.tenMonHoc}</td>
                              <td>{mon.soTinChi}</td>
                            </tr>
                          ) : (
                            <tr key={mon.maMonHoc}>
                              <td>{idx + 1}</td>
                              <td>{mon.tenMonHoc}</td>
                              <td>{mon.soTinChi}</td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              </div>

              {namHoc.hocKy2 && (
                <div>
                  <h5 className="text-sm font-medium mb-2">
                    Học kỳ {namHoc.hocKy2.hocKy}
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Tên môn học</th>
                          <th>Số tín chỉ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {namHoc.hocKy2.monHoc
                          .filter((mon) => mon.loaiMon !== "Tự chọn")
                          .sort((a, b) => b.maMonHoc.localeCompare(a.maMonHoc))
                          .map((mon, idx) =>
                            mon.maMonHoc.match(/^[1-9]$/) ? (
                              <tr
                                key={mon.maMonHoc}
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleShowMonTuChon(mon, namHoc.hocKy2.hocKy)}
                              >
                                <td>{idx + 1}</td>
                                <td className="text-primary font-medium">{mon.tenMonHoc}</td>
                                <td>{mon.soTinChi}</td>
                              </tr>
                            ) : (
                              <tr key={mon.maMonHoc}>
                                <td>{idx + 1}</td>
                                <td>{mon.tenMonHoc}</td>
                                <td>{mon.soTinChi}</td>
                              </tr>
                            )
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex justify-center items-center py-16">
          <div className="flex items-center gap-3 text-primary">
            <Loader2 className="animate-spin w-6 h-6" />
            <span className="text-lg">Đang tải chương trình đào tạo...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="text-error text-xl mb-4">⚠️ {error}</div>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  if (!chuongtrinh) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="text-warning text-xl">Không tìm thấy chương trình đào tạo.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-8">
        {/* Header với nút quay lại */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/")}
            className="btn btn-ghost btn-sm gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </button>
          <h1 className="text-3xl font-bold text-primary">
            🎓 Chi tiết chương trình đào tạo
          </h1>
        </div>

        {/* Thông tin chương trình */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-primary mb-4">
            {chuongtrinh?.thongTinChuongTrinh?.TenChuongTrinh} (
            {chuongtrinh?.thongTinChuongTrinh?.MaChuongTrinh})
          </h2>
          <p className="text-gray-600 mb-6">
            Trình độ: {chuongtrinh?.thongTinChuongTrinh?.TrinhDoDaoTao} - Hình
            thức: {chuongtrinh?.thongTinChuongTrinh?.HinhThucDaoTao} - Năm áp
            dụng: {chuongtrinh?.thongTinChuongTrinh?.NamApDung}
          </p>
        </div>

        {/* Kế hoạch học tập */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-primary mb-4">
            Kế hoạch học tập
          </h2>
          {loadingChuyenNganh ? (
            <div className="flex justify-center items-center py-4 gap-2 text-primary">
              <Loader2 className="animate-spin w-5 h-5" />
              Đang tải thông tin chuyên ngành...
            </div>
          ) : chuyenNganh.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Không có thông tin chuyên ngành
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-4 mb-6">
                {chuyenNganh.map((nganh) => (
                  <button
                    key={nganh.maKhoiKienThuc}
                    className={`btn ${selectedChuyenNganh?.maKhoiKienThuc === nganh.maKhoiKienThuc
                      ? "btn-primary"
                      : "btn-outline"
                      }`}
                    onClick={() => setSelectedChuyenNganh(nganh)}
                  >
                    {nganh.tenKhoiKienThuc}
                  </button>
                ))}
              </div>

              {selectedChuyenNganh && (
                <KeHoachHocTapComponent chuyenNganh={selectedChuyenNganh} />
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal hiển thị danh sách môn tự chọn */}
      {showMonTuChonModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[70vh] overflow-y-auto">
            <h3 className="font-bold text-lg mb-4">Danh sách môn tự chọn</h3>
            {selectedMonTuChon && selectedHocKy && (
              <div className="space-y-4">
                <div className="bg-gray-100 p-3 rounded">
                  <p><strong>Môn:</strong> {selectedMonTuChon.tenMonHoc}</p>
                  <p><strong>Học kỳ:</strong> {selectedHocKy}</p>
                  <p><strong>Số tín chỉ:</strong> {selectedMonTuChon.soTinChi}</p>
                </div>

                <div className="space-y-2">
                  {danhSachMonTuChon.length > 0 ? (
                    danhSachMonTuChon.map((mon, idx) => (
                      <div key={mon.MaMonHoc} className="bg-gray-50 p-3 rounded border-l-4 border-primary">
                        <span className="font-medium text-gray-800">
                          {idx + 1}. {mon.TenMonHoc}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      Không có môn học tự chọn nào
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <button
                className="btn btn-primary"
                onClick={() => setShowMonTuChonModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
