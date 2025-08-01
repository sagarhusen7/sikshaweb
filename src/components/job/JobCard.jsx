// /src/components/job/JobCard.jsx

import React from "react";
import BookmarkButton from "./BookmarkButton";

const JobCard = ({ job }) => {
  return (
    <div 
      className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg hover:shadow-2xl 
                 transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-[1.02] 
                 overflow-hidden ring-1 ring-black/5 dark:ring-white/10"
    >
      {/* Card Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-5">
          {/* Job Info */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 leading-tight mb-1.5">
              {job.title}
            </h2>
            <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-1">
              {job.company_name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-blue-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.6} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 11.314z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.6} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
              {job.candidate_required_location || "Any Location"}
            </p>
          </div>

          {/* Bookmark Button */}
          <div className="shrink-0 ml-3 transform transition-transform hover:scale-110">
            <BookmarkButton job={job} />
          </div>
        </div>

        {/* Apply Button - Glassy & Glowing */}
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block text-center py-3 text-white font-semibold rounded-xl 
                     bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 
                     hover:from-blue-600 hover:via-purple-600 hover:to-pink-600
                     shadow-lg hover:shadow-xl
                     transition-all duration-300 transform hover:scale-105
                     relative overflow-hidden group"
        >
          {/* Shine Effect */}
          <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></span>
          <span className="relative z-10">🚀 Apply Now</span>
        </a>
      </div>
    </div>
  );
};

export default JobCard;