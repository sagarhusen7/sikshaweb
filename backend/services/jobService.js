// /services/jobService.js

const axios = require("axios");

const JSEARCH_API_URL = "https://jsearch.p.rapidapi.com/search";
const JSEARCH_API_KEY = process.env.JSEARCH_API_KEY; // stored in .env

const fetchJobsFromRemotive = async ({ search = "", location = "", category = "" }) => {
  try {
    const queryParts = [];

    if (search) queryParts.push(search);
    if (category) queryParts.push(category);
    if (location) queryParts.push("in " + location);

    const query = queryParts.join(" ");

    const options = {
      method: "GET",
      url: JSEARCH_API_URL,
      params: {
        query,
        num_pages: 1, // Adjust as needed (free tier supports ~100 requests/month)
      },
      headers: {
        "X-RapidAPI-Key": JSEARCH_API_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);

    const jobs = response.data.data || [];

    // Normalize the structure to match your frontend expectations
    const normalizedJobs = jobs.map((job) => ({
      jobId: job.job_id,
      title: job.job_title,
      company_name: job.employer_name,
      job_type: job.job_employment_type,
      category: job.job_title, // JSearch doesn't have category, reusing title
      candidate_required_location: `${job.job_city || ""}, ${job.job_country || ""}`,
      url: job.job_apply_link,
    }));

    return normalizedJobs;
  } catch (error) {
    console.error("JSearch API error:", error.message);
    throw new Error("Unable to fetch jobs from JSearch API");
  }
};

module.exports = {
  fetchJobsFromRemotive,
};
