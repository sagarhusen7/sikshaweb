import { useParams } from "react-router-dom";
import { useState } from "react";
import ReactPlayer from "react-player";
import dummyCourses from "../../data/dummyCourses";
import { FaBookOpen, FaUser, FaCheckCircle } from "react-icons/fa";
import CourseResources from "../../components/course/CourseResources";


export default function CoursePlayer() {
  const { courseId } = useParams();
  const course = dummyCourses.find((c) => c.id === courseId);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  if (!course) {
    return <div className="p-6 text-red-500">Course not found!</div>;
  }

  const lessons = course.lessons || [
    {
      title: "Lesson 1: Introduction",
      videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    },
    {
      title: "Lesson 2: Tools Setup",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  const currentLesson = lessons[currentLessonIndex];
  const progressPercent = Math.round(
    (completedLessons.length / lessons.length) * 100
  );

  const handleMarkAsCompleted = () => {
    if (!completedLessons.includes(currentLessonIndex)) {
      setCompletedLessons([...completedLessons, currentLessonIndex]);
    }
  };

  const isCompleted = completedLessons.includes(currentLessonIndex);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-100px)]">
      {/* Sidebar Lessons */}
      <div className="w-full lg:w-1/4 border-r p-4 overflow-y-auto max-h-[calc(100vh-100px)]">
        <h2 className="text-xl font-semibold mb-4">Lessons</h2>
        <ul className="space-y-2">
          {lessons.map((lesson, index) => (
            <li
              key={index}
              onClick={() => setCurrentLessonIndex(index)}
              className={`cursor-pointer p-2 rounded flex items-center justify-between ${
                index === currentLessonIndex
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-blue-100"
              }`}
            >
              <span>
                {index + 1}. {lesson.title}
              </span>
              {completedLessons.includes(index) && (
                <FaCheckCircle className="text-green-500 ml-2" />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Player */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-gray-600 mb-4 flex items-center gap-2">
          <FaUser className="text-blue-500" /> {course.instructor}
        </p>

        <div className="aspect-video mb-6">
          <ReactPlayer
            url={currentLesson.videoUrl}
            width="100%"
            height="100%"
            controls
          />
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-1">
            Progress: {progressPercent}% ({completedLessons.length}/
            {lessons.length} lessons)
          </div>
          <div className="w-full bg-gray-300 h-2 rounded">
            <div
              className="h-2 bg-green-500 rounded"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Mark as Completed */}
        <div className="mb-6">
          <button
            onClick={handleMarkAsCompleted}
            disabled={isCompleted}
            className={`px-5 py-2 rounded text-white text-sm transition ${
              isCompleted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isCompleted ? "Lesson Completed ✅" : "Mark as Completed"}
          </button>
        </div>

        {/* Overview */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaBookOpen className="text-green-500" /> Course Overview
          </h3>
          <p className="text-gray-700 mb-4">
            This is a dummy description for the course. Replace this with actual
            content.
          </p>

          <h4 className="font-medium">Resources:</h4>
           <ul className="list-disc pl-6 text-gray-600">
            <li>Downloadable PDFs (coming soon)</li>
            <li>Assignments (coming soon)</li>
            <li>Notes section (Phase 4)</li>
          </ul> 
        </div>
        {/* Notes & Assignments */}
        <div className="mt-10">
          <CourseResources courseId={courseId} />
        </div>
      </div>
    </div>
  );
}
