import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

const PublicLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [checked, setChecked] = useState(false);

  const verifyUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/verify`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsAuthenticated(true);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setChecked(true);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  if(!checked) {
    return <Outlet/>
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicLayout;
