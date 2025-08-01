import React, { useState, useRef } from "react";
import { Pencil, Check, Upload } from "lucide-react";
import { uploadImage } from "../../api/profile";
import { toast } from "react-hot-toast";

export default function ProfileHeader({ user = {}, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const fileInputRef = useRef(null);

  const handleSave = () => {
    setIsEditing(false);
    onUpdate(editedUser);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await uploadImage(file);
      setEditedUser((prev) => ({
        ...prev,
        avatar: res.imageUrl,
      }));
      toast.success("Avatar uploaded");
    } catch (err) {
      toast.error("Avatar upload failed");
    }
  };

  // 🔧 Construct full image URL if using backend-hosted avatar
  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return "/default-avatar.png";
    return avatarPath.startsWith("/uploads")
      ? `http://localhost:5000${avatarPath}`
      : avatarPath;
  };

  return (
    <div className="relative w-full">
      <div className="backdrop-blur-md bg-white/30 border border-white/20 shadow-xl rounded-2xl p-5 flex items-center gap-5 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl transform origin-top">
        {/* Avatar */}
        <div className="relative group">
          <img
            src={getAvatarUrl(editedUser.avatar)}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover transition-transform duration-300 transform group-hover:scale-110 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
            <Upload size={14} className="text-blue-600" />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                type="text"
                className="text-xl font-semibold border-b border-gray-300 focus:outline-none mb-1 bg-transparent w-full"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                type="email"
                className="text-sm border-b border-gray-300 focus:outline-none bg-transparent w-full text-gray-600"
                value={editedUser.email}
                readOnly
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{user.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{user.email}</p>
            </>
          )}

          <span className="text-xs font-medium bg-gradient-to-r from-indigo-200 to-purple-100 text-indigo-700 px-3 py-1 rounded-full inline-block shadow-sm">
            Student
          </span>
        </div>

        {/* Edit/Save Button */}
        <div>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            >
              <Check size={16} className="inline mr-1" /> Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              <Pencil size={16} className="inline mr-1" /> Edit
            </button>
          )}
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
