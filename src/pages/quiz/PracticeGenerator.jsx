import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import axios from "axios";

export default function PracticeGenerator() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("beginner");
  const [loading, setLoading] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic) return alert("Please enter a topic");

    try {
      setLoading(true);
      setGeneratedQuestions("");

      const res = await axios.post("http://localhost:5000/api/ai/practice", {
        topic,
        level,
      });

      setGeneratedQuestions(res.data.questions);
    } catch (err) {
      console.error("❌ Failed to generate practice questions:", err);
      alert("Something went wrong while generating questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        🧠 AI Practice Question Generator
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-6 border border-gray-200"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">Topic:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. JavaScript, CSS, Git"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Difficulty:</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-all"
        >
          {loading ? "Generating..." : "Generate Practice Questions"}
        </button>
      </form>

      {generatedQuestions && (
        <div className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow whitespace-pre-wrap text-gray-800 font-mono text-sm">
          {generatedQuestions}
        </div>
      )}


<div className="text-center">
  <Link
    to="/quizzes"
    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-300 transition-all transform hover:scale-[1.02]"
  >
    <FaArrowLeft className="mr-2" />
    Back to Quizzes_Page
  </Link>
</div>

    </div>
  );
}
