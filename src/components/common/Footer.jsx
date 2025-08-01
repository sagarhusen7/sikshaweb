import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 py-12 mt-16 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-extrabold text-2xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
              SikshaWeb
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-500 max-w-xs">
              Empowering learners globally with accessible and engaging education.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/courses"
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1 transform"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1 transform"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1 transform"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="text-sm space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                Email:{" "}
                <a
                  href="mailto:contact@sikshaweb.com"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  sagarghp@gmail.com
                </a>
              </p>
              <p className="text-gray-700 dark:text-gray-300">Phone: +91-1234567890</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-gray-700 my-8"></div>

        {/* Social Media & Tagline */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex space-x-5">
            <a
              href="https://facebook.com/sikshaweb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-md"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com/sikshawebs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-md"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com/in/sagar-husen-72447a256"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-md"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://instagram.com/sikshaweb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-md"
            >
              <FaInstagram size={24} />
            </a>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-right max-w-md">
            Making learning easy, accessible, and fun — one course at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}