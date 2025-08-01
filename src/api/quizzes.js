import axios from "axios";

// 📚 Existing Quizzes API
const API = axios.create({
  baseURL: "http://localhost:5000/api/quizzes",
  withCredentials: true,
});

// 🤖 New AI API instance
const AI = axios.create({
  baseURL: "http://localhost:5000/api/ai",
  withCredentials: true,
});

// ✅ Fetch all quizzes
export const fetchAllQuizzes = async () => {
  try {
    const res = await API.get("/");
    return res.data;
  } catch (err) {
    console.error("❌ Failed to fetch quizzes:", err);
    throw err;
  }
};

// ✅ Fetch quiz by ID
export const fetchQuizById = async (id) => {
  try {
    const res = await API.get(`/${id}`);
    return res.data;
  } catch (err) {
    console.error(`❌ Failed to fetch quiz with ID ${id}:`, err);
    throw err;
  }
};

// ✅ [AI] Generate explanation
export const fetchAIExplanation = async (question, correctAnswer) => {
  try {
    const res = await AI.post("/explanation", { question, correctAnswer });
    return res.data.explanation;
  } catch (err) {
    console.error("❌ Failed to get AI explanation:", err);
    throw err;
  }
};

// ✅ [AI] Generate feedback
export const fetchAIFeedback = async ({
  quizTitle,
  total,
  score,
  questions,
  selectedAnswers,
}) => {
  try {
    const res = await AI.post("/feedback", {
      quizTitle,
      total,
      score,
      questions,
      selectedAnswers,
    });
    return res.data.feedback;
  } catch (err) {
    console.error("❌ Failed to get AI feedback:", err);
    throw err;
  }
};

// ✅ [AI] Generate practice questions
export const fetchAIPracticeQuestions = async (topic, level = "beginner") => {
  try {
    const res = await AI.post("/practice", { topic, level });
    return res.data.questions;
  } catch (err) {
    console.error("❌ Failed to get AI practice questions:", err);
    throw err;
  }
};
