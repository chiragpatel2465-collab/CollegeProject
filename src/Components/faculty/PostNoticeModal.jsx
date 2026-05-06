import React, { useState, useEffect } from 'react';

export default function PostNoticeModal({ isOpen, onClose, onSubmit, editingNotice }) {
  const [form, setForm] = useState({
    title: "",
    category: "General",
    body: "",
    audienceType: "All Students",
    targetBatch: "B.Tech Sem 3",
    targetSection: "Section A",
    pinned: false,
  });

  const [errors, setErrors] = useState({});


  
  // 1. Inside your form state, add:
// file: editingNotice?.file || null

// 2. Add these helper functions inside the component:
const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    // Check file size (e.g., 5MB limit)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, file: "File size must be less than 5MB" }));
      return;
    }
    setForm({ ...form, file: selectedFile });
    setErrors(prev => ({ ...prev, file: null }));
  }
};

const removeFile = () => {
  setForm({ ...form, file: null });
};

// 3. Place this JSX section after the "Notice Content" textarea and before "Target Audience"

  useEffect(() => {
    if (editingNotice) {
      setForm({
        ...editingNotice,
        audienceType: editingNotice.target === "All Students" 
          ? "All Students" 
          : editingNotice.targetSection === "All Sections" 
          ? "Specific Batch" 
          : "Specific Batch & Section"
      });
    } else {
      setForm({
        title: "",
        category: "General",
        body: "",
        audienceType: "All Students",
        targetBatch: "B.Tech Sem 3",
        targetSection: "Section A",
        pinned: false,
      });
    }
    setErrors({});
  }, [editingNotice, isOpen]);

  // Handle Escape Key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const e = {};
    if (!form.title || form.title.length < 5) e.title = "Title must be at least 5 characters";
    if (form.title.length > 120) e.title = "Title cannot exceed 120 characters";
    if (!form.body || form.body.length < 20) e.body = "Content must be at least 20 characters";
    if (form.body.length > 1000) e.body = "Content cannot exceed 1000 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    let targetText = "All Students";
    let finalBatch = "All Batches";
    let finalSection = "All Sections";

    if (form.audienceType === "Specific Batch") {
      targetText = form.targetBatch;
      finalBatch = form.targetBatch;
    } else if (form.audienceType === "Specific Batch & Section") {
      targetText = `${form.targetBatch} · ${form.targetSection}`;
      finalBatch = form.targetBatch;
      finalSection = form.targetSection;
    }

    onSubmit({
      title: form.title,
      category: form.category,
      body: form.body,
      target: targetText,
      targetBatch: finalBatch,
      targetSection: finalSection,
      pinned: form.pinned,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <h2 className="sr-only">Post notice form</h2>
      
      <div 
        className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-1.5 bg-amber-400 w-full shrink-0"></div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-purple-900 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="font-serif text-2xl text-purple-900">{editingNotice ? 'Edit Notice' : 'Post New Notice'}</h2>
            <p className="text-slate-500 text-sm">Fill in the details to announce to your students</p>
            <div className="w-full h-px bg-amber-100 mt-4"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-tight">Notice title *</label>
                <span className={`text-[10px] font-bold ${form.title.length > 110 ? 'text-red-500' : 'text-slate-400'}`}>
                  {form.title.length} / 120
                </span>
              </div>
              <input 
                type="text"
                placeholder="e.g. Mid-semester exam schedule released"
                className={`w-full bg-white border ${errors.title ? 'border-red-400 focus:ring-red-100' : 'border-amber-200 focus:ring-purple-100'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 transition-all`}
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
              />
              {errors.title && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.title}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block mb-2.5">Category *</label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setForm({...form, category: "Exam"})}
                  className={`px-6 py-2 rounded-xl text-xs font-bold border transition-all ${
                    form.category === "Exam" 
                    ? "bg-red-600 text-white border-red-600 shadow-md" 
                    : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                  }`}
                >
                  Exam
                </button>
                <button
                  type="button"
                  onClick={() => setForm({...form, category: "Event"})}
                  className={`px-6 py-2 rounded-xl text-xs font-bold border transition-all ${
                    form.category === "Event" 
                    ? "bg-purple-700 text-white border-purple-700 shadow-md" 
                    : "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                  }`}
                >
                  Event
                </button>
                <button
                  type="button"
                  onClick={() => setForm({...form, category: "General"})}
                  className={`px-6 py-2 rounded-xl text-xs font-bold border transition-all ${
                    form.category === "General" 
                    ? "bg-amber-500 text-white border-amber-500 shadow-md" 
                    : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                  }`}
                >
                  General
                </button>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-tight">Notice content *</label>
                <span className={`text-[10px] font-bold ${form.body.length > 900 ? 'text-red-500' : 'text-slate-400'}`}>
                  {form.body.length} / 1000
                </span>
              </div>
              <textarea 
                rows="5"
                placeholder="Write the full notice content here. Be clear and specific..."
                className={`w-full bg-white border ${errors.body ? 'border-red-400 focus:ring-red-100' : 'border-amber-200 focus:ring-purple-100'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 transition-all resize-none`}
                value={form.body}
                onChange={e => setForm({...form, body: e.target.value})}
              ></textarea>
              {errors.body && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.body}</p>}
            </div>

     {/* Attachment Section */}
 <div className="space-y-2">
  <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block">
    Attachments (Optional)
  </label>
  
  {!form.file ? (
    <div className="relative">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
      />
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-amber-200 rounded-2xl bg-amber-50/30 hover:bg-amber-50 hover:border-amber-400 transition-all cursor-pointer group"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 text-amber-500 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-xs text-slate-600">
            <span className="font-bold text-purple-900">Click to upload</span> or drag and drop
          </p>
          <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, PDF or DOC (Max 5MB)</p>
        </div>
      </label>
    </div>
  ) : (
    <div className="flex items-center justify-between p-3 bg-white border border-purple-100 rounded-xl animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="p-2 bg-purple-50 rounded-lg shrink-0">
          {form.file.type.includes('image') ? (
            <svg className="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-bold text-purple-900 truncate">{form.file.name}</p>
          <p className="text-[10px] text-slate-400">{(form.file.size / 1024).toFixed(1)} KB</p>
        </div>
      </div>
      <button
        type="button"
        onClick={removeFile}
        className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )}
  {errors.file && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.file}</p>}
</div>

            {/* Target Audience */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block">Target audience *</label>
                <p className="text-[11px] text-slate-400 mb-3 italic">Who should see this notice?</p>
                <div className="flex flex-wrap gap-2">
                  {["All Students", "Specific Batch", "Specific Batch & Section"].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setForm({...form, audienceType: type})}
                      className={`px-4 py-2 rounded-xl text-[11px] font-bold border transition-all ${
                        form.audienceType === type 
                        ? "bg-purple-900 text-amber-50 border-purple-900" 
                        : "bg-white text-purple-700 border-amber-200 hover:bg-amber-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {(form.audienceType === "Specific Batch" || form.audienceType === "Specific Batch & Section") && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Batch</label>
                    <select 
                      className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-100"
                      value={form.targetBatch}
                      onChange={e => setForm({...form, targetBatch: e.target.value})}
                    >
                      <option>B.Tech Sem 3</option>
                      <option>B.Tech Sem 5</option>
                      <option>MCA Sem 1</option>
                      <option>BCA Sem 3</option>
                    </select>
                  </div>
                  {form.audienceType === "Specific Batch & Section" && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Section</label>
                      <select 
                        className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-100"
                        value={form.targetSection}
                        onChange={e => setForm({...form, targetSection: e.target.value})}
                      >
                        <option>Section A</option>
                        <option>Section B</option>
                        <option>Section C</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 flex items-start gap-2">
                <span className="text-purple-700 mt-0.5">ℹ️</span>
                <p className="text-[12px] text-purple-900 font-medium">
                  This notice will be visible to 
                  <span className="font-bold underline ml-1">
                    {form.audienceType === "All Students" ? "all students" : 
                     form.audienceType === "Specific Batch" ? `all ${form.targetBatch} students` : 
                     `all ${form.targetBatch} · ${form.targetSection} students`}
                  </span>.
                </p>
              </div>
            </div>

            {/* Pin Toggle */}
            <div className="flex items-center justify-between p-4 bg-amber-50/50 rounded-2xl border border-amber-100">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-tight block">Pin this notice</label>
                <p className="text-[11px] text-slate-400">Pinned notices always appear at the top</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={form.pinned}
                onClick={() => setForm({...form, pinned: !form.pinned})}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${form.pinned ? 'bg-purple-700' : 'bg-slate-200'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${form.pinned ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center pt-6 border-t border-amber-100 mt-8">
              <button 
                type="button"
                onClick={onClose}
                className="text-sm font-bold text-slate-500 hover:text-purple-900 transition-colors px-4 py-2"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-purple-900 text-amber-50 px-10 py-3 rounded-xl text-sm font-bold shadow-lg shadow-purple-900/10 hover:bg-purple-800 transition-all active:scale-95"
              >
                {editingNotice ? 'Save Changes' : 'Post Notice'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}