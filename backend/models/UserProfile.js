// models/UserProfile.js
const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  imageUrl: { type: String, required: true },
});

const userProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String }, // URL to uploaded avatar image
  stats: {
    coursesCompleted: { type: Number, default: 0 },
    hoursStudied: { type: Number, default: 0 },
    badges: { type: Number, default: 0 },
  },
  certificates: [certificateSchema],
  settings: {
    darkMode: { type: Boolean, default: false },
    notifications: { type: Boolean, default: true },
  },
}, {
  timestamps: true,
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
module.exports = UserProfile;
