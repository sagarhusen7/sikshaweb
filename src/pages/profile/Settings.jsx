import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfile, saveProfile, uploadImage } from "../../api/profile";
import UserSettings from "../../components/profile/UserSettings";
import { toast } from "react-hot-toast";

export default function Settings() {
  const email = useSelector((state) => state.auth.user?.email); // 👤 From Redux
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) return;

      try {
        const profile = await getProfile(email);
        setUser(profile);
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await uploadImage(file);
      setUser((prev) => ({
        ...prev,
        avatar: res.imageUrl,
      }));
      toast.success("Avatar updated");
    } catch {
      toast.error("Avatar upload failed");
    }
  };

  const handleSettingsChange = async (newSettings) => {
    const updatedUser = {
      ...user,
      settings: newSettings,
    };

    try {
      const saved = await saveProfile(updatedUser);
      setUser(saved.profile);
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings");
    }
  };

  if (loading) return <div className="text-center py-10 text-lg">Loading profile...</div>;
  if (!user) return <div className="text-center py-10 text-red-500">Profile not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Card Container */}
      <div className="backdrop-blur-xl bg-white/80 border border-gray-200/50 rounded-3xl shadow-xl p-8 mb-10 hover:shadow-2xl transition-all duration-300 transform">
        <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
          ⚙️ Account Settings
        </h1>

        {/* Editable Form */}
        <div className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-2">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border shadow object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="text-sm mt-1"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            />
          </div>

          {/* Email (non-editable) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              readOnly
              className="w-full border rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <UserSettings settings={user.settings} onChange={handleSettingsChange} />
    </div>
  );
}
