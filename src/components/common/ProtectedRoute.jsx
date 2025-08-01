// src/components/common/ProtectedRoute.jsx

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Handle unauthenticated access
  if (!isAuthenticated) {
    useEffect(() => {
      toast.error("Please log in to access this page.");
    }, []);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Handle unauthorized role
  if (!allowedRoles.includes(user?.role)) {
    useEffect(() => {
      toast.error("You do not have permission to access this page.");
    }, []);
    return (
      <div className="text-center text-red-500 text-lg mt-20">
        🔒 You don't have permission to view this page.
      </div>
    );
  }

  return children;
}
