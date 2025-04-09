import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import ManageServices from "./components/ManageServices/ManageServices";
import ManageCities from "./components/ManageCities/ManageCities";
import { useEffect, useState } from "react";

export default function AdminRoutes() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange)
  }, []);

  return (
    <Routes>
      <Route 
        path="/" 
        element={token ? <Navigate to="/admin/categories" /> : <AdminLogin setToken={setToken} />}
      />
      <Route 
        path="login" 
        element={token ? <Navigate to="/admin/categories" /> : <AdminLogin setToken={setToken} />}
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
