// /src/pages/job/BookmarkedJobs.jsx

import React, { useEffect, useState } from "react";
import { getBookmarks } from "../../api/jobs";
import JobCard from "../../components/job/JobCard";

// Replace this with real user ID when auth is added
const DUMMY_USER_ID = "demo-user-123";

const BookmarkedJobs = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await getBookmarks(DUMMY_USER_ID);
      setBookmarkedJobs(res.data || []);
    } catch (error) {
      console.error("Error fetching bookmarks:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📌 Bookmarked Jobs</h1>

      {loading ? (
        <p>Loading bookmarks...</p>
      ) : bookmarkedJobs.length === 0 ? (
        <p>No bookmarked jobs found.</p>
      ) : (
        <div className="grid gap-4">
          {bookmarkedJobs.map((job) => (
            <JobCard key={job.jobId} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkedJobs;
