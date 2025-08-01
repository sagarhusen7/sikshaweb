// /api/ai.js
import axios from "axios";

const AI_API = axios.create({
  baseURL: "http://localhost:5000/api/ai",
  withCredentials: true,
});

export const fetchAIExplanation = async (question, correctAnswer) => {
  const res = await AI_API.post("/explanation", { question, correctAnswer });
  return res.data.explanation;
};

export const fetchAIFeedback = async ({ quizTitle, total, score, questions, selectedAnswers }) => {
  const res = await AI_API.post("/feedback", {
    quizTitle,
    total,
    score,
    questions,
    selectedAnswers,
  });
  return res.data.feedback;
};

export const fetchAIPracticeQuestions = async (topic, level = "beginner") => {
  const res = await AI_API.post("/practice", { topic, level });
  return res.data.questions;
};
