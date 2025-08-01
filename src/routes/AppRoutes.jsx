import { Routes, Route } from "react-router-dom";

// Layout
import LayoutWithHeader from "../components/layout/LayoutWithHeader";

// Pages - Auth (no layout)
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Pages - Dashboards
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import InstructorDashboard from "../pages/dashboard/InstructorDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

// Pages - Courses
import CourseCatalog from "../pages/course/CourseCatalog";
import CourseDetails from "../pages/course/CourseDetails";
import CoursePlayer from "../pages/course/CoursePlayer";

// Pages - Quizzes
import QuizList from "../pages/quiz/QuizList";
import QuizPage from "../pages/quiz/QuizPage";
import QuizResults from "../pages/quiz/QuizResults";
import PracticeGenerator from "../pages/quiz/PracticeGenerator"; // ✅ New import

// Pages - Code
import CodeCompiler from "../pages/code/CodeCompiler";

// Pages - Resources
import ResourceLibrary from "../pages/resources/ResourceLibrary";

// Pages - Profile
import Profile from "../pages/profile/Profile";
import Settings from "../pages/profile/Settings";

// Pages - Jobs
import JobBoard from "../pages/job/JobBoard";              // ✅ NEW
import BookmarkedJobs from "../pages/job/BookmarkedJobs";  // ✅ NEW

// ✅ Career Page
import CareerPage from "../pages/career/CareerPage"; // ✅ NEW

// Misc
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/common/ProtectedRoute";
import DashboardRedirector from "../pages/dashboard/DashboardRedirector";

// Pages - Home
import LandingPage from "../pages/Home"; // Public home page
import AuthenticatedHome from "../pages/AuthenticatedHome"; // 🔐 New authenticated home page

export default function AppRoutes() {
  return (
    <Routes>
      {/* 🌐 Public Routes - No Layout */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* 🔐 Routes with Layout */}
      <Route element={<LayoutWithHeader />}>
        {/* 🔐 Authenticated Home Page */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor", "admin"]}>
              <AuthenticatedHome />
            </ProtectedRoute>
          }
        />

        {/* Dashboard Entry */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor", "admin"]}>
              <DashboardRedirector />
            </ProtectedRoute>
          }
        />

        {/* Dashboards */}
        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/instructor"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Courses */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor", "admin"]}>
              <CourseCatalog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:courseId"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor", "admin"]}>
              <CourseDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor"]}>
              <CoursePlayer />
            </ProtectedRoute>
          }
        />

        {/* Quizzes */}
        <Route
          path="/quizzes"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor"]}>
              <QuizList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:quizId"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor"]}>
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:quizId/results"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor"]}>
              <QuizResults />
            </ProtectedRoute>
          }
        />

        {/* ✅ Practice Generator Route */}
        <Route
          path="/practice"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor"]}>
              <PracticeGenerator />
            </ProtectedRoute>
          }
        />

        {/* Code Compiler */}
        <Route
          path="/code-compiler"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor"]}>
              <CodeCompiler />
            </ProtectedRoute>
          }
        />

        {/* Resources */}
        <Route
          path="/resources"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor"]}>
              <ResourceLibrary />
            </ProtectedRoute>
          }
        />

        {/* ✅ Career Page */}
        <Route
          path="/career"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor", "admin"]}>
              <CareerPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ Jobs */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor", "admin"]}>
              <JobBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/bookmarks"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor", "admin"]}>
              <BookmarkedJobs />
            </ProtectedRoute>
          }
        />

        {/* Profile & Settings */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor", "admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor", "admin"]}>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 🛑 Catch-all Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
