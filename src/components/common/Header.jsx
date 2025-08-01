import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const user = useSelector((state) => state.auth.user);

  return (
    <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm border-b border-gray-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="#/"
          className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
        >
          SikshaWeb
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {user ? (
            <>
              <Link to="/home" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 relative group">
                <span>Home</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/courses" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 relative group">
                <span>Courses</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/quizzes" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 relative group">
                <span>Quizzes</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 relative group">
                <span>Dashboard</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/resources" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 relative group">
                <span>Resources</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* ✅ NEW: Career Link */}
              <Link to="/career" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 relative group">
                <span>Career Assisatnt</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* ✅ Job Board */}
              <Link to="/jobs" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 relative group">
                <span>Jobs</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/jobs/bookmarks" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 relative group">
                <span>Bookmarks</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link to="/code-compiler" className="text-sm font-semibold px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-indigo-200 transition-all duration-300">
                Code Compiler
              </Link>
              <Link to="/profile" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 relative group">
                <span>Profile</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="text-sm font-medium px-4 py-1.5 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                Login
              </Link>
              <Link to="/register" className="text-sm font-medium px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-indigo-200 transition-all duration-200">
                Sign Up
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-3 bg-white/90 backdrop-blur-md rounded-b-2xl shadow-xl animate-fadeIn">
          {user ? (
            <>
              <Link to="/home" onClick={toggleMenu} className="block text-base font-medium text-gray-800 hover:text-indigo-600 py-2 transition-colors">Home</Link>
              <Link to="/courses" onClick={toggleMenu} className="block text-base font-medium text-gray-800 hover:text-indigo-600 py-2 transition-colors">Courses</Link>
              <Link to="/quizzes" onClick={toggleMenu} className="block text-base font-medium text-gray-800 hover:text-indigo-600 py-2 transition-colors">Quizzes</Link>
              <Link to="/dashboard" onClick={toggleMenu} className="block text-base font-medium text-gray-800 hover:text-indigo-600 py-2 transition-colors">Dashboard</Link>
              <Link to="/resources" onClick={toggleMenu} className="block text-base font-medium text-gray-800 hover:text-indigo-600 py-2 transition-colors">Resources</Link>

              {/* ✅ NEW: Career Link */}
              <Link to="/career" onClick={toggleMenu} className="block text-base font-medium text-gray-800 hover:text-indigo-600 py-2 transition-colors">Career</Link>

              <Link to="/jobs" onClick={toggleMenu} className="block text-base font-medium text-gray-800 hover:text-indigo-600 py-2 transition-colors">Jobs</Link>
              <Link to="/jobs/bookmarks" onClick={toggleMenu} className="block text-base font-medium text-gray-800 hover:text-indigo-600 py-2 transition-colors">Bookmarks</Link>

              <Link to="/code-compiler" onClick={toggleMenu} className="block text-base font-semibold text-indigo-600 hover:text-indigo-700 py-2 transition-colors">Code Compiler</Link>
              <Link to="/profile" onClick={toggleMenu} className="block text-base font-medium text-gray-800 hover:text-indigo-600 py-2 transition-colors">Profile</Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu} className="block text-base font-medium text-gray-800 hover:text-indigo-600 py-2 transition-colors">Login</Link>
              <Link to="/register" onClick={toggleMenu} className="block text-base font-semibold text-indigo-600 hover:text-indigo-700 py-2 transition-colors">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
