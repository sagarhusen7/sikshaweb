const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

// ✅ Load Groq API Key
const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  throw new Error("❌ GROQ_API_KEY not found in .env");
}

// 🚀 Call Groq API (LLaMA 3)
const callCareerAI = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant for career guidance.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("🔴 Groq API Error (Career):", error.message);
    throw new Error("Failed to fetch response from Groq.");
  }
};

// 🧠 Prompt Generator
const createCareerPrompt = (type, data = {}) => {
  switch (type) {
    case "improve-resume":
      return `Improve my resume:\n\n${data.resumeText}\n\n${
        data.jobDescription ? `Target job description:\n${data.jobDescription}` : ""
      }`;

    case "learning-path":
      return `Given my current skills: ${data.skills.join(
        ", "
      )}, what should I learn next to grow in tech?`;

    case "job-titles":
      return `Based on these skills: ${data.skills.join(
        ", "
      )}, what job roles or titles should I explore?`;

    case "trending-stacks":
      return `What are the most in-demand tech stacks in the software job market right now?`;

    default:
      return "Invalid prompt type.";
  }
};

module.exports = {
  callCareerAI,
  createCareerPrompt,
};
