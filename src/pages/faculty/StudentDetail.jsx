// src/pages/faculty/StudentDetail.jsx
import React, { useState, useEffect } from 'react';

export default function StudentDetail({ studentId, onBack, students }) {
  const [studentData, setStudentData] = useState(students.find(s => s.id === studentId));
  const [clubStatus, setClubStatus] = useState(studentData?.clubApplication?.status || null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [successTicks, setSuccessTicks] = useState({});

  if (!studentData) return <div>Student not found.</div>;

  const showFeedback = (key) => {
    setSuccessTicks(prev => ({ ...prev, [key]: true }));
    setTimeout(() => setSuccessTicks(prev => ({ ...prev, [key]: false })), 2000);
  };

  const updateAttendance = (index, field, value) => {
    const updatedAttend = [...studentData.attendance];
    updatedAttend[index] = { ...updatedAttend[index], [field]: Number(value) };
    setStudentData({ ...studentData, attendance: updatedAttend });
  };

  const updateAssignment = (id, status, submittedOn) => {
    const updatedAssignments = studentData.assignments.map(a => 
      a.id === id ? { ...a, status, submittedOn: status === 'Submitted' ? (submittedOn || new Date().toISOString().split('T')[0]) : null } : a
    );
    setStudentData({ ...studentData, assignments: updatedAssignments });
    showFeedback(`assign-${id}`);
  };

  const overallAvg = Math.round(
    (studentData.attendance.reduce((acc, curr) => acc + curr.present, 0) / 
    studentData.attendance.reduce((acc, curr) => acc + curr.total, 0)) * 100
  );

  return (
    <div className="p-6  mt-20 font-sans max-w-5xl mx-auto">
      <h2 className="sr-only">Student detail — {studentData.name}</h2>
      
      {/* Navigation & Header */}
      <nav className="text-xs text-purple-700/60 font-medium mb-4">
        Faculty Portal &rsaquo; <button onClick={onBack} className="hover:text-purple-900 underline">View Students</button> &rsaquo; <span className="text-purple-900">{studentData.name}</span>
      </nav>

      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-yellow-700 font-bold text-sm hover:translate-x-[-4px] transition-transform">
        &larr; Back to Students
      </button>

      {/* Profile Card */}
      <div className="bg-purple-900 rounded-2xl p-6 flex flex-col md:items-center md:flex-row gap-6 shadow-xl relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-amber-400 text-purple-900 flex items-center justify-center font-bold text-3xl shadow-lg border-4 border-purple-800">
          {studentData.avatar}
        </div>
        <div className="grow">
          <h1 className="font-serif text-3xl text-amber-50">{studentData.name}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="font-mono text-xs text-purple-300">{studentData.enrollment}</span>
            <span className="bg-purple-800 text-purple-200 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">{studentData.batch}</span>
            <span className="bg-purple-800 text-purple-200 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">{studentData.section}</span>
          </div>
          <div className="flex gap-4 mt-3 text-purple-300 text-[11px]">
            <span>{studentData.email}</span>
            <span>{studentData.phone}</span>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-xl text-white font-bold text-center ${overallAvg >= 75 ? 'bg-green-500' : 'bg-red-500'}`}>
          <div className="text-[10px] uppercase opacity-80">Overall</div>
          <div className="text-xl">{overallAvg}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-10">
        
        {/* Attendance Section */}
        <section>
          <p className="text-[10px] font-bold text-yellow-600 tracking-widest uppercase">Attendance</p>
          <h3 className="font-serif text-2xl text-purple-900">Subject-wise attendance</h3>
          <div className="h-1 w-12 bg-amber-400 mt-2 mb-6"></div>
          
          {studentData.attendance.map((sub, idx) => {
            const perc = Math.round((sub.present / sub.total) * 100) || 0;
            const error = sub.present > sub.total;
            return (
              <div key={idx} className="bg-white border border-amber-200 rounded-xl p-4 mb-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="grow" >                   <div className="font-bold text-purple-900">{sub.subject}</div>
                    <div className="text-xs text-slate-500 mt-1">Present: {sub.present} / Total: {sub.total}</div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3">
                      <div className={`h-full rounded-full transition-all duration-500 ${perc >= 85 ? 'bg-green-500' : perc >= 75 ? 'bg-amber-400' : 'bg-red-500'}`} style={{ width: `${perc}%` }} />
                    </div>
                  </div>
                  
                  <div className="flex items-end gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Held</label>
                      <input type="number" min="0" className="w-16 p-2 bg-amber-50 border border-amber-100 rounded-lg text-sm" value={sub.total} onChange={(e) => updateAttendance(idx, 'total', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Attended</label>
                      <input type="number" min="0" className={`w-16 p-2 bg-amber-50 border rounded-lg text-sm ${error ? 'border-red-500' : 'border-amber-100'}`} value={sub.present} onChange={(e) => updateAttendance(idx, 'present', e.target.value)} />
                    </div>
                    <button onClick={() => !error && showFeedback(`att-${idx}`)} className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors ${error ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-amber-400 text-amber-900 hover:bg-amber-500'}`}>
                      {successTicks[`att-${idx}`] ? "✓ Updated" : "Update"}
                    </button>
                  </div>
                </div>
                {error && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase">Cannot exceed total classes</p>}
              </div>
            );
          })}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex justify-between items-center">
             <span className="text-sm text-amber-800 font-medium">Recalculated overall attendance: <span className="font-bold">{overallAvg}%</span></span>
             <span className="text-[10px] text-amber-600 italic">Changes are reflected for this session only</span>
          </div>
        </section>

        {/* Assignment Section */}
        <section>
          <p className="text-[10px] font-bold text-yellow-600 tracking-widest uppercase">Assignments</p>
          <h3 className="font-serif text-2xl text-purple-900">Assignment Status</h3>
          <div className="h-1 w-12 bg-amber-400 mt-2 mb-6"></div>
          
          {studentData.assignments.map((asm) => (
            <div key={asm.id} className="bg-white border border-amber-100 rounded-xl p-4 mb-4 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h4 className="font-serif font-bold text-purple-900">{asm.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-bold">{asm.subject}</span>
                  <span className="text-[10px] text-slate-400">Due: {asm.dueDate}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <select 
                  className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs font-bold outline-none"
                  value={asm.status}
                  onChange={(e) => updateAssignment(asm.id, e.target.value, asm.submittedOn)}
                >
                  <option>Pending</option><option>Submitted</option><option>Late</option>
                </select>
                {asm.status === 'Submitted' && (
                  <input 
                    type="date" 
                    className="bg-amber-50 border border-amber-200 rounded-lg px-2 py-2 text-xs outline-none"
                    value={asm.submittedOn || ""}
                    onChange={(e) => updateAssignment(asm.id, 'Submitted', e.target.value)}
                  />
                )}
                <button onClick={() => showFeedback(`assign-${asm.id}`)} className="bg-amber-400 text-amber-900 px-4 py-2 rounded-lg font-bold text-xs hover:bg-amber-500 transition-colors">
                  {successTicks[`assign-${asm.id}`] ? "✓ Saved" : "Save"}
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Club Section */}
        <section className="mb-12">
          <p className="text-[10px] font-bold text-yellow-600 tracking-widest uppercase">Club Application</p>
          <h3 className="font-serif text-2xl text-purple-900">Club approval</h3>
          <div className="h-1 w-12 bg-amber-400 mt-2 mb-6"></div>
          
          {!studentData.clubApplication ? (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-10 text-center">
              <p className="text-slate-500 text-sm">This student has not applied to create any club.</p>
            </div>
          ) : (
            <div className="bg-white border border-amber-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-1 bg-amber-400"></div>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-purple-900">{studentData.clubApplication.clubName}</h4>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{studentData.clubApplication.category}</span>
                      <span className="text-[10px] text-slate-400">Applied: {studentData.clubApplication.appliedOn}</span>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                    clubStatus === 'pending' ? 'bg-amber-100 text-amber-700' :
                    clubStatus === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {clubStatus}
                  </span>
                </div>

                <div className="mt-8 border-t border-amber-50 pt-6">
                  {clubStatus === 'pending' ? (
                    <>
                      {!showRejectForm ? (
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button onClick={() => setClubStatus('approved')} className="bg-green-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-green-700 transition-colors">Approve Club</button>
                          <button onClick={() => setShowRejectForm(true)} className="bg-red-50 text-red-700 border border-red-200 px-8 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-colors">Reject Club</button>
                        </div>
                      ) : (
                        <div className="bg-red-50 border border-red-100 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
                          <label className="block text-xs font-bold text-red-800 mb-2">Reason for rejection (optional)</label>
                          <textarea className="w-full p-3 bg-white border border-red-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-400" rows="3" value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} placeholder="Provide feedback to the student..." />
                          <div className="flex gap-2 mt-3">
                            <button onClick={() => setClubStatus('rejected')} className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold">Confirm Reject</button>
                            <button onClick={() => setShowRejectForm(false)} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold">Cancel</button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className={`${clubStatus === 'approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-xl p-4 flex items-center gap-3`}>
                      <span className="text-xl">{clubStatus === 'approved' ? '✓' : '✗'}</span>
                      <span className={`text-sm font-bold ${clubStatus === 'approved' ? 'text-green-800' : 'text-red-800'}`}>
                        Club application {clubStatus} successfully · {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}