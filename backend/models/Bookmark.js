// /models/Bookmark.js

const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // assuming you have a User model
    },
    jobId: {
      type: String,
      required: true,
    },
    title: String,
    company_name: String,
    job_type: String,
    category: String,
    candidate_required_location: String,
    url: String,
    bookmarkedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
