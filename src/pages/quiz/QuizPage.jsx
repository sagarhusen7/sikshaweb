import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchQuizById } from "../../api/quizzes";
import { FaClock } from "react-icons/fa";

export default function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [submitting, setSubmitting] = useState(false);

  // Fetch quiz
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await fetchQuizById(quizId);
        setQuiz(data);
        setTimeLeft(data.duration || 60);
      } catch (err) {
        console.error("Failed to load quiz:", err);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId]);

  // Reset on quiz change
  useEffect(() => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
  }, [quizId]);

  // Countdown timer and auto-submit
  useEffect(() => {
    if (!quiz) return;

    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quiz]);

  // ✅ Enhanced: Validate, submit, and fetch explanations
  const handleSubmit = async () => {
    if (!quiz || !quiz.questions || submitting) return;

    const totalQuestions = quiz.questions.length;
    const answeredCount = Object.keys(selectedAnswers).length;

    if (answeredCount < totalQuestions) {
      alert("⚠️ Please answer all questions before submitting the quiz.");
      return;
    }

    setSubmitting(true);

    const score = quiz.questions.reduce((acc, q, idx) => {
      return acc + (selectedAnswers[idx] === q.correctAnswer ? 1 : 0);
    }, 0);

    // 🔁 Request AI explanation for each question
    const updatedQuestions = await Promise.all(
      quiz.questions.map(async (q) => {
        try {
          const res = await fetch("http://localhost:5000/api/ai/explanation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              question: q.question,
              correctAnswer: q.options[q.correctAnswer],
            }),
          });

          const data = await res.json();
          return { ...q, explanation: data.explanation || null };
        } catch (err) {
          console.error("AI explanation error:", err);
          return q;
        }
      })
    );

    navigate(`/quiz/${quiz.id}/results`, {
      state: {
        total: totalQuestions,
        score,
        selectedAnswers,
        quizTitle: quiz.title,
        questions: updatedQuestions,
        quizId: quiz.id,
      },
    });
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-500 font-medium text-center">
        Loading quiz...
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="p-6 text-red-500 font-medium text-center">
        Quiz not found!
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
        <div className="bubble bubble3"></div>
        <div className="bubble bubble4"></div>
        <div className="bubble bubble5"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
            {quiz.title}
          </h1>
          <div className="flex items-center gap-2 text-red-600 font-semibold px-5 py-2.5 rounded-full bg-red-100 shadow-md backdrop-blur-sm">
            <FaClock className="text-sm" /> {timeLeft}s left
          </div>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="p-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </h2>
            <p className="text-gray-900 text-xl font-bold leading-relaxed mb-6">
              {currentQuestion.question}
            </p>

            <div className="space-y-4 mt-6">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`block w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ease-in-out ${
                    selectedAnswers[currentQuestionIndex] === idx
                      ? "bg-blue-50 border-blue-400 ring-2 ring-blue-200 scale-100"
                      : "hover:bg-gray-50 border-gray-200 hover:scale-[1.01]"
                  }`}
                >
                  <span className="text-gray-800">{opt}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-50"
              >
                Previous
              </button>

              {currentQuestionIndex < quiz.questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Quiz"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bubble animation */}
      <style jsx>{`
        .bubble {
          position: absolute;
          border-radius: 50%;
          opacity: 0.2;
          filter: blur(2px);
          animation: float 20s infinite ease-in-out;
        }
        .bubble1 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, #6366f1 0%, transparent 70%);
          top: 10%;
          left: 10%;
        }
        .bubble2 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #ec4899 0%, transparent 70%);
          bottom: 20%;
          right: 15%;
        }
        .bubble3 {
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, #10b981 0%, transparent 70%);
          top: 50%;
          left: 60%;
        }
        .bubble4 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
          bottom: 5%;
          left: 30%;
        }
        .bubble5 {
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
          top: 30%;
          right: 5%;
        }
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(-30px) translateX(20px) scale(1.05);
          }
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
