import React from "react";
import { BookOpen, Clock, Award } from "lucide-react";

export default function ProfileStats({ stats = {}, certificates = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {/* Courses Completed */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex items-center gap-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
        <div className="p-3 bg-white/70 rounded-full shadow-md">
          <BookOpen className="text-blue-600" size={28} />
        </div>
        <div>
          <h4 className="text-2xl font-extrabold text-gray-900">{stats.coursesCompleted}</h4>
          <p className="text-sm text-gray-600">Courses Completed</p>
        </div>
      </div>

      {/* Hours Studied */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex items-center gap-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
        <div className="p-3 bg-white/70 rounded-full shadow-md">
          <Clock className="text-green-600" size={28} />
        </div>
        <div>
          <h4 className="text-2xl font-extrabold text-gray-900">{stats.hoursStudied}</h4>
          <p className="text-sm text-gray-600">Hours Studied</p>
        </div>
      </div>

      {/* Certificates Earned */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex items-center gap-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
        <div className="p-3 bg-white/70 rounded-full shadow-md">
          <Award className="text-purple-600" size={28} />
        </div>
        <div>
          <h4 className="text-2xl font-extrabold text-gray-900">{certificates.length}</h4>
          <p className="text-sm text-gray-600">Certificates</p>
        </div>
      </div>
    </div>
  );
}
