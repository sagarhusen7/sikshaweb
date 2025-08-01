import { useState } from "react";
import CourseCard from "../../components/course/CourseCard";
import { FaSearch } from "react-icons/fa";
import dummyCourses from "../../data/dummyCourses";

export default function CourseCatalog() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");

  const uniqueCategories = ["All", ...new Set(dummyCourses.map(course => course.category))];

  const filteredCourses = dummyCourses
    .filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty = difficulty === "All" || course.difficulty === difficulty;
      const matchesCategory = category === "All" || course.category === category;
      return matchesSearch && matchesDifficulty && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 p-6 transition-colors duration-300">
      {/* Background floating bubbles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .float-element {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-indigo-400 rounded-full opacity-20 float-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* 🔍 Filters & Search Section */}
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Explore Courses
        </h2>

        {/* Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* 🔎 Search */}
          <div className="relative col-span-2">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title..."
              className="pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white transition-all"
            />
          </div>

          {/* 🎯 Difficulty */}
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* 🗂️ Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          >
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* 🔃 Sort */}
        <div className="mb-6 flex justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all shadow-sm hover:shadow-md"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Title: A → Z</option>
            <option value="title-desc">Title: Z → A</option>
          </select>
        </div>

        {/* 📚 Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className="tilt-card perspective-1000 group transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="tilt-inner group-hover:rotate-y-2 group-hover:rotate-x-2">
                  <CourseCard course={course} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 col-span-full text-center py-10 text-lg">
              No courses found. Try adjusting your filters.
            </p>
          )}
        </div>
      </div>

      {/* 3D Tilt Card CSS */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .tilt-inner {
          transition: transform 0.6s ease;
          transform-style: preserve-3d;
        }

        .rotate-y-2 {
          transform: rotateY(2deg) rotateX(1deg);
        }

        .rotate-x-2 {
          transform: rotateX(2deg);
        }

        .tilt-inner img,
        .tilt-inner .glass-effect {
          transform: translateZ(20px);
        }
      `}</style>
    </div>
  );
}