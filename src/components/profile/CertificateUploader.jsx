import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { toast } from "react-hot-toast"; // ✅ Unified feedback

export default function CertificateUploader({ onUpload }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !file) {
      toast.error("Please provide both title and certificate image.");
      return;
    }

    setUploading(true);

    try {
      await onUpload({ title, file });

      // 🔁 Reset form
      setTitle("");
      setFile(null);
      toast.success("Certificate uploaded!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload certificate.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 border rounded-xl shadow space-y-4"
    >
      <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
        <UploadCloud size={20} className="text-blue-600" />
        Upload New Certificate
      </h2>

      <input
        type="text"
        placeholder="Certificate Title"
        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-100 file:text-blue-700 file:rounded file:cursor-pointer hover:file:bg-blue-200"
        onChange={(e) => setFile(e.target.files[0])}
      />
      {file && (
        <p className="text-sm text-gray-500 mt-1">Selected: {file.name}</p>
      )}

      <button
        type="submit"
        disabled={uploading}
        className={`w-full px-4 py-2 rounded text-white transition-all ${
          uploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Uploading..." : "Upload Certificate"}
      </button>
    </form>
  );
}
