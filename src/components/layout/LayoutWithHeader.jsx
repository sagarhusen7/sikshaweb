import Header from "../common/Header";
import Footer from "../common/Footer"; // ✅ Import Footer
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LayoutWithHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      {/* Header only for logged-in users */}
      {isAuthenticated && <Header />}

      {/* Main content */}
      <main className="flex-grow min-h-screen bg-white dark:bg-gray-900">
        <Outlet />
      </main>

      {/* Footer only for logged-in users */}
      {isAuthenticated && <Footer />}
    </>
  );
}
