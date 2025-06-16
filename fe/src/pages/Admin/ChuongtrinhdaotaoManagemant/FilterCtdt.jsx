import React, { useState } from "react";
import axios from "axios";

// Axios instance with token
const axiosAuth = axios.create({
  baseURL: 'http://localhost:3000'
});

axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const FilterCtdt = ({
  setChuongtrinh,
  setLoading,
}) => {
  const [selectedNienKhoa, setSelectedNienKhoa] = useState("");
  const [cache, setCache] = useState({}); // Cache for chuongtrinh data
  const nienKhoas = ["D20", "D21", "D22", "D23"];

  // Fetch chương trình đào tạo when "Lọc" button is clicked
  const handleFilter = async () => {
    setLoading(true);
    const params = {};
    if (selectedNienKhoa) params.maNienKhoa = selectedNienKhoa;

    const cacheKey = JSON.stringify(params);
    if (cache[cacheKey]) {
      setChuongtrinh(cache[cacheKey]);
      setLoading(false);
      return;
    }

    try {
      const res = await axiosAuth.get(
        "/api/chuongtrinhdaotao",
        { params }
      );
      if (res.data.success) {
        const data = Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data];
        setCache((prev) => ({ ...prev, [cacheKey]: data }));
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:gap-4 md:grid-cols-1 gap-2">
        <div>
          <label className="block text-sm font-medium">Niên khóa</label>
          <select
            className="select select-bordered w-full"
            value={selectedNienKhoa}
            onChange={(e) => setSelectedNienKhoa(e.target.value)}
          >
            <option value="">Chọn niên khóa</option>
            {nienKhoas.map((nk) => (
              <option key={nk} value={nk}>
                {nk}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="btn btn-primary" onClick={handleFilter}>
          Lọc
        </button>
      </div>
    </div>
  );
};

export default FilterCtdt;
