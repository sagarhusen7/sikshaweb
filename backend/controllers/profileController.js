const UserProfile = require("../models/UserProfile");
const path = require("path");

// 🔍 GET profile by email
exports.getProfile = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    let profile = await UserProfile.findOne({ email });

    if (!profile) {
      // 🆕 Auto-create empty profile if not found
      profile = new UserProfile({
        email,
        name: "New User",
        avatar: "/default-avatar.png", // You can put a default image here
        stats: {
          coursesCompleted: 0,
          hoursStudied: 0,
          badges: 0,
        },
        certificates: [],
        settings: {
          darkMode: false,
          notifications: true,
        },
      });
      await profile.save();
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error("Error fetching profile:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// 📝 CREATE or UPDATE profile
exports.saveProfile = async (req, res) => {
  try {
    const { email, name, avatar, stats, certificates, settings } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    let profile = await UserProfile.findOne({ email });

    if (profile) {
      // update existing
      profile.name = name || profile.name;
      profile.avatar = avatar || profile.avatar;
      profile.stats = stats || profile.stats;
      profile.certificates = certificates || profile.certificates;
      profile.settings = settings || profile.settings;
    } else {
      // create new
      profile = new UserProfile({
        email,
        name: name || "New User",
        avatar: avatar || "/default-avatar.png",
        stats: stats || { coursesCompleted: 0, hoursStudied: 0, badges: 0 },
        certificates: certificates || [],
        settings: settings || { darkMode: false, notifications: true },
      });
    }

    await profile.save();
    res.status(200).json({ success: true, profile });
  } catch (err) {
    console.error("Error saving profile:", err.message);
    res.status(500).json({ error: "Failed to save profile" });
  }
};

// 📸 Upload avatar or certificate
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ success: true, imageUrl });
  } catch (err) {
    console.error("Error uploading image:", err.message);
    res.status(500).json({ error: "Upload failed" });
  }
};
