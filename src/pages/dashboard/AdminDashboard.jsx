// export default function AdminDashboard() {
//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         <div className="bg-white p-4 rounded shadow">👤 User Management</div>
//         <div className="bg-white p-4 rounded shadow">✅ Course Approvals</div>
//         <div className="bg-white p-4 rounded shadow">📈 Platform Analytics</div>
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
      className={`bg-white/80 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className} group`}
    >
      {children}
    </div>
  );
};

const StatBadge = ({ icon, value, label, color = "indigo", pulse = false }) => (
  <div className={`group text-center p-6 bg-white/60 backdrop-blur-sm border border-white/20 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden ${pulse ? 'animate-pulse' : ''}`}>
    {pulse && (
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-sweep"></div>
    )}
    <div className={`inline-flex w-16 h-16 bg-gradient-to-br from-${color}-500 to-${color}-700 text-white rounded-3xl items-center justify-center text-2xl mb-4 shadow-lg`}>
      {icon}
    </div>
    <p className="text-3xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
      {value}
    </p>
    <p className="text-gray-600 font-medium tracking-wide text-sm">{label}</p>
  </div>
);

// Mini Progress Bar
const ProgressBar = ({ progress, color = "from-indigo-500 to-purple-600" }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div
      className={`h-2.5 rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

export default function AdminDashboard() {
  const [greeting, setGreeting] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening");
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-700 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'}`}>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">

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
        <div className="mb-10">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-indigo-800 bg-clip-text text-transparent">
              Admin
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl">
            {greeting}, Proffessor. Maintain the platform with precision and care.
          </p>
        </div>

        {/* Core Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-9 mb-12">

          {/* 👤 User Management */}
          <GlassCard delay={100}>
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl text-white">👤</span>
              </div>
              <div className="ml-5">
                <h3 className="text-2xl font-bold text-gray-800">User Management</h3>
                <p className="text-sm text-gray-500 mt-1">3,241 total users</p>
              </div>
            </div>

            <div className="space-y-5">
              {[
                { name: "Sarah Kim", role: "Instructor", status: "Active" },
                { name: "James Lee", role: "Student", status: "Active" },
                { name: "Taylor Reed", role: "Student", status: "Suspended" },
              ].map((user, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-white/50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all duration-200">
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    user.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl">
              Manage All Users
            </button>
          </GlassCard>

          {/* ✅ Course Approvals */}
          <GlassCard delay={200}>
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl text-white">✅</span>
              </div>
              <div className="ml-5">
                <h3 className="text-2xl font-bold text-gray-800">Course Approvals</h3>
                <p className="text-sm text-gray-500 mt-1">8 pending reviews</p>
              </div>
            </div>

            <div className="space-y-5">
              {[
                { title: "Advanced React Patterns", instructor: "Prof. Lee", submissions: 12 },
                { title: "AI Ethics 101", instructor: "Dr. Patel", submissions: 8 },
                { title: "Figma Mastery", instructor: "A. Chen", submissions: 5 },
              ].map((course, i) => (
                <div key={i} className="p-4 bg-white/50 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all duration-200 cursor-pointer group">
                  <p className="font-semibold text-gray-800 group-hover:text-purple-700">
                    {course.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">by {course.instructor}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">{course.submissions} assets</span>
                    <span className="text-xs font-medium text-purple-600">Review</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl">
              View All Requests
            </button>
          </GlassCard>

          {/* 📈 Platform Analytics */}
          <GlassCard delay={300}>
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl text-white">📈</span>
              </div>
              <div className="ml-5">
                <h3 className="text-2xl font-bold text-gray-800">Platform Analytics</h3>
                <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { label: "Daily Active Users", value: "8,432", change: "+12%" },
                { label: "Course Signups", value: "1,204", change: "+8%" },
                { label: "Support Tickets", value: "47", change: "-5%" },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-white/40 rounded-2xl border border-gray-100">
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-800 font-medium">{item.label}</p>
                    <p className={`text-sm font-bold ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}
                    </p>
                  </div>
                  <ProgressBar progress={item.change.startsWith('+') ? 80 : 40} color="from-green-500 to-teal-500" />
                </div>
              ))}
            </div>

            <button className="mt-8 w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl">
              View Full Analytics
            </button>
          </GlassCard>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 mb-14">
          <StatBadge icon="👤" value="3.2K+" label="Users" color="blue" />
          <StatBadge icon="📚" value="247" label="Courses" color="purple" pulse />
          <StatBadge icon="⚡" value="99.8%" label="Uptime" color="green" />
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm tracking-wide pb-10">
          <p className="italic">
            Powering education at scale. <span className="text-indigo-600">Every action counts.</span> ✨
          </p>
        </footer>
      </main>
    </div>
  );
}