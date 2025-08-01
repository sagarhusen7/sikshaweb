import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// 🔍 Get user profile by email
export const getProfile = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/profile/${encodeURIComponent(email)}`);
    return response.data;
  } catch (err) {
    console.error("❌ Failed to fetch profile:", err.response?.data || err.message);
    throw err;
  }
};

// 📝 Save or update user profile
export const saveProfile = async (profileData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/profile/save`, profileData);
    return response.data;
  } catch (err) {
    console.error("❌ Failed to save profile:", err.response?.data || err.message);
    throw err;
  }
};

// 📸 Upload avatar or certificate
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file); // 🔧 backend expects field name to be "file"

    const response = await axios.post(`${API_BASE_URL}/api/profile/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    console.error("❌ Image upload failed:", err.response?.data || err.message);
    throw err;
  }
};
