import React, { useEffect, useState } from "react";
import axios from "axios";

const KhoikienthucMonhocManagement = () => {
  const [khoikienthucs, setKhoikienthucs] = useState([]);
  const [monhocData, setMonhocData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingMonhoc, setLoadingMonhoc] = useState({});

  useEffect(() => {
    const fetchKhoikienthucs = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get("http://localhost:3000/api/khoikienthuc", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setKhoikienthucs(res.data.data);
        } else {
          console.error("Lỗi lấy dữ liệu:", res.data.message);
        }
      } catch (error) {
        console.error("Lỗi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchKhoikienthucs();
  }, []);

  const buildTree = (data, parentId = null) => {
    return data
      .filter((item) => item.ParentID === parentId)
      .map((item) => ({
        ...item,
        children: buildTree(data, item.MaKhoiKienThuc),
      }));
  };

  const getColorClasses = (capDo) => {
    switch (capDo) {
      case 0:
        return "bg-primary-content text-secondary-content";
      case 1:
        return "bg-white text-secondary-content";
      case 2:
        return "bg-neutral-content text-accent-content";
      default:
        return "bg-neutral text-neutral-content";
    }
  };

  const handleExpand = async (maKKT) => {
    if (monhocData[maKKT]) return; // Đã có dữ liệu, không cần fetch lại

    try {
      setLoadingMonhoc((prev) => ({ ...prev, [maKKT]: true }));
      const token = localStorage.getItem("access_token");
      const res = await axios.get(
        `http://localhost:3000/api/khoikienthuc/${maKKT}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setMonhocData((prev) => ({
          ...prev,
          [maKKT]: res.data.data.danhSachMonHoc,
        }));
      } else {
        console.error("Lỗi lấy môn học:", res.data.message);
      }
    } catch (error) {
      console.error("Lỗi gọi API môn học:", error);
    } finally {
      setLoadingMonhoc((prev) => ({ ...prev, [maKKT]: false }));
    }
  };

  const renderMonhocs = (maKKT) => {
    const monhocs = monhocData[maKKT];
    if (!monhocs || monhocs.length === 0) return null;

    return (
      <div className="overflow-x-auto mt-2">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr>
              <th>Thứ tự</th>
              <th>Mã môn</th>
              <th>Tên môn</th>
            </tr>
          </thead>
          <tbody>
            {[...monhocs]
              .sort((a, b) => a.ThuTu - b.ThuTu)
              .map((mh) => (
                <tr key={mh.MaMonHoc}>
                  <td>{mh.ThuTu}</td>
                  <td>{mh.MaMonHoc}</td>
                  <td>{mh.TenMonHoc}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTree = (nodes) =>
    nodes.map((node) => (
      <div key={node.MaKhoiKienThuc} className="mb-2">
        <div
          className={`collapse collapse-arrow shadow ${getColorClasses(
            node.CapDo
          )}`}
          onClick={() => handleExpand(node.MaKhoiKienThuc)}
        >
          <input type="checkbox" />
          <div className="collapse-title font-semibold text-base">
            {node.TenKhoiKienThuc}
            <span className="ml-2 text-sm opacity-80">
              ({node.MaKhoiKienThuc})
            </span>
          </div>
          <div className="collapse-content">
            {node.children && node.children.length > 0 && (
              <div className="ml-4">{renderTree(node.children)}</div>
            )}
            {loadingMonhoc[node.MaKhoiKienThuc] ? (
              <div className="mt-2 text-sm">Đang tải môn học...</div>
            ) : (
              renderMonhocs(node.MaKhoiKienThuc)
            )}
          </div>
        </div>
      </div>
    ));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Khối Kiến Thức & Môn Học
      </h1>
      {loading ? (
        <div className="text-lg">Đang tải khối kiến thức...</div>
      ) : (
        renderTree(buildTree(khoikienthucs))
      )}
    </div>
  );
};

export default KhoikienthucMonhocManagement;
