import React, { useState } from "react";
import { BadgeCheck, Trash2, X } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CertificateGallery({ certificates, onDelete }) {
  const [previewImage, setPreviewImage] = useState(null);

  if (!certificates || certificates.length === 0) {
    return (
      <p className="text-gray-500 italic mb-4 text-center backdrop-blur-sm bg-white/30 py-6 rounded-xl border border-white/20 shadow-lg">
        No certificates earned yet. Complete courses to earn certificates!
      </p>
    );
  }

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      toast.success("Certificate deleted");
    } catch (err) {
      toast.error("Failed to delete certificate");
    }
  };

  const getImageUrl = (url) => {
    if (!url) return "/placeholder.png";
    return url.startsWith("/uploads") ? `http://localhost:5000${url}` : url;
  };

  const handleImageClick = (cert) => {
    setPreviewImage(cert);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <>
      <div className="backdrop-blur-sm bg-white/20 p-6 rounded-2xl shadow-xl border border-white/30 transition-transform duration-300 hover:scale-[1.02]">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BadgeCheck className="text-indigo-600 animate-pulse" />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Earned Certificates
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert._id || cert.id}
              className="group relative bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* 🗑️ Delete button */}
              {onDelete && (
                <button
                  onClick={() => handleDelete(cert._id || cert.id)}
                  className="absolute top-2 right-2 z-10 p-1.5 bg-white hover:bg-red-100 text-red-600 rounded-full shadow-md transition"
                  title="Delete Certificate"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <div
                className="relative h-44 overflow-hidden rounded-t-2xl cursor-pointer"
                onClick={() => handleImageClick(cert)}
              >
                <img
                  src={getImageUrl(cert.imageUrl)}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-300">
                  {cert.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {new Date(cert.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔍 Fullscreen Image Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={closePreview}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 z-10 p-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 shadow"
            >
              <X size={20} />
            </button>
            <img
              src={getImageUrl(previewImage.imageUrl)}
              alt={previewImage.title}
              className="w-full h-auto max-h-[90vh] object-contain rounded"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-3 text-lg font-semibold">
              {previewImage.title}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
