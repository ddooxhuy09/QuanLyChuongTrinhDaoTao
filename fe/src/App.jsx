import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Layout/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Home/Login/Login";
import AdminLayout from "./pages/Admin/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from "./pages/Admin/UserManagement";
import MonhocManagement from "./pages/Admin/MonhocManagement";
import KhoikienthucMonhocManagement from "./pages/Admin/KhoikienthucMonhocManagement";
import ChuongtrinhdaotaoManagement from "./pages/Admin/ChuongtrinhdaotaoManagemant/ChuongtrinhdaotaoManagemant";
import ChitietCtdt from "./pages/Admin/ChuongtrinhdaotaoManagemant/ChitietCtdt";

// 👇 Tạo component wrapper để dùng hook
const AppContent = () => {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("access_token");
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/admin" replace /> : <Login />}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["PHONGDAOTAO"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="monhoc" element={<MonhocManagement />} />
          <Route
            path="khoikienthuc-monhoc"
            element={<KhoikienthucMonhocManagement />}
          />
          <Route
            path="chuongtrinhdaotao"
            element={<ChuongtrinhdaotaoManagement />}
          />
          <Route path="chitiet-ctdt" element={<ChitietCtdt />} />
          <Route
            path="chuongtrinhdaotao"
            element={<ChuongtrinhdaotaoManagement />}
          />
        </Route>
      </Routes>

      {/* ❌ Không hiển thị Footer trong admin */}
      {!isAdminPath && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
