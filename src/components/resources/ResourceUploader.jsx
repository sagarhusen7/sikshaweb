import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { uploadResource } from "../../api/resources"; // ✅ new

export default function ResourceUploader({ onUpload }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("pyq");
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !file) {
      alert("Please provide a title and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("file", file);

    try {
      const newResource = await uploadResource(formData); // ✅ send to backend
      onUpload(newResource); // ✅ pass saved resource with fileUrl to parent

      // Reset form
      setTitle("");
      setType("pyq");
      setFile(null);
    } catch (err) {
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 shadow-lg mb-8 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl space-y-5"
    >
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <UploadCloud size={24} className="text-blue-600" />
        Upload New Resource
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Enter resource title..."
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none transition-shadow"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="pyq">Past Year Question</option>
          <option value="vvi">VVI Question</option>
          <option value="resource">Study Resource</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Select File</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-gradient-to-r file:from-blue-100 file:to-blue-50 file:text-blue-700 file:border file:border-gray-300 hover:file:from-blue-200 hover:file:to-blue-100 cursor-pointer"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && (
          <p className="text-sm text-gray-500 mt-1 truncate">Selected: {file.name}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Upload Resource
      </button>
    </form>
  );
}
