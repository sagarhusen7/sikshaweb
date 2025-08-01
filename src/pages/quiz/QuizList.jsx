import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllQuizzes } from "../../api/quizzes"; // ✅ Make sure this works
import { FaRobot } from "react-icons/fa";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await fetchAllQuizzes();
        setQuizzes(data);
      } catch (err) {
        console.error("Failed to fetch quizzes:", err);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">
        📚 Available Quizzes
      </h1>

{/* // ✅ Enhanced: AI Practice Question Generator button */}
<div className="flex justify-center mt-8">
  <Link
    to="/practice"
    className="relative inline-flex items-center justify-center w-32 h-32 text-white shadow-xl transition-transform hover:scale-105"
    style={{
      background: "linear-gradient(135deg, #ec4899, #3b82f6)", // pink → blue
      clipPath:
        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    }}
  >
    <div className="flex flex-col items-center text-center px-2">
      <FaRobot className="text-1xl mb-1 drop-shadow-sm" />
      <span className="text-xs font-semibold leading-tight drop-shadow-sm">
        Generate <br /> Quiz
      </span>
    </div>
  </Link>
</div>




      {loading ? (
        <p className="text-center text-gray-500 italic">Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p className="text-center text-gray-500 italic">No quizzes available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 text-gray-800">{quiz.title}</h2>
                <p className="text-sm text-gray-500 flex items-center mb-2">
                  🕒 Duration:{" "}
                  <span className="ml-1 font-medium">{quiz.duration} seconds</span>
                </p>
                <p className="text-sm text-gray-500 flex items-center mb-4">
                  🔢 Total Questions:{" "}
                  <span className="ml-1 font-medium">{quiz.questions.length}</span>
                </p>
                <Link
                  to={`/quiz/${quiz.id}`} // ✅ FIXED: use quiz.id instead of _id
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors text-sm font-medium"
                >
                  Start Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
