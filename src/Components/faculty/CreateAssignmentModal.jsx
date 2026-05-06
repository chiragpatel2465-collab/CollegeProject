import React, { useState, useEffect } from 'react';

export default function CreateAssignmentModal({ isOpen, onClose, onSave, editingAssignment }) {
  const [formData, setFormData] = useState({
    subject: "", batch: "", section: "", title: "", description: "",
    side: "Single side", pages: 1, dueDate: "", lastDate: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingAssignment) {
      setFormData({
        subject: editingAssignment.subjectCode,
        batch: editingAssignment.batch,
        section: editingAssignment.section,
        title: editingAssignment.title,
        description: editingAssignment.description,
        side: editingAssignment.writingFormat.side,
        pages: editingAssignment.writingFormat.pages,
        dueDate: editingAssignment.dueDate,
        lastDate: editingAssignment.lastSubmissionDate
      });
    } else {
      setFormData({ subject: "", batch: "", section: "", title: "", description: "", side: "Single side", pages: 1, dueDate: "", lastDate: "" });
    }
  }, [editingAssignment, isOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const subjectDetails = {
    "CS304": { name: "Object Oriented Programming", type: "Lecture" },
    "CS306": { name: "OOP Lab", type: "Lab" },
    "CS303T": { name: "Discrete Maths Tutorial", type: "Tutorial" }
  };

  const handleSave = () => {
    if (!formData.subject || !formData.batch || !formData.title || !formData.description || !formData.dueDate || !formData.lastDate) {
      setError("Please fill in all required fields.");
      return;
    }
    if (formData.description.length < 30) {
      setError("Description must be at least 30 characters.");
      return;
    }
    if (new Date(formData.lastDate) < new Date(formData.dueDate)) {
      setError("Last submission date cannot be earlier than the due date.");
      return;
    }
    
    setError("");
    const selectedSubject = subjectDetails[formData.subject];
    const newAssignment = {
      subjectCode: formData.subject,
      subjectName: selectedSubject.name,
      subjectType: selectedSubject.type,
      title: formData.title,
      description: formData.description,
      batch: formData.batch,
      section: formData.section || "All Sections",
      totalStudents: 32, // Dummy count
      submissionsCount: 0,
      dueDate: formData.dueDate,
      lastSubmissionDate: formData.lastDate,
      writingFormat: { side: formData.side, pages: formData.pages },
      attachments: [],
      status: "Open",
      postedOn: new Date().toISOString().split('T')[0]
    };
    onSave(newAssignment);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 font-sans backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="h-1 bg-amber-400 rounded-t-2xl shrink-0" />
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl" aria-label="Close modal">×</button>
        
        <div className="p-6 pb-4 border-b border-amber-100 shrink-0">
          <h2 className="font-serif text-3xl text-purple-900 font-bold mb-1">
            {editingAssignment ? "Edit Assignment" : "Post New Assignment"}
          </h2>
          <p className="text-slate-500 text-sm">Fill in the details below to assign work to your students</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-200">{error}</div>}

          {/* Subject */}
          <div>
            <label className="block text-sm font-bold text-purple-900 mb-1.5">Subject *</label>
            <select 
              value={formData.subject} 
              onChange={e => setFormData({...formData, subject: e.target.value})}
              className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
            >
              <option value="">Select a subject</option>
              <option value="CS304">CS304 — Object Oriented Programming</option>
              <option value="CS306">CS306 — OOP Lab</option>
              <option value="CS303T">CS303T — Discrete Maths Tutorial</option>
            </select>
            {formData.subject && (
              <div className="mt-2 bg-purple-50 border border-purple-200 rounded-xl p-3 flex items-center gap-3">
                <span className="bg-purple-200 text-purple-900 text-[10px] font-bold px-2 py-0.5 rounded">{formData.subject}</span>
                <span className="text-sm font-medium text-purple-900">{subjectDetails[formData.subject].name} ({subjectDetails[formData.subject].type})</span>
              </div>
            )}
          </div>

          {/* Batch & Section */}
          <div>
            <label className="block text-sm font-bold text-purple-900 mb-1.5">Target batch & section *</label>
            <div className="grid grid-cols-2 gap-4">
              <select value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})} className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500 outline-none">
                <option value="">Select Batch</option>
                <option value="B.Tech Sem 3">B.Tech Sem 3</option>
                <option value="B.Tech Sem 5">B.Tech Sem 5</option>
                <option value="MCA Sem 1">MCA Sem 1</option>
              </select>
              <select value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500 outline-none">
                <option value="">Select Section</option>
                <option value="Section A">Section A</option>
                <option value="Section B">Section B</option>
                <option value="All Sections">All Sections</option>
              </select>
            </div>
            {formData.batch && <p className="text-amber-600 text-xs mt-1.5 font-medium">32 students will receive this assignment</p>}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-purple-900 mb-1.5">Assignment title *</label>
            <input 
              type="text" maxLength={100} placeholder="e.g. Inheritance & Polymorphism"
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500 outline-none"
            />
            <p className="text-right text-[10px] text-slate-400 mt-1">{formData.title.length} / 100</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-purple-900 mb-1.5">Description & instructions *</label>
            <textarea 
              rows={4} maxLength={1000} placeholder="Describe the assignment in detail..."
              value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500 outline-none resize-none"
            />
            <p className={`text-right text-[10px] mt-1 ${formData.description.length > 900 ? 'text-red-500' : 'text-slate-400'}`}>
              {formData.description.length} / 1000
            </p>
          </div>

          {/* Writing Format */}
          <div>
            <label className="block text-sm font-bold text-purple-900 mb-0.5">Submission writing format *</label>
            <p className="text-xs text-slate-500 mb-3">Specify how students must write and submit the physical assignment</p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-3">
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-700 mb-2">Page format</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setFormData({...formData, side: "Single side"})} className={`px-4 py-2 rounded-full text-xs font-medium border transition ${formData.side === 'Single side' ? 'bg-purple-900 text-amber-50 border-purple-900' : 'bg-white border-amber-200 text-purple-700 hover:bg-amber-50'}`}>Single side</button>
                  <button type="button" onClick={() => setFormData({...formData, side: "Double side"})} className={`px-4 py-2 rounded-full text-xs font-medium border transition ${formData.side === 'Double side' ? 'bg-purple-900 text-amber-50 border-purple-900' : 'bg-white border-amber-200 text-purple-700 hover:bg-amber-50'}`}>Double side</button>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700 mb-2">Number of file pages</p>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setFormData({...formData, pages: Math.max(1, formData.pages - 1)})} className="w-8 h-8 rounded bg-amber-100 text-amber-800 hover:bg-amber-200 flex items-center justify-center font-bold">−</button>
                  <span className="w-8 text-center font-bold text-slate-700">{formData.pages}</span>
                  <button type="button" onClick={() => setFormData({...formData, pages: Math.min(50, formData.pages + 1)})} className="w-8 h-8 rounded bg-amber-100 text-amber-800 hover:bg-amber-200 flex items-center justify-center font-bold">+</button>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-900">
              Students must submit a minimum <strong>{formData.pages}-page</strong> assignment written on <strong>{formData.side.toLowerCase()}</strong> pages.
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-purple-900 mb-1.5">Due date *</label>
              <input type="datetime-local" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-purple-500" />
              <p className="text-[10px] text-slate-500 mt-1">Students will not be able to submit after this date</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-purple-900 mb-1.5">Last date of submission *</label>
              <input type="date" value={formData.lastDate} onChange={e => setFormData({...formData, lastDate: e.target.value})} className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-purple-500" />
            </div>
          </div>

          {/* Attachments (Dummy) */}
          <div>
            <label className="block text-sm font-bold text-purple-900 mb-0.5">
              Attachments <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded ml-2 font-normal uppercase">Optional</span>
            </label>
            <p className="text-xs text-slate-500 mb-2">Attach reference files, question papers or guidelines</p>
            <div className="border-2 border-dashed border-amber-300 rounded-xl p-5 text-center bg-amber-50 hover:bg-amber-100 transition cursor-pointer">
              <p className="text-purple-700 font-medium text-sm mb-1">Click to upload or drag & drop</p>
              <p className="text-[11px] text-slate-500">PDF, DOC, DOCX, ZIP · Max 10MB per file · Up to 5 files</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-100 flex justify-between items-center bg-gray-50 rounded-b-2xl shrink-0">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 transition">Cancel</button>
          <button onClick={handleSave} className="bg-purple-900 text-amber-50 font-semibold px-8 py-2.5 rounded-xl hover:bg-purple-800 transition text-sm shadow-sm">
            {editingAssignment ? "Save Changes" : "Post Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
}