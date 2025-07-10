import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const verifyUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/verify`, {withCredentials: true});

      if(res.data.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    verifyUser();
  }, []);

  if(isAuthenticated === null) {
    return <div>Loading...</div>
  }

  return (
    isAuthenticated ? children : <Navigate to={"/login"} replace/>
  )
}

export default ProtectedRoute