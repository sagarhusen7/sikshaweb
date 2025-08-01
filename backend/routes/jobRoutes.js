// /routes/jobRoutes.js

const express = require('express');
const router = express.Router();
const {
  getJobs,
  bookmarkJob,
  getBookmarks,
  removeBookmark,
} = require('../controllers/jobController');

// 🔍 Get job listings from Remotive API
router.get('/', getJobs);

// 🔖 Bookmark a job
router.post('/bookmark', bookmarkJob);

// 📋 Get all bookmarked jobs for a user
router.get('/bookmarks', getBookmarks);

// ❌ Remove a bookmarked job
router.delete('/bookmark/:jobId', removeBookmark);

module.exports = router;
