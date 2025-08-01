import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./store/slices/authSlice";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import ChatBot from "./components/chat/ChatBot";

export default function App() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedUser = localStorage.getItem("siksha_user");
    const storedToken = localStorage.getItem("siksha_token");

    if (storedUser && storedToken && !user) {
      dispatch(loginSuccess({ user: JSON.parse(storedUser), token: storedToken }));
    }
  }, [dispatch, user, token]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <AppRoutes />
             {/* ✅ Always visible */}
        <ChatBot />    {/* ✅ Always visible */}
      </div>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}
