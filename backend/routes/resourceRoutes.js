const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  uploadResource,
  getAllResources,
  deleteResource,
} = require("../controllers/resourceController");

const router = express.Router();

// Configure Multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store files in /uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("file"), uploadResource);     // ➕ Upload resource
router.get("/", getAllResources);                            // 📥 Get all resources
router.delete("/:id", deleteResource);                       // ❌ Delete resource

module.exports = router; // ✅ CommonJS export for server.js
