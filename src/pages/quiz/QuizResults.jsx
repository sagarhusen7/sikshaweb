import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAIExplanation, fetchAIFeedback } from "../../api/ai"; // ✅ API calls


export default function QuizResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    score = 0,
    total = 0,
    selectedAnswers = {},
    quizTitle = "Quiz",
    questions = [],
    quizId = "",
  } = location.state || {};

  const [explanations, setExplanations] = useState([]);
  const [loadingExplanations, setLoadingExplanations] = useState(true);

  const [feedback, setFeedback] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(true);

  // ⛑️ Redirect if page accessed directly
  useEffect(() => {
    if (!location.state) {
      const timer = setTimeout(() => navigate("/dashboard"), 2000);
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

  // 🔹 Fetch AI-generated explanations
  useEffect(() => {
    const fetchExplanations = async () => {
      setLoadingExplanations(true);

      const results = await Promise.all(
        questions.map(async (q) => {
          if (q.explanation) return q.explanation;
          try {
            const res = await fetchAIExplanation(q.question, q.options[q.correctAnswer]);
            return res || "No explanation available.";
          } catch (err) {
            console.error("Explanation fetch error:", err);
            return "❌ Failed to generate explanation.";
          }
        })
      );

      setExplanations(results);
      setLoadingExplanations(false);
    };

    if (questions.length > 0) {
      fetchExplanations();
    }
  }, [questions]);

  // 🔹 Fetch AI-generated feedback
  useEffect(() => {
    const fetchFeedback = async () => {
      setLoadingFeedback(true);
      try {
        const res = await fetchAIFeedback({
          quizTitle,
          total,
          score,
          questions,
          selectedAnswers,
        });
        setFeedback(res || "No feedback generated.");
      } catch (err) {
        console.error("Feedback error:", err);
        setFeedback("❌ Failed to generate feedback.");
      }
      setLoadingFeedback(false);
    };

    if (questions.length > 0) {
      fetchFeedback();
    }
  }, [quizTitle, total, score, questions, selectedAnswers]);

  if (!location.state) {
    return (
      <div className="p-6 text-red-500 font-medium text-center">
        Invalid access to results page. Redirecting to dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-3xl font-extrabold mb-2 text-gray-800 tracking-tight">
        {quizTitle} - Results
      </h1>
      <p className="text-gray-600 mb-4">
        You scored{" "}
        <strong className="text-blue-600">{score}</strong> out of{" "}
        <strong>{total}</strong>
      </p>

      {/* 🔹 Feedback Section */}
      <div className="mb-10 bg-yellow-50 border border-yellow-300 p-4 rounded-xl shadow">
        <h2 className="text-lg font-bold text-yellow-800 mb-2">🧠 AI Feedback</h2>
        {loadingFeedback ? (
          <p className="text-sm italic text-gray-500">Generating feedback...</p>
        ) : (
          <p className="text-sm text-gray-700 whitespace-pre-line">{feedback}</p>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => {
          const userAnswerIdx = selectedAnswers[idx];
          const isCorrect = userAnswerIdx === q.correctAnswer;

          return (
            <div
              key={idx}
              className="p-6 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-xl text-gray-800 mb-3">
                {idx + 1}. {q.question}
              </h3>

              <ul className="space-y-2">
                {q.options.map((option, optIdx) => {
                  const isUserAnswer = userAnswerIdx === optIdx;
                  const isCorrectAnswer = q.correctAnswer === optIdx;

                  let bgClass = "border-gray-200 bg-gray-50";
                  if (isCorrectAnswer) bgClass = "border-green-500 bg-green-50 text-green-800";
                  else if (isUserAnswer) bgClass = "border-red-500 bg-red-50 text-red-800";

                  return (
                    <li
                      key={optIdx}
                      className={`p-3 rounded border flex items-center justify-between ${bgClass}`}
                    >
                      <span>{option}</span>
                      {isCorrectAnswer && (
                        <span className="text-green-600 font-semibold">✅ Correct Answer</span>
                      )}
                      {isUserAnswer && !isCorrectAnswer && (
                        <span className="text-red-600 font-semibold">❌ Your Answer</span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 text-sm text-gray-700">
                <strong className="text-gray-800">Explanation: </strong>
                {loadingExplanations ? (
                  <span className="italic text-gray-400">Loading...</span>
                ) : (
                  explanations[idx]
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center space-y-4">
        <button
          onClick={() => navigate("/quizzes")}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-300 transition-all transform hover:scale-[1.02]"
        >
          Back to Quizzes
        </button>

        <br />

        <button
          onClick={() => navigate(`/quiz/${quizId}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow focus:ring-2 focus:ring-yellow-300 transition-all transform hover:scale-[1.02]"
        >
          Retake Quiz
        </button>
      </div>



    </div>
  );
}
