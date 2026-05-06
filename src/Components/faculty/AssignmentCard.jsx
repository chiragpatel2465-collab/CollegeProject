import React, { useState } from 'react';

export default function AssignmentCard({ assignment, onViewSubmissions, onEdit, onDelete }) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // Subject badge colors
  const subjectColors = {
    Lecture: 'bg-purple-100 text-purple-800',
    Lab: 'bg-amber-100 text-amber-800',
    Tutorial: 'bg-teal-100 text-teal-800'
  };

  // Status badge colors
  const statusColors = {
    Open: 'bg-green-100 text-green-800',
    Closed: 'bg-gray-100 text-gray-600',
    Overdue: 'bg-red-100 text-red-800'
  };

  // Due date logic
  const getDueDateStatus = (dueDateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dueDateStr);
    dueDate.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: `Overdue by ${Math.abs(diffDays)} days`, style: 'text-red-600 font-bold', showDot: false };
    if (diffDays === 0) return { text: 'Due today', style: 'text-red-600 font-bold', showDot: true };
    if (diffDays === 1) return { text: 'Due tomorrow', style: 'text-amber-600 font-bold', showDot: false };
    if (diffDays <= 3) return { text: `Due in ${diffDays} days`, style: 'text-amber-600 font-medium', showDot: false };
    
    return { 
      text: new Date(dueDateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), 
      style: 'text-slate-500', 
      showDot: false 
    };
  };

  const dueStatus = getDueDateStatus(assignment.dueDate);
  const progressPercent = Math.round((assignment.submissionsCount / assignment.totalStudents) * 100);

  return (
    <div className="bg-white border border-amber-100 rounded-xl p-5 hover:border-purple-200 hover:shadow-sm transition font-sans flex flex-col h-full">
      
      {/* Top Row */}
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${subjectColors[assignment.subjectType] || 'bg-slate-100 text-slate-800'}`}>
          {assignment.subjectCode} · {assignment.subjectType}
        </span>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[assignment.status]}`}>
          {assignment.status}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 mb-4">
        <h3 className="font-serif font-bold text-purple-900 text-[17px] leading-tight mb-1">{assignment.title}</h3>
        <p className="text-slate-500 text-[13px] line-clamp-2 mb-2">{assignment.description}</p>
        <p className="text-slate-400 text-[11px] mb-1">{assignment.batch} · {assignment.section} · {assignment.totalStudents} students</p>
        <p className="text-amber-600 text-[11px] font-medium">{assignment.writingFormat.side} · {assignment.writingFormat.pages} pages minimum</p>
      </div>

      {/* Due Date Row */}
      <div className="flex justify-between items-center mb-3 text-sm">
        <span className="text-slate-500">Last date of submission</span>
        <div className="flex items-center gap-1.5">
          {dueStatus.showDot && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
          <span className={dueStatus.style}>{dueStatus.text}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-end mb-1">
          <span className="text-sm font-medium text-slate-700">Submissions</span>
          <span className="text-sm font-bold text-amber-600">{assignment.submissionsCount} / {assignment.totalStudents}</span>
        </div>
        <div className="bg-amber-100 rounded-full h-2 w-full overflow-hidden">
          <div className="bg-purple-600 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="text-[11px] text-slate-400 mt-1">{progressPercent}% submitted</p>
      </div>

      {/* Action Row */}
      <div className="pt-3 border-t border-amber-100 mt-auto">
        {isConfirmingDelete ? (
          <div className="flex items-center justify-between bg-red-50 p-2 rounded-lg border border-red-100">
            <span className="text-xs text-red-700 font-medium">Are you sure?</span>
            <div className="flex gap-2">
              <button onClick={() => setIsConfirmingDelete(false)} className="text-xs px-2 py-1 bg-white border border-red-200 rounded text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={() => onDelete(assignment.id)} className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">Yes, delete</button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <button onClick={() => onViewSubmissions(assignment)} className="text-sm font-semibold text-purple-600 hover:text-purple-800 hover:underline">
              View submissions &rarr;
            </button>
            <div className="flex gap-2">
              <button onClick={() => onEdit(assignment)} aria-label="Edit assignment" className="bg-amber-100 text-amber-800 p-2 rounded-lg hover:bg-amber-200 transition">
                ✏️
              </button>
              <button onClick={() => setIsConfirmingDelete(true)} aria-label="Delete assignment" className="bg-red-100 text-red-700 p-2 rounded-lg hover:bg-red-200 transition">
                🗑️
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}