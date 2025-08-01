const { callCareerAI, createCareerPrompt } = require("../services/aiCareerService");

// 🎯 Resume Improvement
exports.improveResume = async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || resumeText.trim() === "") {
    return res.status(400).json({ error: "Resume text is required." });
  }

  try {
    const prompt = createCareerPrompt("improve-resume", { resumeText, jobDescription });
    const result = await callCareerAI(prompt);

    if (!result || typeof result !== "string") {
      return res.status(500).json({ error: "AI response was empty or invalid." });
    }

    res.json({ success: true, suggestions: result });

  } catch (err) {
    console.error("❌ Error in improveResume:", err.message || err);
    res.status(500).json({ error: err.message || "AI service error." });
  }
};

// 🎯 Suggest What to Learn Next
exports.suggestLearningPath = async (req, res) => {
  const { skills } = req.body;

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({ error: "Skills array is required." });
  }

  try {
    const prompt = createCareerPrompt("learning-path", { skills });
    const result = await callCareerAI(prompt);

    res.json({ success: true, learningPath: result });

  } catch (err) {
    console.error("❌ Error in suggestLearningPath:", err.message || err);
    res.status(500).json({ error: err.message || "AI service error." });
  }
};

// 🎯 Suggest Job Titles Based on Skills
exports.suggestJobTitles = async (req, res) => {
  const { skills } = req.body;

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({ error: "Skills array is required." });
  }

  try {
    const prompt = createCareerPrompt("job-titles", { skills });
    const result = await callCareerAI(prompt);

    res.json({ success: true, jobTitles: result });

  } catch (err) {
    console.error("❌ Error in suggestJobTitles:", err.message || err);
    res.status(500).json({ error: err.message || "AI service error." });
  }
};

// 🎯 Trending Tech Stacks in Market
exports.getTrendingTechStacks = async (req, res) => {
  try {
    const prompt = createCareerPrompt("trending-stacks");
    const result = await callCareerAI(prompt);

    res.json({ success: true, stacks: result });

  } catch (err) {
    console.error("❌ Error in getTrendingTechStacks:", err.message || err);
    res.status(500).json({ error: err.message || "AI service error." });
  }
};
