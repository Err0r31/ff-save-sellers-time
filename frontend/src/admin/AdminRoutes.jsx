import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import ManageServices from "./components/ManageServices/ManageServices";
import ManageCities from "./components/ManageCities/ManageCities";

export default function AdminRoutes() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route 
        path="/" 
        element={token ? <Navigate to="/admin/categories" /> : <AdminLogin />}
      />
      <Route 
        path="login" 
        element={token ? <Navigate to="/admin/categories" /> : <AdminLogin />}
      />
      <Route 
        path="categories"
        element={token ? <ManageServices /> : <Navigate to="/admin/login" />}
      />
      <Route 
        path="cities" 
        element={token ? <ManageCities /> : <Navigate to="/admin/login" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
