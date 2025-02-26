import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const verifyAccess = async () => {
      const token = localStorage.getItem('user_token');

      if (!token) {
        console.warn("🚨 No token found, redirecting to login.");
        setIsAuthorized(false); // Immediately redirect if no token
        return;
      }

      try {
        console.log("🔍 Checking authorization...");
        const response = await axios.get(`${BASE_URL}/users/verify`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status >= 200 && response.status < 300) {
          console.log("✅ Authorized!");
          setIsAuthorized(true);
        } else {
          throw new Error("Unauthorized access");
        }
      } catch (error) {
        console.error("❌ Authorization failed:", error);
        setIsAuthorized(false);
      }
    };

    verifyAccess();
  }, []);

  if (isAuthorized === null) {
    return <p>Loading...</p>; // Show loading state while verifying
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
