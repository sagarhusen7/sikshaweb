import React from "react";
import { Eye, Trash2, FileText, Download } from "lucide-react";

export default function ResourceCard({ resource, onDelete }) {
  const fileUrl = resource.fileUrl;
  const fileType = resource.fileType;

  const previewableTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "text/plain",
  ];

  const isPreviewable =
    fileType && previewableTypes.includes(fileType.toLowerCase());

  const handleView = () => {
    if (isPreviewable && fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      alert("This file type can't be previewed directly. Please download it.");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition group relative">
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
          <FileText size={28} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition">
            {resource.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 capitalize">
            Type:{" "}
            {resource.type
              .replace("pyq", "Past Year")
              .replace("vvi", "VVI")
              .replace("resource", "Study Resource")}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-2 mt-4">
        {/* View Button */}
        <button
          onClick={handleView}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
        >
          <Eye size={16} /> View
        </button>

        {/* Download Button */}
        <a
          href={fileUrl}
          download={resource.title}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-full hover:bg-green-600 hover:text-white transition"
        >
          <Download size={16} /> Download
        </a>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(resource._id)} // ✅ use _id
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-full hover:bg-red-600 hover:text-white transition"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}
