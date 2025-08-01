// routes/aiRoutes.js
const express = require("express");
const router = express.Router();

const {
  getAIExplanation,
  getAIFeedback,
  getAIPracticeQuestions,
} = require("../controllers/aiController");

// ✅ Generate explanation for a question
// POST /api/ai/explanation
router.post("/explanation", getAIExplanation);

// ✅ Generate feedback after quiz results
// POST /api/ai/feedback
router.post("/feedback", getAIFeedback);

// ✅ Generate practice questions
// POST /api/ai/practice
router.post("/practice", getAIPracticeQuestions);

module.exports = router;
