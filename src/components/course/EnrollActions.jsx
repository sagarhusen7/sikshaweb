import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function EnrollActions({ course }) {
  const [wishlisted, setWishlisted] = useState(false);

  const toggleWishlist = () => {
    setWishlisted(!wishlisted);
    // Optional: handle saving wishlist to localStorage or API
  };

  const handleEnroll = () => {
    alert("Enrolled successfully!");
    // Optional: navigate or call API to enroll user
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border border-gray-200 transition-transform duration-300 hover:shadow-lg">
      <div className="text-2xl font-bold text-indigo-600 tracking-tight">
        ₹ {course.price.toLocaleString()}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleEnroll}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium 
                     shadow-md hover:from-green-600 hover:to-emerald-700 transform hover:-translate-y-0.5 
                     transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Enroll Now
        </button>

        <button
          onClick={toggleWishlist}
          className="text-red-500 text-2xl p-2 rounded-full hover:bg-red-100 
                     transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
          title="Add to Wishlist"
        >
          {wishlisted ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
}