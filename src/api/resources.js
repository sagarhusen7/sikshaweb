import axios from "axios";

const API_BASE = "http://localhost:5000/api/resources";

// 📤 Upload a new resource (with file)
export const uploadResource = async (formData) => {
  try {
    const res = await axios.post(API_BASE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
};

// 📥 Fetch all resources
export const getResources = async () => {
  try {
    const res = await axios.get(API_BASE);
    return res.data;
  } catch (err) {
    console.error("Fetching resources failed:", err);
    throw err;
  }
};

// ❌ Delete resource by ID
export const deleteResource = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete failed:", err);
    throw err;
  }
};
