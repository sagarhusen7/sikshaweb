// export default function StudentDashboard() {
//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         <div className="bg-white p-4 rounded shadow">📚 Your Courses</div>
//         <div className="bg-white p-4 rounded shadow">🕒 Recently Watched</div>
//         <div className="bg-white p-4 rounded shadow">🏆 Achievements</div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';

// Reusable Components
const GlassCard = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`bg-white/80 backdrop-blur-xl border border-white/20 p-7 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const ProgressRing = ({ progress, size = 50, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(224, 231, 255, 0.5)"
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#4F46E5"
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-700 ease-out"
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dy=".3em"
        className="text-xs font-bold fill-indigo-700"
      >
        {Math.round(progress)}%
      </text>
    </svg>
  );
};

const StatBadge = ({ icon, value, label, color = "indigo" }) => (
  <div className="group text-center p-5 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
    <div className={`inline-flex w-14 h-14 bg-gradient-to-br from-${color}-500 to-${color}-600 text-white rounded-2xl items-center justify-center text-xl mb-3 shadow-md`}>
      {icon}
    </div>
    <p className="text-2xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
      {value}
    </p>
    <p className="text-gray-600 text-sm font-medium tracking-wide">{label}</p>
  </div>
);

export default function StudentDashboard() {
  const [greeting, setGreeting] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening");
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-700 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-slate-50 via-blue-25 to-indigo-100'}`}>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Dark Mode Toggle Only */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`text-sm px-4 py-2 rounded-full font-medium ${
              darkMode 
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-all duration-300 hover:scale-105`}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {greeting}, <span className="text-indigo-600">Dear Student</span>
          </h2>
          <p className="text-gray-600 mt-2">Your learning journey continues.</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

          {/* 📘 Your Courses */}
          <GlassCard delay={100} className="lg:col-span-2">
            <div className="flex items-center mb-7">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl text-white">📘</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 ml-5">Your Courses</h2>
            </div>

            <div className="space-y-7">
              {[
                { name: "Web Development 101", progress: 85 },
                { name: "Data Science Fundamentals", progress: 62 },
                { name: "UI/UX Design Pro", progress: 100 },
              ].map((course, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors duration-200">
                      {course.name}
                    </h3>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-1000 ease-out"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-5 flex-shrink-0">
                    <ProgressRing progress={course.progress} />
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 shadow-lg hover:shadow-2xl">
              View All Courses
            </button>
          </GlassCard>

          {/* 🕒 Recently Watched */}
          <GlassCard delay={200}>
            <div className="flex items-center mb-7">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl text-white">🕒</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 ml-5">Recently Watched</h2>
            </div>

            <div className="space-y-6">
              {[
                { title: "Responsive Design Tips", time: "15 min ago", duration: "23:45" },
                { title: "JavaScript Closures", time: "42 min ago", duration: "12:10" },
                { title: "Git & GitHub Crash Course", time: "1 hour ago", duration: "18:30" },
              ].map((video, i) => (
                <div key={i} className="flex items-start space-x-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-medium group-hover:text-purple-700 transition-colors duration-200 line-clamp-1">
                      {video.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">{video.time} • {video.duration} watched</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-2xl">
              Resume Watching
            </button>
          </GlassCard>
        </div>

        {/* Achievements & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Achievements */}
          <GlassCard delay={300} className="lg:col-span-2">
            <div className="flex items-center mb-7">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏆</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 ml-5">Achievements</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "First Steps", emoji: "👣", unlocked: true },
                { name: "Night Owl", emoji: "🦉", unlocked: true },
                { name: "Master Learner", emoji: "🎓", unlocked: false },
                { name: "Speed Runner", emoji: "⚡", unlocked: false },
              ].map((badge, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                    badge.unlocked
                      ? "bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100 hover:shadow-md"
                      : "bg-gray-50 border border-gray-200 opacity-60"
                  }`}
                >
                  <div className="text-3xl mb-2">{badge.emoji}</div>
                  <p className={`font-semibold ${badge.unlocked ? "text-gray-800" : "text-gray-500"}`}>
                    {badge.name}
                  </p>
                  {!badge.unlocked && (
                    <div className="mt-1 text-xs text-gray-400">Locked</div>
                  )}
                </div>
              ))}
            </div>

            <button className="mt-6 w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow">
              Earn More
            </button>
          </GlassCard>

          {/* Stats */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-6">
            <StatBadge icon="🎓" value="12" label="Courses" color="indigo" />
            <StatBadge icon="⏱️" value="48h" label="Learning Time" color="purple" />
            <StatBadge icon="📜" value="9" label="Certificates" color="green" />
            <StatBadge icon="🔥" value="7" label="Streak Days" color="red" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} pb-8 px-6`}>
        <p>Designed with care for lifelong learners. Keep going — greatness awaits. ✨</p>
      </footer>
    </div>
  );
}