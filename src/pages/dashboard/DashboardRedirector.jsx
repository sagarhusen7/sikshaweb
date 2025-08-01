// src/pages/dashboard/DashboardRedirector.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function DashboardRedirector() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // ⛔ If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Redirect based on role
  if (user.role === "admin") return <Navigate to="/dashboard/admin" replace />;
  if (user.role === "instructor") return <Navigate to="/dashboard/instructor" replace />;
  return <Navigate to="/dashboard/student" replace />;
}
