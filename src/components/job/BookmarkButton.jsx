// /src/components/job/BookmarkButton.jsx

import React, { useState, useEffect } from "react";
import { bookmarkJob, removeBookmark, getBookmarks } from "../../api/jobs";

// Replace this with real user ID when auth is implemented
const DUMMY_USER_ID = "demo-user-123";

const BookmarkButton = ({ job }) => {
  const [bookmarked, setBookmarked] = useState(false);

  // Check if the job is already bookmarked
  const checkBookmark = async () => {
    try {
      const res = await getBookmarks(DUMMY_USER_ID);
      const saved = res.data.find((j) => j.jobId === job.jobId);
      setBookmarked(!!saved);
    } catch (err) {
      console.error("Error checking bookmark:", err.message);
    }
  };

  useEffect(() => {
    checkBookmark();
  }, []);

  const toggleBookmark = async () => {
    try {
      if (bookmarked) {
        await removeBookmark(job.jobId, DUMMY_USER_ID);
        setBookmarked(false);
      } else {
        await bookmarkJob(job, DUMMY_USER_ID);
        setBookmarked(true);
      }
    } catch (err) {
      console.error("Error toggling bookmark:", err.message);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`text-sm px-2 py-1 rounded ${
        bookmarked ? "bg-red-200 text-red-800" : "bg-green-100 text-green-800"
      }`}
    >
      {bookmarked ? "Remove 🔖" : "Bookmark"}
    </button>
  );
};

export default BookmarkButton;
