// /controllers/jobController.js

const Bookmark = require("../models/Bookmark");
const { fetchJobsFromRemotive } = require("../services/jobService");

// ✅ Already existing
const getJobs = async (req, res) => {
  try {
    const { search, location, category } = req.query;
    const jobs = await fetchJobsFromRemotive({ search, location, category });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
};

// ✅ 1. Bookmark a job
const bookmarkJob = async (req, res) => {
  try {
    const userId = req.body.userId; // Normally from auth token, simplified here
    const jobData = req.body;

    const exists = await Bookmark.findOne({ userId, jobId: jobData.jobId });
    if (exists) {
      return res.status(400).json({ success: false, message: "Job already bookmarked" });
    }

    const bookmark = new Bookmark({ ...jobData, userId });
    await bookmark.save();

    res.status(201).json({ success: true, message: "Job bookmarked", data: bookmark });
  } catch (error) {
    console.error("Bookmark error:", error.message);
    res.status(500).json({ success: false, message: "Failed to bookmark job" });
  }
};

// ✅ 2. Get all bookmarks for a user
const getBookmarks = async (req, res) => {
  try {
    const userId = req.query.userId; // Normally from token
    const bookmarks = await Bookmark.find({ userId }).sort({ bookmarkedAt: -1 });
    res.status(200).json({ success: true, data: bookmarks });
  } catch (error) {
    console.error("Fetch bookmarks error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch bookmarks" });
  }
};

// ✅ 3. Remove a bookmark
const removeBookmark = async (req, res) => {
  try {
    const userId = req.query.userId; // Normally from token
    const jobId = req.params.jobId;

    const result = await Bookmark.findOneAndDelete({ userId, jobId });

    if (!result) {
      return res.status(404).json({ success: false, message: "Bookmark not found" });
    }

    res.status(200).json({ success: true, message: "Bookmark removed" });
  } catch (error) {
    console.error("Remove bookmark error:", error.message);
    res.status(500).json({ success: false, message: "Failed to remove bookmark" });
  }
};

module.exports = {
  getJobs,
  bookmarkJob,
  getBookmarks,
  removeBookmark,
};
