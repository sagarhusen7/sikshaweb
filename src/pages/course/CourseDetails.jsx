import { useParams, useNavigate } from "react-router-dom";
import dummyCourses from "../../data/dummyCourses";
import dummyQuizzes from "../../data/dummyQuizzes";
import EnrollActions from "../../components/course/EnrollActions";
import CourseResources from "../../components/course/CourseResources";
import { Link } from "react-router-dom";

import { FaUser, FaTag, FaBook, FaChartBar } from "react-icons/fa";

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = dummyCourses.find((c) => c.id === courseId);

  if (!course) {
    return <div className="p-6 text-red-500">Course not found!</div>;
  }

  const {
    title,
    instructor,
    price,
    category,
    difficulty,
    thumbnail,
    totalLessons,
    videoUrl,
  } = course;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Side - Course Info */}
      <div className="lg:col-span-2">
        <img
          src={thumbnail}
          alt={title}
          className="rounded w-full h-64 object-cover mb-4"
        />

        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-2 flex items-center gap-2">
          <FaUser className="text-blue-500" /> {instructor}
        </p>
        <p className="text-gray-500 mb-4">
          {category} · {difficulty}
        </p>

        {/* Enroll and Wishlist Button */}
        <EnrollActions course={course} />

        {/* Description */}
        <div className="text-gray-700 mt-6 space-y-4">
          <p>
            This course covers a comprehensive curriculum to help you master{" "}
            <strong>{title}</strong>. Learn with hands-on videos and structured lessons.
          </p>
          <ul className="list-disc ml-6">
            <li>Expert-led video tutorials</li>
            <li>Real-world assignments and quizzes</li>
            <li>Lifetime access to the course</li>
            <li>Certificate on completion</li>
          </ul>
        </div>

        {/* Assignments and Notes */}
        <CourseResources />

        {/* Quiz Section */}
        {/* Assignment Section */}
     {course.quizId && (
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Assignment</h3>
        <p className="text-gray-700 mb-2">
          Test your knowledge with a quick quiz based on this course.
        </p>
        <Link
          to={`/quiz/${course.quizId}`}
          className="inline-block bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700"
        >
          Take Quiz
        </Link>
      </div>
)}

        {/* Start Learning Button */}
        <div className="mt-6">
          <button
            onClick={() => navigate(`/course-player/${course.id}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Start Learning
          </button>
        </div>
      </div>

      {/* Right Side - Course Summary */}
      <div className="bg-gray-100 p-6 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">Course Info</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center gap-2">
            <FaTag className="text-green-500" />
            <strong>Category:</strong> {category}
          </li>
          <li className="flex items-center gap-2">
            <FaChartBar className="text-purple-500" />
            <strong>Difficulty:</strong> {difficulty}
          </li>
          <li className="flex items-center gap-2">
            <FaBook className="text-yellow-500" />
            <strong>Total Lessons:</strong> {totalLessons}
          </li>
          <li className="flex items-center gap-2">
            💰 <strong>Price:</strong> ₹{price}
          </li>
        </ul>

        {/* Preview Link */}
        <div className="mt-6">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            ▶ Watch Preview on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
