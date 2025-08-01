// routes/quizRoutes.js
const express = require("express");
const router = express.Router();

const {
  getAllQuizzes,
  getQuizById,
  deleteQuiz,
} = require("../controllers/quizController");

// @route   GET /api/quizzes
router.get("/", getAllQuizzes);

// @route   GET /api/quizzes/:id
router.get("/:id", getQuizById);

// (Optional) DELETE /api/quizzes/:id
router.delete("/:id", deleteQuiz);

module.exports = router;
