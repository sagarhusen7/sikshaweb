const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  explanation: { type: String },
});

const quizSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Add this for custom ID support (e.g., "quiz-html-basics")
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  questions: [questionSchema],
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
