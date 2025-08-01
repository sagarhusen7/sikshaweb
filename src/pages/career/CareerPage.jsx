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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-6 py-5 bg-white shadow-sm border-b border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
          <span className="text-3xl">🧠</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Career Guidance Assistant
          </span>
        </h2>
        <p className="text-gray-500 text-sm mt-1">AI-powered tools to accelerate your career growth.</p>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side - Input Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-7 flex flex-col space-y-8 overflow-y-auto max-h-full">
          {/* Improve Resume */}
          <section>
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <span className="text-lg">📄</span>
              Improve Resume
            </h4>
            <textarea
              rows="4"
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all duration-200 resize-none text-gray-700 placeholder-gray-400 text-sm"
            />
            <input
              type="text"
              placeholder="(Optional) Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm"
            />
            <button
              onClick={() => handleAction("resume")}
              disabled={loading}
              className="mt-4 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-80 disabled:cursor-not-allowed"
            >
              🚀 Improve Resume
            </button>
          </section>

          <hr className="border-gray-200" />

          {/* What to Learn Next */}
          <section>
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <span className="text-lg">📚</span>
              Suggest What to Learn Next
            </h4>
            <input
              type="text"
              placeholder="e.g., JavaScript, React, Node.js"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm"
            />
            <button
              onClick={() => handleAction("learn")}
              disabled={loading}
              className="mt-4 w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-80 disabled:cursor-not-allowed"
            >
              🌱 What to Learn
            </button>
          </section>

          <hr className="border-gray-200" />

          {/* Suggest Job Titles */}
          <section>
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <span className="text-lg">💼</span>
              Suggest Job Titles
            </h4>
            <button
              onClick={() => handleAction("titles")}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-80 disabled:cursor-not-allowed"
            >
              🔍 Suggest Job Titles
            </button>
          </section>

          <hr className="border-gray-200" />

          {/* Trending Tech Stacks */}
          <section>
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <span className="text-lg">🔥</span>
              Trending Tech Stacks
            </h4>
            <button
              onClick={() => handleAction("trending")}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-80 disabled:cursor-not-allowed"
            >
              📊 Get Trending Stacks
            </button>
          </section>
        </div>

        {/* Right Side - Output */}
        <div className="flex flex-col">
          <section className="bg-white rounded-2xl shadow-xl p-7 flex-1 flex flex-col">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <span className="text-lg">📝</span>
              Output
            </h4>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex-1 overflow-auto min-h-0">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <span className="text-blue-600 font-medium flex items-center gap-2">
                    <svg
                      className="animate-spin w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V2.5A10 10 0 002 12h2z"
                      ></path>
                    </svg>
                    Processing your request...
                  </span>
                </div>
              ) : (
                <pre className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {output || (
                    <span className="text-gray-400 italic">Your results will appear here...</span>
                  )}
                </pre>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-gray-500 text-sm bg-white border-t border-gray-200">
        Powered by AI • Built for career growth • {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default CareerFeature;