import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  const progressPercent = Math.round(
    (course.completedLessons / course.totalLessons) * 100
  );

  return (
    <div className="group tilt-card perspective-1000 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Card Inner for 3D Tilt */}
      <div className="tilt-inner group-hover:rotate-y-2 group-hover:rotate-x-1 transition-transform duration-500 ease-out">
        {/* Course Thumbnail */}
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              {course.title}
            </h3>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 text-indigo-700 dark:text-indigo-300">
              {course.difficulty}
            </span>
          </div>

          {/* Instructor */}
          <p className="text-sm text-gray-600 dark:text-gray-400">{course.instructor}</p>

          {/* Price */}
          <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">₹{course.price}</p>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {progressPercent}% Completed
            </p>
          </div>

          {/* Links */}
          <div className="mt-4 space-y-2">
            {/* View Details */}
            <Link
              to={`/courses/${course.id}`}
              className="block text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            >
              View Details →
            </Link>

            {/* Start Learning Button */}
            <Link
              to={`/course/${course.id}`}
              className="block text-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm py-2.5 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}