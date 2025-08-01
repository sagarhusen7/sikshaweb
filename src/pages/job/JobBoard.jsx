// /src/pages/job/JobBoard.jsx

import React, { useEffect, useState } from "react";
import { getJobs } from "../../api/jobs";
import JobCard from "../../components/job/JobCard";
import JobFilters from "../../components/job/JobFilters";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "intern",
    location: "india",
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getJobs(filters.search, filters.location);
      setJobs(response.data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🎯 Internship & Job Board</h1>

      {/* 🔍 Filters */}
      <JobFilters filters={filters} setFilters={setFilters} onSearch={fetchJobs} />

      {/* 📋 Job List */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <JobCard key={job.jobId} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobBoard;
