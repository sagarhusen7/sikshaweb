// server.js (CommonJS version)
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

const connectDB = require("./config/db");

// ✅ Load env vars
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ✅ Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(uploadsDir));

// ✅ Import all route files
const authRoutes = require("./routes/authRoutes");
const compilerRoutes = require("./routes/compilerRoutes");
const profileRoutes = require("./routes/profileRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const quizRoutes = require("./routes/quizRoutes");
const aiRoutes = require("./routes/aiRoutes");
const jobRoutes = require("./routes/jobRoutes");
const careerRoutes = require("./routes/careerRoutes");

// ✅ Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/compiler", compilerRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/career", careerRoutes); // ✅ Career route mounted correctly

// ✅ Root endpoint
app.get("/", (req, res) => {
  res.send("🟢 Backend is running...");
});

// ✅ 404 Handler (must be after all valid routes)
app.use((req, res, next) => {
  console.log(`❌ 404 - ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Route not found" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
