import React, { useState, useEffect } from 'react';

const DUMMY_SUBMISSIONS = [
  { id: 1,  name: "Raj Kumar",      enrollment: "BT2023045", status: "Submitted", submittedOn: "2026-04-19 10:32 AM" },
  { id: 2,  name: "Priya Sharma",   enrollment: "BT2023112", status: "Submitted", submittedOn: "2026-04-20 02:15 PM" },
  { id: 3,  name: "Arjun Mehta",    enrollment: "BT2023078", status: "Pending",   submittedOn: null },
  { id: 4,  name: "Sneha Patel",    enrollment: "BT2023034", status: "Late",      submittedOn: "2026-04-22 09:10 AM" },
  { id: 5,  name: "Karan Desai",    enrollment: "BT2023091", status: "Submitted", submittedOn: "2026-04-18 11:45 AM" },
  { id: 6,  name: "Nisha Joshi",    enrollment: "BT2023056", status: "Pending",   submittedOn: null },
  { id: 7,  name: "Rohit Shah",     enrollment: "BT2023023", status: "Submitted", submittedOn: "2026-04-20 04:00 PM" },
  { id: 8,  name: "Meera Nair",     enrollment: "BT2023067", status: "Submitted", submittedOn: "2026-04-19 08:55 AM" },
  { id: 9,  name: "Dev Trivedi",    enrollment: "BT2023089", status: "Pending",   submittedOn: null },
  { id: 10, name: "Pooja Agarwal",  enrollment: "BT2023102", status: "Late",      submittedOn: "2026-04-23 06:30 PM" },
];

export default function SubmissionsDrawer({ assignment, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (assignment) setIsOpen(true);
  }, [assignment]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // match transition duration
  };

  if (!assignment) return null;

  const filteredSubmissions = DUMMY_SUBMISSIONS.filter(sub => {
    const matchesFilter = activeFilter === "All" || sub.status === activeFilter;
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sub.enrollment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').substring(0, 2);

  const statusColors = {
    Submitted: "bg-green-100 text-green-800",
    Pending: "bg-amber-100 text-amber-800",
    Late: "bg-red-100 text-red-800"
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={handleClose} />
      
      <div className={`fixed right-0 top-0 h-full w-full max-w-lg bg-white border-l border-amber-200 z-50 flex flex-col font-sans transition-transform duration-300 shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-1 bg-amber-400 w-full shrink-0" />
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-amber-100 shrink-0 relative">
          <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded">{assignment.subjectCode}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${assignment.status === 'Open' ? 'bg-green-100 text-green-800' : assignment.status === 'Closed' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-800'}`}>{assignment.status}</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-purple-900 mb-1 leading-tight pr-6">{assignment.title}</h2>
          <p className="text-sm text-slate-500">{assignment.totalStudents} students · {assignment.submissionsCount} submitted · {assignment.totalStudents - assignment.submissionsCount} pending</p>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 border-b border-amber-50 shrink-0">
          <input 
            type="text" 
            placeholder="Search student name or enrollment no..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-sm mb-3 outline-none focus:border-purple-400"
          />
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {["All", "Submitted", "Pending", "Late"].map(filter => (
              <button 
                key={filter} 
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold border whitespace-nowrap transition-colors ${activeFilter === filter ? 'bg-purple-900 text-amber-50 border-purple-900' : 'bg-white text-purple-700 border-amber-200 hover:bg-amber-50'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-1">
          {filteredSubmissions.length > 0 ? filteredSubmissions.map(student => (
            <div key={student.id} className="flex items-center justify-between py-3 border-b border-amber-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-xs shrink-0">
                  {getInitials(student.name)}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm leading-tight">{student.name}</p>
                  <p className="text-slate-400 text-xs">{student.enrollment}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${statusColors[student.status]}`}>
                  {student.status}
                </span>
                {student.submittedOn && (
                  <p className="text-[10px] text-slate-400">{student.submittedOn}</p>
                )}
                {student.status !== "Pending" && (
                  <a href="#" className="block text-[10px] font-semibold text-purple-600 hover:underline mt-0.5">View file</a>
                )}
              </div>
            </div>
          )) : (
            <p className="text-center text-slate-500 text-sm py-8 italic">No students match your search.</p>
          )}
        </div>

        {/* Footer Summary */}
        <div className="border-t border-amber-100 p-4 bg-amber-50 shrink-0">
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="font-bold text-purple-900">{assignment.submissionsCount} / {assignment.totalStudents} submitted</span>
            <span className="text-amber-700 font-bold">{Math.round((assignment.submissionsCount/assignment.totalStudents)*100)}%</span>
          </div>
          <div className="bg-amber-200 rounded-full h-1.5 w-full overflow-hidden mb-2">
            <div className="bg-purple-600 h-full rounded-full" style={{ width: `${(assignment.submissionsCount/assignment.totalStudents)*100}%` }} />
          </div>
          <p className="text-xs text-slate-500 text-center">Assignment closes on {new Date(assignment.lastSubmissionDate).toLocaleDateString()}</p>
        </div>
      </div>
    </>
  );
}