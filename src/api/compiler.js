import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Send code to backend for compilation
 * @param {Object} payload - { code: string, language: string, input: string }
 * @returns {Promise<Object>} - Output or error
 */
export const runCode = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/compiler/run`, payload);
    return response.data;
  } catch (error) {
    console.error("❌ Compilation error:", error);
    return {
      success: false,
      error: error.response?.data?.error || "Something went wrong.",
    };
  }
};
