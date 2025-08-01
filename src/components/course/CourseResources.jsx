import { useState } from "react";

export default function CourseResources({ courseId }) {
  const [resources, setResources] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newResources = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      description: "",
      type: getFileTypeEmoji(file.name),
    }));
    setResources((prev) => [...prev, ...newResources]);
  };

  const handleDescriptionChange = (index, value) => {
    setResources((prev) =>
      prev.map((res, i) => (i === index ? { ...res, description: value } : res))
    );
  };

  const handleDelete = (index) => {
    setResources((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileTypeEmoji = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    if (ext === "pdf") return "📄";
    if (ext === "pptx") return "📊";
    if (ext === "docx") return "📝";
    if (ext === "txt") return "📘";
    return "📁";
  };

  return (
    <div className="mt-10 border-t pt-8 border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">📚 Assignments / Notes</h3>

      {/* Upload Section */}
      <input
        type="file"
        accept=".pdf,.docx,.pptx,.txt"
        multiple
        onChange={handleUpload}
        className="mb-6 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
      />

      {/* Resources List */}
      {resources.length === 0 ? (
        <p className="text-gray-500 italic text-center py-4 bg-gray-50 rounded-lg">
          No resources uploaded yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {resources.map((res, idx) => (
            <li
              key={idx}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-all duration-200 border border-gray-100"
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{res.type}</span>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium truncate max-w-xs sm:max-w-sm md:max-w-md underline"
                  >
                    {res.name}
                  </a>
                </div>
                <div className="flex gap-4">
                  <a
                    href={res.url}
                    download={res.name}
                    className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors flex items-center gap-1"
                  >
                    📥 Download
                  </a>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors flex items-center gap-1"
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>

              <input
                type="text"
                placeholder="Add a short description..."
                value={res.description}
                onChange={(e) => handleDescriptionChange(idx, e.target.value)}
                className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm transition-shadow"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}