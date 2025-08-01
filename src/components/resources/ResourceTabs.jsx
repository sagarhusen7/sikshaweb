import React from "react";
import ResourceCard from "./ResourceCard";

const tabTypes = [
  { label: "Past Year Questions", type: "pyq" },
  { label: "VVI Questions", type: "vvi" },
  { label: "Study Resources", type: "resource" },
];

export default function ResourceTabs({ resources, onDelete, activeTab, setActiveTab }) {
  const filteredResources = resources.filter((res) => res.type === activeTab);

  return (
    <div className="mt-8">
      {/* Tab Switcher */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {tabTypes.map((tab) => (
          <button
            key={tab.type}
            onClick={() => setActiveTab(tab.type)}
            className={`px-6 py-2.5 text-sm rounded-full font-bold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 ring-offset-2 ${
              activeTab === tab.type
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl"
                : "bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-gray-100 hover:shadow-md"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Resource Cards Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <ResourceCard key={res._id} resource={res} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 italic text-lg">No resources in this category.</p>
        </div>
      )}
    </div>
  );
}
