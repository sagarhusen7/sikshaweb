import Resource from "../models/Resource.js";
import fs from "fs";
import path from "path";

// 📤 Upload a new resource
export const uploadResource = async (req, res) => {
  try {
    const { title, type } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 🔗 Generate full file URL (to avoid 404 in frontend)
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;

    const newResource = new Resource({
      title,
      type,
      fileUrl,
      fileType: file.mimetype,
    });

    await newResource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(500).json({ error: "Failed to upload resource" });
  }
};

// 📥 Get all resources
export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ uploadedAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
};

// ❌ Delete a resource by ID
export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findByIdAndDelete(id);

    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    // 🧹 Also delete the physical file
    const filePath = path.join("uploads", path.basename(resource.fileUrl));
    fs.unlink(filePath, (err) => {
      if (err) console.error("File delete error:", err);
    });

    res.json({ message: "Resource deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete resource" });
  }
};
