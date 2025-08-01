const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("❌ GEMINI_API_KEY not found in .env");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// ✅ Use correct model (v1 model for free tier)
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" }); // ✅ Safe and supported

// 🔹 Generate explanation
async function generateExplanation(question, correctAnswer) {
  try {
    const prompt = `Explain why the correct answer to the following multiple-choice question is correct:\n\nQuestion: ${question}\nCorrect Answer: ${correctAnswer}\n\nGive a short and beginner-friendly explanation.`;
    console.log("📨 Explanation Prompt:", prompt);

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("✅ Explanation Response:", text);
    return text;
  } catch (error) {
    console.error("❌ Error generating explanation:", error.message);
    return "⚠️ Failed to generate explanation.";
  }
}

// 🔹 Generate feedback on quiz results
async function generateFeedback(quizTitle, total, score, questions, selectedAnswers) {
  try {
    const prompt = `
Give feedback to a student who just completed a quiz titled "${quizTitle}".
They scored ${score} out of ${total}.

Here is the list of questions with the user's answers (index-based), and correct answers:
${questions.map((q, i) => {
  return `Q${i + 1}: ${q.question}
User's Answer: ${q.options[selectedAnswers[i]] || "Not Answered"}
Correct Answer: ${q.options[q.correctAnswer]}
`;
}).join("\n")}

Provide human-like constructive feedback (e.g., topics to revise, strengths, mistakes).
`;

    console.log("📨 Feedback Prompt:\n", prompt);

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("✅ Feedback Response:", text);
    return text;
  } catch (error) {
    console.error("❌ Error generating feedback:", error.message);
    return "⚠️ Failed to generate feedback.";
  }
}

// 🔹 Generate practice questions
async function generatePracticeQuestions(topic, level = "beginner") {
  try {
    const prompt = `Create 5 ${level}-level multiple-choice questions on the topic "${topic}".
Each question should include:
- The question text
- 4 options (A, B, C, D)
- The correct answer (just the letter)

Format it like:
Q1: ...
A. ...
B. ...
C. ...
D. ...
Answer: A

Q2: ...
A. ...
...
Answer: B`;

    console.log("📨 Practice Prompt:\n", prompt);

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("✅ Practice Response:", text);
    return text;
  } catch (error) {
    console.error("❌ Error generating practice questions:", error.message);
    return "⚠️ Failed to generate practice questions.";
  }
}

module.exports = {
  generateExplanation,
  generateFeedback,
  generatePracticeQuestions,
};
