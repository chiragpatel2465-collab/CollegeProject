import React, { useState } from 'react';
import AssignmentCard from '../../components/faculty/AssignmentCard';
import CreateAssignmentModal from '../../components/faculty/CreateAssignmentModal';
import SubmissionsDrawer from '../../components/faculty/SubmissionsDrawer';

const initialAssignments = [
  { id: 1, subjectCode: "CS304", subjectName: "Object Oriented Programming", subjectType: "Lecture", title: "Inheritance & Polymorphism", description: "Build a mini project demonstrating all four OOP pillars using Java or C++. Include proper documentation and UML diagrams.", batch: "B.Tech Sem 3", section: "Section A", totalStudents: 32, submissionsCount: 28, dueDate: "2026-04-23T23:59", lastSubmissionDate: "2026-04-23", writingFormat: { side: "Single side", pages: 6 }, attachments: ["OOP_Project_Guidelines.pdf"], status: "Open", postedOn: "2026-04-09" },
  { id: 2, subjectCode: "CS304", subjectName: "Object Oriented Programming", subjectType: "Lecture", title: "Design Patterns Report", description: "Write a detailed report on any 5 design patterns with UML diagrams and real-world use cases.", batch: "B.Tech Sem 3", section: "Section A", totalStudents: 32, submissionsCount: 10, dueDate: "2026-05-05T23:59", lastSubmissionDate: "2026-05-05", writingFormat: { side: "Double side", pages: 8 }, attachments: [], status: "Open", postedOn: "2026-04-14" },
  { id: 3, subjectCode: "CS306", subjectName: "OOP Lab", subjectType: "Lab", title: "Exception Handling Lab Cycle", description: "Write Java programs demonstrating try-catch-finally, custom exceptions and multi-catch blocks.", batch: "B.Tech Sem 3", section: "Section A", totalStudents: 32, submissionsCount: 20, dueDate: "2026-04-26T23:59", lastSubmissionDate: "2026-04-26", writingFormat: { side: "Single side", pages: 4 }, attachments: ["LabCycle2_Reference.pdf"], status: "Open", postedOn: "2026-04-11" },
  { id: 4, subjectCode: "CS304", subjectName: "Object Oriented Programming", subjectType: "Lecture", title: "UML Diagrams Exercise", description: "Draw class, sequence and activity diagrams for the given case study of a library management system.", batch: "B.Tech Sem 3", section: "All Sections", totalStudents: 64, submissionsCount: 64, dueDate: "2026-04-20T23:59", lastSubmissionDate: "2026-04-20", writingFormat: { side: "Single side", pages: 3 }, attachments: ["UML_CaseStudy.pdf"], status: "Closed", postedOn: "2026-04-06" },
  { id: 5, subjectCode: "CS303T", subjectName: "Discrete Maths Tutorial", subjectType: "Tutorial", title: "Tutorial Sheet 4 — Logic & Proofs", description: "Solve all 15 problems from Tutorial Sheet 4 covering propositional logic, predicate logic and proof by induction.", batch: "B.Tech Sem 3", section: "Section B", totalStudents: 32, submissionsCount: 18, dueDate: "2026-04-19T23:59", lastSubmissionDate: "2026-04-19", writingFormat: { side: "Double side", pages: 5 }, attachments: ["TutorialSheet4.pdf"], status: "Overdue", postedOn: "2026-04-13" }
];

export default function PostAssignments() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePost = (newAssignment) => {
    if (editingAssignment) {
      setAssignments(prev => prev.map(a => a.id === editingAssignment.id ? { ...a, ...newAssignment } : a));
      showToast("Assignment updated successfully!");
    } else {
      setAssignments(prev => [{ ...newAssignment, id: Date.now() }, ...prev]);
      showToast("Assignment posted successfully!");
    }
    setShowModal(false);
    setEditingAssignment(null);
  };

  const handleDelete = (id) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
    showToast("Assignment deleted.", "error");
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setShowModal(true);
  };

  // Derived Stats
  const stats = {
    total: assignments.length,
    open: assignments.filter(a => a.status === 'Open').length,
    closed: assignments.filter(a => a.status === 'Closed').length,
    overdue: assignments.filter(a => a.status === 'Overdue').length
  };

  // Filter and Sort
  const filteredAssignments = assignments
    .filter(a => activeFilter === "All" || a.status === activeFilter)
    .filter(a => 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.batch.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="min-h-screen mt-20 bg-amber-50 font-sans text-slate-800 p-6 lg:p-10 relative">
      <h2 className="sr-only">Faculty post assignments page</h2>
      
      {/* Global Font Imports */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;700&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
      `}} />

      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1 tracking-wide uppercase">Faculty Portal › Post Assignments</p>
            <h1 className="font-serif text-4xl text-purple-900 font-bold mb-1">Post Assignments</h1>
            <p className="text-purple-700/80 mb-3">Manage and track assignments for your students</p>
            <div className="w-12 h-0.5 bg-yellow-600 rounded" />
          </div>
          <button 
            onClick={() => { setEditingAssignment(null); setShowModal(true); }}
            className="bg-purple-900 text-amber-50 font-semibold px-6 py-2.5 rounded-xl hover:bg-purple-800 transition shadow-sm self-start md:self-auto shrink-0"
          >
            + Post New Assignment
          </button>
        </header>

        {/* Stats Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-amber-200 rounded-xl p-4 border-t-4 border-t-purple-600 shadow-sm">
            <p className="text-[12px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Total posted</p>
            <p className="font-serif text-3xl font-bold text-purple-900">{stats.total}</p>
            <p className="text-[11px] text-slate-400 mt-1 truncate">across active subjects</p>
          </div>
          <div className="bg-white border border-amber-200 rounded-xl p-4 border-t-4 border-t-green-500 shadow-sm">
            <p className="text-[12px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Open</p>
            <p className="font-serif text-3xl font-bold text-green-600">{stats.open}</p>
            <p className="text-[11px] text-slate-400 mt-1 truncate">accepting submissions</p>
          </div>
          <div className="bg-white border border-amber-200 rounded-xl p-4 border-t-4 border-t-gray-400 shadow-sm">
            <p className="text-[12px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Closed</p>
            <p className="font-serif text-3xl font-bold text-gray-700">{stats.closed}</p>
            <p className="text-[11px] text-slate-400 mt-1 truncate">no new submissions</p>
          </div>
          <div className="bg-white border border-amber-200 rounded-xl p-4 border-t-4 border-t-red-500 shadow-sm">
            <p className="text-[12px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Overdue</p>
            <p className="font-serif text-3xl font-bold text-red-600">{stats.overdue}</p>
            <p className="text-[11px] text-slate-400 mt-1 truncate">needs your attention</p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="mb-6 space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-amber-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input 
              type="text" 
              placeholder="Search by subject, title or batch..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-amber-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-purple-500 outline-none shadow-sm"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {['All', 'Open', 'Closed', 'Overdue'].map(tab => {
              const count = tab === 'All' ? stats.total : stats[tab.toLowerCase()];
              const isActive = activeFilter === tab;
              return (
                <button 
                  key={tab} 
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all whitespace-nowrap flex items-center gap-2
                    ${isActive ? 'bg-purple-900 text-amber-50 border-purple-900' : 'bg-white border-amber-200 text-purple-700 hover:bg-amber-50'}`}
                >
                  {tab} <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-purple-700 text-white' : 'bg-amber-100 text-amber-800'}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map(assignment => (
              <AssignmentCard 
                key={assignment.id} 
                assignment={assignment} 
                onViewSubmissions={setSelectedAssignment}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white border border-dashed border-amber-300 rounded-2xl">
              <p className="text-slate-500 font-medium">No assignments found matching your criteria.</p>
            </div>
          )}
        </section>

      </div>

      {/* Modals & Overlays */}
      <CreateAssignmentModal 
        isOpen={showModal} 
        onClose={() => { setShowModal(false); setEditingAssignment(null); }} 
        onSave={handlePost}
        editingAssignment={editingAssignment}
      />
      
      <SubmissionsDrawer 
        assignment={selectedAssignment} 
        onClose={() => setSelectedAssignment(null)} 
      />

      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {toast && (
          <div className={`px-5 py-3 rounded-xl shadow-xl font-medium text-sm flex items-center gap-2 text-white ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
            <span>{toast.type === 'error' ? '🗑️' : '✅'}</span> {toast.message}
          </div>
        )}
      </div>

    </div>
  );
}