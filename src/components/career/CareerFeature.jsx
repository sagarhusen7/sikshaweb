import React, { useState } from "react";
import {
  improveResume,
  getLearningPath,
  getJobTitles,
  getTrendingStacks,
} from "../../api/career";

const CareerFeature = () => {
  const [resumeText, setResumeText] = useState("");
  const [skills, setSkills] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAction = async (type) => {
    setLoading(true);
    setOutput("");

    try {
      let result;
      switch (type) {
        case "resume":
          result = await improveResume(resumeText, jobDescription);
          setOutput(result.suggestions || result.message);
          break;
        case "learn":
          result = await getLearningPath(skills.split(","));
          setOutput(result.learningPath || result.message);
          break;
        case "titles":
          result = await getJobTitles(skills.split(","));
          setOutput(result.jobTitles || result.message);
          break;
        case "trending":
          result = await getTrendingStacks();
          setOutput(result.stacks || result.message);
          break;
        default:
          break;
      }
    } catch (err) {
      setOutput("❌ Error occurred while fetching data.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3 mb-8">
            <span className="text-blue-600">🧠</span>
            <span>Career Guidance Assistant</span>
          </h2>

          {/* Improve Resume Section */}
          <section className="mb-10">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              📄 Improve Resume
            </h4>
            <textarea
              rows="4"
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 resize-none text-gray-700"
            />
            <input
              type="text"
              placeholder="(Optional) Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 text-gray-700"
            />
            <button
              onClick={() => handleAction("resume")}
              disabled={loading}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Improve Resume
            </button>
          </section>

          <hr className="border-gray-200 my-8" />

          {/* What to Learn Next */}
          <section className="mb-10">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              📚 Suggest What to Learn Next
            </h4>
            <input
              type="text"
              placeholder="Enter your current skills (comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 text-gray-700"
            />
            <button
              onClick={() => handleAction("learn")}
              disabled={loading}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              What to Learn
            </button>
          </section>

          <hr className="border-gray-200 my-8" />

          {/* Suggest Job Titles */}
          <section className="mb-10">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              💼 Suggest Job Titles
            </h4>
            <button
              onClick={() => handleAction("titles")}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Suggest Job Titles
            </button>
          </section>

          <hr className="border-gray-200 my-8" />

          {/* Trending Tech Stacks */}
          <section className="mb-10">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              🔥 Trending Tech Stacks
            </h4>
            <button
              onClick={() => handleAction("trending")}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Get Trending Stacks
            </button>
          </section>

          <hr className="border-gray-200 my-8" />

          {/* Output Section */}
          <section>
            <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              📝 Output:
            </h4>
            {loading ? (
              <p className="text-blue-600 font-medium">Loading...</p>
            ) : (
              <pre className="bg-gray-50 text-sm text-gray-800 p-5 rounded-lg border border-gray-200 whitespace-pre-wrap overflow-auto max-h-96">
                {output || "Your results will appear here..."}
              </pre>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CareerFeature;