import React, { useState, useEffect } from "react";
import { Loader2, GraduationCap, BookOpen } from "lucide-react";
import { getMonHocTheoGiangVien } from "../../api/services/giangVienService";

const MonHocGiangDay = () => {
    const [monHocList, setMonHocList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Lấy thông tin user từ localStorage
        const userInfoStr = localStorage.getItem("user");
        console.log("User info from localStorage:", userInfoStr);

        if (userInfoStr) {
            try {
                const user = JSON.parse(userInfoStr);
                console.log("Parsed user:", user);
                setUserInfo(user);

                // Kiểm tra nếu là giảng viên và có mã giảng viên
                const isGiangVien = user.roles === "Giảng Viên" || user.Role === "GIANGVIEN";
                const maGiangVien = user.userId || user.id || user.userName;

                console.log("Is Giang Vien:", isGiangVien);
                console.log("Ma Giang Vien:", maGiangVien);

                if (isGiangVien && maGiangVien) {
                    fetchMonHocGiangDay(maGiangVien);
                } else {
                    console.warn("Không thể xác định mã giảng viên hoặc role không phù hợp");
                }
            } catch (error) {
                console.error("Error parsing user info:", error);
            }
        } else {
            console.warn("Không tìm thấy thông tin user trong localStorage");
        }
    }, []);

    const fetchMonHocGiangDay = async (maGiangVien) => {
        console.log("Fetching môn học for giảng viên:", maGiangVien);
        setLoading(true);
        try {
            const token = localStorage.getItem("access_token");
            console.log("Token:", token ? "Found" : "Not found");

            const response = await getMonHocTheoGiangVien(maGiangVien, token);
            console.log("API Response:", response);

            if (response.data.success) {
                console.log("Môn học data:", response.data.data);
                // Lọc bỏ môn học tự chọn có mã từ 1-9
                const filteredMonHoc = response.data.data.filter(
                    (mon) => !mon.MaMonHoc.match(/^[1-9]$/)
                );
                console.log("Filtered môn học:", filteredMonHoc);
                setMonHocList(filteredMonHoc);
            } else {
                console.error("Lỗi lấy danh sách môn học:", response.data.message);
                setMonHocList([]);
            }
        } catch (error) {
            console.error("Lỗi kết nối API:", error);
            setMonHocList([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8 gap-2 text-primary">
                <Loader2 className="animate-spin w-5 h-5" />
                Đang tải danh sách môn học...
            </div>
        );
    }

    return (
        <div className="p-6 max-w-screen-xl mx-auto space-y-8">
            <div className="flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold text-primary">Môn học giảng dạy</h1>
            </div>

            <div className="bg-primary-content rounded-xl p-4 shadow">
                <h2 className="text-lg font-semibold text-primary mb-2">
                    Thông tin giảng viên
                </h2>
                {userInfo ? (
                    <>
                        <p className="text-gray-700">
                            <span className="font-medium">Họ tên:</span> {userInfo.HoTen || userInfo.name || "N/A"}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Mã giảng viên:</span> {userInfo.userId || userInfo.id || userInfo.userName || "N/A"}
                        </p>
                    </>
                ) : (
                    <div className="text-warning">
                        <p>Không thể tải thông tin giảng viên</p>
                        <p className="text-xs mt-1">Vui lòng kiểm tra console để debug</p>
                    </div>
                )}
            </div>

            <div className="bg-base-100 rounded-xl shadow">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <BookOpen className="w-6 h-6 text-primary" />
                        <h2 className="text-xl font-bold text-primary">
                            Danh sách môn học được phân công
                        </h2>
                    </div>

                    {monHocList.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th className="text-center">STT</th>
                                        <th>Mã môn học</th>
                                        <th>Tên môn học</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monHocList.map((monHoc, index) => (
                                        <tr key={monHoc.MaMonHoc} className="hover:bg-gray-50">
                                            <td className="text-center font-medium">{index + 1}</td>
                                            <td className="font-mono font-medium text-primary">
                                                {monHoc.MaMonHoc}
                                            </td>
                                            <td className="font-medium">{monHoc.TenMonHoc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-500 mb-2">
                                Chưa có môn học được phân công
                            </h3>
                            <p className="text-gray-400">
                                Hiện tại bạn chưa được phân công giảng dạy môn học nào.
                            </p>
                        </div>
                    )}
                </div>
            </div>


        </div>
    );
};

export default MonHocGiangDay; 