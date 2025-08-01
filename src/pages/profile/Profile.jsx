import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import CertificateGallery from "../../components/profile/CertificateGallery";
import UserSettings from "../../components/profile/UserSettings";
import CertificateUploader from "../../components/profile/CertificateUploader";
import { getProfile, saveProfile, uploadImage } from "../../api/profile";
import { toast } from "react-hot-toast";

export default function Profile() {
  const email = useSelector((state) => state.auth.user?.email);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) return;

      try {
        const profile = await getProfile(email);
        // 🧼 Ensure fields like certificates/stats/settings are always available
        setUser({
          ...profile,
          certificates: profile.certificates || [],
          stats: profile.stats || {},
          settings: profile.settings || {},
        });
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [email]);

  // 🌓 Apply dark mode to <html>
  useEffect(() => {
    if (user?.settings?.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [user?.settings?.darkMode]);

  // 💾 Save profile to backend
  const handleSave = async (updatedProfile) => {
    try {
      const saved = await saveProfile(updatedProfile);
      setUser(saved.profile);
      toast.success("Profile saved!");
    } catch {
      toast.error("Failed to save profile");
    }
  };

  // 📤 Handle certificate image upload
  const handleCertificateUpload = async (fileData) => {
    try {
      const uploadRes = await uploadImage(fileData.file);
      const newCert = {
        id: Date.now(),
        title: fileData.title,
        date: new Date().toISOString(),
        imageUrl: uploadRes.imageUrl,
      };

      const updatedUser = {
        ...user,
        certificates: [newCert, ...(user.certificates || [])],
      };
      await handleSave(updatedUser);
    } catch {
      toast.error("Failed to upload certificate");
    }
  };

  // 🗑️ Delete certificate
  const handleCertificateDelete = async (idToDelete) => {
    const updatedUser = {
      ...user,
      certificates: (user.certificates || []).filter((c) => c.id !== idToDelete),
    };
    await handleSave(updatedUser);
  };

  // 🎛️ Update settings (dark mode, notifications)
  const handleSettingsChange = async (updatedSettings) => {
    const updatedUser = {
      ...user,
      settings: updatedSettings,
    };
    await handleSave(updatedUser);
  };

  // ✏️ Update name/email/avatar
  const handleUserUpdate = async (updatedUser) => {
    await handleSave(updatedUser);
  };

  if (loading) return <div className="text-center py-10 text-lg">Loading profile...</div>;
  if (!user) return <div className="text-center py-10 text-red-500">Profile not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      <ProfileHeader user={user} onUpdate={handleUserUpdate} />
      <ProfileStats stats={user.stats} certificates={user.certificates} />
      <CertificateUploader onUpload={handleCertificateUpload} />
      <CertificateGallery
        certificates={user.certificates}
        onDelete={handleCertificateDelete}
      />
      <UserSettings
        settings={user.settings}
        onChange={handleSettingsChange}
      />
    </div>
  );
}
