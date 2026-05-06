// src/pages/faculty/ViewStudents.jsx
import React, { useState } from 'react';
import { students } from '../../data/studentsData';
import StudentDetail from './StudentDetail';

export const ViewStudentsList = ({ onViewStudent }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [batchFilter, setBatchFilter] = useState("All Batches");
  const [sectionFilter, setSectionFilter] = useState("All Sections");
  const [attendFilter, setAttendFilter] = useState("All");

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.enrollment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = batchFilter === "All Batches" || s.batch === batchFilter;
    const matchesSection = sectionFilter === "All Sections" || s.section === sectionFilter;
    const matchesAttend = attendFilter === "All" || 
                         (attendFilter === "Above 75%" ? s.overallAttendance >= 75 : s.overallAttendance < 75);
    
    return matchesSearch && matchesBatch && matchesSection && matchesAttend;
  });

  const stats = [
    { label: "Total students", value: students.length, color: "border-purple-600" },
    { label: "Low attendance (<75%)", value: students.filter(s => s.overallAttendance < 75).length, color: "border-red-500" },
    { label: "Pending club approvals", value: students.filter(s => s.clubApplication?.status === 'pending').length, color: "border-amber-500" },
    { label: "All assignments submitted", value: students.filter(s => s.assignments.every(a => a.status === 'Submitted')).length, color: "border-green-500" },
  ];

  return (
    <div className="p-6 font-sans text-slate-800">
      <h2 className="sr-only">View students page</h2>
      
      {/* Header */}
      <header className="mb-8 mt-20">
        <nav className="text-xs text-purple-700/60 font-medium mb-2">
          Faculty Portal &rsaquo; <span className="text-purple-900">View Students</span>
        </nav>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-serif text-3xl text-purple-900">View Students</h1>
            <p className="text-slate-500 text-sm mt-1">Manage attendance, assignments and club approvals</p>
            <div className="h-1 w-12 bg-amber-400 mt-3"></div>
          </div>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            {students.length} students
          </span>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className={`bg-white border border-amber-200 rounded-xl p-4 border-t-4 ${stat.color} shadow-sm`}>
            <div className="font-serif text-2xl font-bold text-purple-900">{stat.value}</div>
            <div className="text-[12px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative grow">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            type="text" 
            placeholder="Search by name or enrollment no..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-3">
          <select className="bg-white border border-amber-200 rounded-xl px-3 py-2 text-sm outline-none" value={batchFilter} onChange={(e) => setBatchFilter(e.target.value)}>
            <option>All Batches</option><option>B.Tech Sem 3</option><option>B.Tech Sem 5</option><option>MCA Sem 1</option>
          </select>
          <select className="bg-white border border-amber-200 rounded-xl px-3 py-2 text-sm outline-none" value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)}>
            <option>All Sections</option><option>Section A</option><option>Section B</option>
          </select>
          <select className="bg-white border border-amber-200 rounded-xl px-3 py-2 text-sm outline-none" value={attendFilter} onChange={(e) => setAttendFilter(e.target.value)}>
            <option>All</option><option>Above 75%</option><option>Below 75%</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-amber-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-amber-50 border-b border-amber-200">
              <tr className="text-[11px] uppercase tracking-widest text-amber-800 font-bold">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Enrollment No.</th>
                <th className="px-6 py-4">Batch & Section</th>
                <th className="px-6 py-4">Attendance</th>
                <th className="px-6 py-4">Club Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  <tr key={student.id} className="border-b border-amber-50 hover:bg-amber-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs">
                          {student.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{student.name}</div>
                          <div className="text-[10px] text-slate-400">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-purple-700">{student.enrollment}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="inline-block px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-medium w-fit">{student.batch}</span>
                        <span className="inline-block px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-medium w-fit">{student.section}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={`text-sm font-semibold ${
                          student.overallAttendance >= 85 ? 'text-green-600' : 
                          student.overallAttendance >= 75 ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {student.overallAttendance}% {student.overallAttendance < 75 && <span className="ml-1 text-[10px] bg-red-100 px-1.5 py-0.5 rounded">⚠ Low</span>}
                        </span>
                        <div className="w-[60px] h-1.5 bg-slate-100 rounded-full mt-1">
                          <div 
                            className={`h-full rounded-full ${student.overallAttendance >= 75 ? 'bg-amber-400' : 'bg-red-500'}`}
                            style={{ width: `${student.overallAttendance}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {!student.clubApplication ? (
                        <span className="text-slate-300">—</span>
                      ) : (
                        <div>
                          <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                            student.clubApplication.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            student.clubApplication.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {student.clubApplication.status}
                          </span>
                          {student.clubApplication.status === 'pending' && <p className="text-[9px] text-amber-600 mt-1">Needs review</p>}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => onViewStudent(student.id)}
                        className="bg-purple-900 text-amber-50 text-xs px-3 py-1.5 rounded-lg hover:bg-purple-800 transition-colors whitespace-nowrap"
                      >
                        View Details &rarr;
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="bg-amber-50 p-4 rounded-full mb-4">
                        <svg className="w-8 h-8 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      </div>
                      <p className="text-slate-500">No students found matching your filters</p>
                      <button 
                        onClick={() => {setSearchQuery(""); setBatchFilter("All Batches"); setSectionFilter("All Sections"); setAttendFilter("All");}}
                        className="text-purple-700 text-sm font-medium mt-2 hover:underline"
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function ViewStudentsPage() {
  const [currentPage, setCurrentPage] = useState("list");
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const goToDetail = (id) => {
    setSelectedStudentId(id);
    setCurrentPage("detail");
  };

  const goBackToList = () => {
    setSelectedStudentId(null);
    setCurrentPage("list");
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      {currentPage === "detail" ? (
        <StudentDetail 
          studentId={selectedStudentId} 
          onBack={goBackToList} 
          students={students} 
        />
      ) : (
        <ViewStudentsList onViewStudent={goToDetail} />
      )}
    </div>
  );
}