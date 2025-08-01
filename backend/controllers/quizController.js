// controllers/quizController.js
const Quiz = require("../models/Quiz");

// @desc Get all quizzes (for quiz list)
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().select("id title duration questions");
    res.json(quizzes);
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
};

// @desc Get a single quiz by custom ID (e.g., "quiz-html-basics")
const getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findOne({ id });
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.json(quiz);
  } catch (err) {
    console.error("Error fetching quiz by ID:", err);
    res.status(500).json({ error: "Failed to fetch quiz" });
  }
};

// @desc Delete a quiz by custom ID (optional)
const deleteQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Quiz.findOneAndDelete({ id });
    if (!result) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    console.error("Error deleting quiz:", err);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
};

// Export the controller functions
module.exports = {
  getAllQuizzes,
  getQuizById,
  deleteQuiz,
};
