const express = require("express");
const router = express.Router();
const careerController = require("../controllers/careerController");

// 📌 POST: Resume improvement suggestions
router.post("/improve-resume", careerController.improveResume);

// 📌 POST: What to learn next based on skills
router.post("/what-to-learn", careerController.suggestLearningPath);

// 📌 POST: Suggest job titles based on skills
router.post("/suggest-job-titles", careerController.suggestJobTitles);

// 📌 GET: Trending tech stacks in current job market
router.get("/trending-tech-stacks", careerController.getTrendingTechStacks);

module.exports = router;
