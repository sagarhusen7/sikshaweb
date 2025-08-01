const {
  generateExplanation,
  generateFeedback,
  generatePracticeQuestions,
} = require("../services/geminiService");

// ✅ POST /api/ai/explanation
const getAIExplanation = async (req, res) => {
  const { question, correctAnswer } = req.body;

  if (!question || !correctAnswer) {
    return res.status(400).json({ error: "Missing question or correctAnswer" });
  }

  try {
    const explanation = await generateExplanation(question, correctAnswer);
    res.json({ explanation });
  } catch (err) {
    console.error("❌ AI Explanation Error:", err.message);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
};

// ✅ POST /api/ai/feedback
const getAIFeedback = async (req, res) => {
  const { quizTitle, total, score, questions, selectedAnswers } = req.body;

  if (!quizTitle || !questions || !selectedAnswers) {
    return res.status(400).json({ error: "Missing required quiz result data" });
  }

  // 🐞 Debugging log
  console.log("📤 AI Feedback Payload:", {
    quizTitle,
    total,
    score,
    selectedAnswers,
    questionCount: questions.length,
  });

  try {
    const feedback = await generateFeedback(
      quizTitle,
      total,
      score,
      questions,
      selectedAnswers
    );
    res.json({ feedback });
  } catch (err) {
    console.error("❌ AI Feedback Error:", err.message);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
};

// ✅ POST /api/ai/practice
const getAIPracticeQuestions = async (req, res) => {
  const { topic, level = "beginner" } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Missing topic for practice questions" });
  }

  // 🐞 Debugging log
  console.log("📤 Practice Request:", { topic, level });

  try {
    const questionsText = await generatePracticeQuestions(topic, level);
    res.json({ questions: questionsText });
  } catch (err) {
    console.error("❌ AI Practice Questions Error:", err.message);
    res.status(500).json({ error: "Failed to generate practice questions" });
  }
};

module.exports = {
  getAIExplanation,
  getAIFeedback,
  getAIPracticeQuestions,
};
