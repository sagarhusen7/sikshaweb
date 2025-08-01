// /src/api/jobs.js

import axios from "axios";

const API_BASE = "http://localhost:5000/api/jobs";

// 🔍 Fetch jobs with search & location filters
export const getJobs = async (search, location) => {
  const response = await axios.get(API_BASE, {
    params: { search, location },
  });
  return response.data;
};

// 📌 Bookmark a job
export const bookmarkJob = async (job, userId) => {
  const response = await axios.post(`${API_BASE}/bookmark`, {
    ...job,
    userId,
  });
  return response.data;
};

// 🗃 Get bookmarked jobs for a user
export const getBookmarks = async (userId) => {
  const response = await axios.get(`${API_BASE}/bookmarks`, {
    params: { userId },
  });
  return response.data;
};

// ❌ Remove a bookmarked job
export const removeBookmark = async (jobId, userId) => {
  const response = await axios.delete(`${API_BASE}/bookmark/${jobId}`, {
    data: { userId },
  });
  return response.data;
};
