import axios from "axios"; // Using plain axios

// 🔹 POST: Improve Resume
export const improveResume = async (resumeText, jobDescription = "") => {
  const res = await axios.post("/api/career/improve-resume", {
    resumeText,
    jobDescription,
  });
  return res.data;
};

// 🔹 POST: Suggest What to Learn Next
export const getLearningPath = async (skills) => {
  const res = await axios.post("/api/career/what-to-learn", {
    skills,
  });
  return res.data;
};

// 🔹 POST: Suggest Job Titles
export const getJobTitles = async (skills) => {
  const res = await axios.post("/api/career/suggest-job-titles", {
    skills,
  });
  return res.data;
};

// 🔹 GET: Trending Tech Stacks
export const getTrendingStacks = async () => {
  const res = await axios.get("/api/career/trending-tech-stacks");
  return res.data;
};
