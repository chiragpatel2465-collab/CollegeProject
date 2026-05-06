import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users } from 'lucide-react';

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-3xl w-full text-center space-y-8">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white mb-4 shadow-sm">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-800">Welcome to Campus Hub</h1>
          <p className="text-slate-500 text-lg max-w-lg mx-auto">
            Select your academic portal to access your dashboard, schedules, and resources.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-2xl mx-auto">
          {/* Student Card */}
          <button 
            onClick={() => navigate('/student')} 
            className="group flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100 transition-all duration-200 cursor-pointer"
          >
            <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
              <GraduationCap size={28} />
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">Student Portal</h2>
            <p className="text-slate-500 text-sm">Access your timetable, grades, assignments, and attendance.</p>
          </button>

          {/* Faculty Card */}
          <button 
            onClick={() => navigate('/faculty')} 
            className="group flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-sky-100 transition-all duration-200 cursor-pointer"
          >
            <div className="h-16 w-16 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-200">
              <Users size={28} />
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">Faculty Portal</h2>
            <p className="text-slate-500 text-sm">Manage your classes, post notices, and review student progress.</p>
          </button>
        </div>
      </div>
    </div>
  );
}