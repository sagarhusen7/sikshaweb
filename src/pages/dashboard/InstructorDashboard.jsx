// export default function InstructorDashboard() {
//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Instructor Dashboard</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         <div className="bg-white p-4 rounded shadow">📖 Manage Courses</div>
//         <div className="bg-white p-4 rounded shadow">👥 Enrolled Students</div>
//         <div className="bg-white p-4 rounded shadow">📊 Quiz Performance</div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';

// Custom SVG Icons
const IconBook = () => (
  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconUsers = () => (
  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.879-1.13M15 14a3 3 0 01-3 3H4a3 3 0 01-3-3v-4a3 3 0 013-3h.879a3 3 0 015.121 1.13M15 14a3 3 0 003 3h2a3 3 0 003-3v-4a3 3 0 00-3-3h-2a3 3 0 00-3 3" />
  </svg>
);

const IconChart = () => (
  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

// Premium Glass Card
const GlassCard = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`relative bg-white/70 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className} group`}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      {children}
    </div>
  );
};

// Stat Badge with Pulse
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

export default function InstructorDashboard() {
  const [greeting, setGreeting] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [stats] = useState({
    courses: 8,
    students: "1,247",
    rating: "4.92",
  });

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening");
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-700 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'}`}>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Dark Mode Toggle Only (Top Right) */}
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

        {/* Dashboard Header */}
        <div className="mb-10">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-indigo-800 bg-clip-text text-transparent">
              Instructor
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl">
            Monitor course performance, student progress, and your impact as an educator.
          </p>
        </div>

        {/* Core Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-9 mb-12">

          {/* 📖 Manage Courses */}
          <GlassCard delay={100}>
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <IconBook />
              </div>
              <div className="ml-5">
                <h3 className="text-2xl font-bold text-gray-800">Manage Courses</h3>
                <p className="text-sm text-gray-500 mt-1">{stats.courses} active courses</p>
              </div>
            </div>

            <div className="space-y-5">
              {[
                { title: "Web Development 101", students: "245", progress: 92 },
                { title: "UI/UX Design Pro", students: "189", progress: 88 },
                { title: "Advanced React", students: "87", progress: 45 },
              ].map((course, i) => (
                <div key={i} className="p-4 bg-white/50 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all duration-200">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-800">{course.title}</p>
                    <span className="text-xs font-medium text-teal-700 bg-teal-100 px-2.5 py-1 rounded-full">
                      {course.students} 👥
                    </span>
                  </div>
                  <ProgressBar progress={course.progress} color="from-teal-500 to-blue-500" />
                  <p className="text-xs text-gray-500 mt-1">{course.progress}% average completion</p>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-3xl">
              + Create New Course
            </button>
          </GlassCard>

          {/* 👥 Enrolled Students */}
          <GlassCard delay={200}>
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <IconUsers />
              </div>
              <div className="ml-5">
                <h3 className="text-2xl font-bold text-gray-800">Top Students</h3>
                <p className="text-sm text-gray-500 mt-1">High performers this week</p>
              </div>
            </div>

            <div className="space-y-5">
              {[
                { name: "Sarah Kim", course: "Web Dev", progress: 98, avatarColor: "from-indigo-500 to-purple-600" },
                { name: "James Lee", course: "UI/UX", progress: 94, avatarColor: "from-green-500 to-teal-600" },
                { name: "Taylor Reed", course: "React", progress: 91, avatarColor: "from-orange-500 to-red-600" },
              ].map((student, i) => (
                <div key={i} className="flex items-center space-x-4 group hover:bg-white/60 p-3 rounded-2xl transition-all duration-200 cursor-pointer">
                  <div className={`w-12 h-12 bg-gradient-to-br ${student.avatarColor} rounded-full flex items-center justify-center text-white font-medium shadow`}>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 group-hover:text-indigo-700">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.course} • Top 5%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600">{student.progress}%</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-3xl">
              View All Students
            </button>
          </GlassCard>

          {/* 📊 Quiz Performance */}
          <GlassCard delay={300}>
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <IconChart />
              </div>
              <div className="ml-5">
                <h3 className="text-2xl font-bold text-gray-800">Quiz Insights</h3>
                <p className="text-sm text-gray-500 mt-1">Average performance trends</p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { quiz: "HTML Basics", avg: 88, color: "from-green-500 to-teal-500" },
                { quiz: "CSS Flexbox", avg: 76, color: "from-yellow-400 to-orange-500" },
                { quiz: "JS Functions", avg: 69, color: "from-orange-500 to-red-600" },
              ].map((q, i) => (
                <div key={i} className="p-5 bg-white/40 rounded-2xl border border-gray-100">
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold text-gray-800">{q.quiz}</p>
                    <p className={`font-bold ${q.avg > 80 ? 'text-green-600' : q.avg > 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {q.avg}%
                    </p>
                  </div>
                  <ProgressBar progress={q.avg} color={q.color} />
                  <p className="text-xs text-gray-500 mt-2">💡 Consider review session</p>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-3xl">
              Deep Dive Analytics
            </button>
          </GlassCard>
        </div>

        {/* Premium Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 mb-14">
          <StatBadge icon="📚" value={stats.courses} label="Courses" color="blue" />
          <StatBadge icon="🎓" value={stats.students} label="Students" color="purple" pulse />
          <StatBadge icon="⭐" value={stats.rating} label="Avg. Rating" color="yellow" />
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm tracking-wide pb-10">
          <p className="italic">
            Designed with precision for educators who shape the future. <span className="text-indigo-600">Keep inspiring.</span> ✨
          </p>
        </footer>
      </main>
    </div>
  );
}