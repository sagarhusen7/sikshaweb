export default function CourseSidebar({ lessons = [], currentLessonId, onSelect }) {
  return (
    <aside className="w-full lg:w-80 bg-white shadow-xl rounded-xl p-5 border border-gray-100 transition-all duration-200">
      <h4 className="text-xl font-bold mb-5 text-gray-800">📚 Lessons</h4>
      <ul className="space-y-2 text-sm">
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            onClick={() => onSelect(lesson.id)}
            className={`cursor-pointer p-3 rounded-lg transition-all duration-150 ease-in-out ${
              currentLessonId === lesson.id
                ? "bg-blue-100 text-blue-800 font-semibold shadow-inner"
                : "hover:bg-gray-100 hover:shadow-sm"
            }`}
          >
            {lesson.title}
          </li>
        ))}
      </ul>
    </aside>
  );
}