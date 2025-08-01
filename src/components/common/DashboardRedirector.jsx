// src/components/common/DashboardRedirector.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardRedirector() {
  const navigate = useNavigate();

  useEffect(() => {
    // 🔐 Get role from localStorage (replace this with Redux if needed)
    const userData = JSON.parse(localStorage.getItem("siksha_user_profile"));
    const role = userData?.role || "student"; // fallback role

    if (role === "student") navigate("/dashboard/student");
    else if (role === "instructor") navigate("/dashboard/instructor");
    else if (role === "admin") navigate("/dashboard/admin");
    else navigate("/not-found");
  }, [navigate]);

  return null; // no visible UI
}
