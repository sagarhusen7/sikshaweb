// /src/components/job/JobFilters.jsx

import React from "react";

const JobFilters = ({ filters, setFilters, onSearch }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <input
        type="text"
        placeholder="Search role (e.g. frontend)"
        className="border p-2 rounded w-full sm:w-auto"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      <input
        type="text"
        placeholder="Location (e.g. India)"
        className="border p-2 rounded w-full sm:w-auto"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
      />

      <button
        onClick={onSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        🔍 Search
      </button>
    </div>
  );
};

export default JobFilters;
