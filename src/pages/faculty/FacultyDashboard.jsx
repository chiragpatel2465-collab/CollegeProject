import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- DUMMY DATA ---
const SCHEDULE_DATA = [
  { id: 1, time: "8:00 – 9:00 AM", subject: "OOP Lecture", batch: "B.Tech Sem 3 · Sec A", room: "Room A-103", type: "Lecture" },
  { id: 2, time: "10:00 – 11:00 AM", subject: "OOP Lecture", batch: "B.Tech Sem 3 · Sec B", room: "Room A-103", type: "Lecture" },
  { id: 3, time: "2:00 – 4:00 PM", subject: "OOP Lab", batch: "B.Tech Sem 3 · Sec A", room: "Lab L-02", type: "Lab" }
];

const ASSIGNMENTS_DATA = [
  { id: 1, subject: "OOP (CS304)", title: "Inheritance & Polymorphism", posted: "9 Apr 2026", due: "23 Apr 2026", subs: 28, total: 32, progress: 87, status: "overdue", type: "Lecture" },
  { id: 2, subject: "OOP (CS304)", title: "Design Patterns Report", posted: "14 Apr 2026", due: "5 May 2026", subs: 10, total: 32, progress: 31, status: "normal", type: "Lecture" },
  { id: 3, subject: "OOP Lab (CS306)", title: "Exception Handling Lab", posted: "11 Apr 2026", due: "26 Apr 2026", subs: 20, total: 32, progress: 62, status: "soon", type: "Lab" },
  { id: 4, subject: "OOP (CS304)", title: "UML Diagrams Exercise", posted: "6 Apr 2026", due: "20 Apr 2026", subs: 32, total: 32, progress: 100, status: "completed", type: "Lecture" }
];

const NOTICES_DATA = [
  { id: 1, title: "Mid-semester practical exam schedule", date: "17 Apr 2026", category: "Exam" },
  { id: 2, title: "Assignment submission guidelines updated", date: "14 Apr 2026", category: "General" },
  { id: 3, title: "Techno-Fest judging panel volunteers needed", date: "12 Apr 2026", category: "Event" }
];

const NAV_LINKS = [
  { label: "Dashboard", route: "#", icon: "🏠", active: true },
  { label: "My Timetable", route: "#", icon: "📅", active: false },
  { label: "Post Assignments", route: "#", icon: "📝", active: false },
  { label: "Notices", route: "#", icon: "📢", active: false },
  { label: "View Students", route: "#", icon: "👥", active: false },
  { label: "Profile", route: "#", icon: "👤", active: false }
];

// --- COMPONENTS ---



export default function FacultyDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [clubApprovals, setClubApprovals] = useState([
    { id: 1, name: "Web Wizards Tech Club", student: "Raj Kumar", enrollment: "BT2023045", category: "Technology", appliedOn: "10 Apr 2026", status: "pending" },
    { id: 2, name: "Photography Circle", student: "Priya Sharma", enrollment: "BT2023112", category: "Photography", appliedOn: "13 Apr 2026", status: "pending" },
  ]);

  const pendingCount = clubApprovals.filter(c => c.status === 'pending').length;
  const currentDate = new Date('2026-04-21T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const handleApproval = (id, decision) => {
    setClubApprovals(prev =>
      prev.map(club => club.id === id ? { ...club, status: decision } : club)
    );
  };

  return (
    <div className="flex h-screen  mt-20 overflow-hidden bg-amber-50 font-sans text-slate-800">
      {/* Import Google Fonts */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;700&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
      `}} />



      <main className="flex-1 overflow-y-auto relative">
        <h2 className="sr-only">Faculty dashboard</h2>
        
        {/* Mobile Header (Hamburger) */}
        <div className="lg:hidden flex items-center p-4 bg-purple-900 text-white">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-amber-400 focus:outline-none">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-serif font-bold text-lg text-amber-400 ml-2">Aurora College</span>
        </div>

        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-purple-900 font-bold mb-1">Good morning, Dr. Vikram Joshi</h2>
              <p className="text-purple-700/80 mb-3">Object Oriented Programming · CS Department</p>
              <div className="w-12 h-1 bg-amber-500 rounded-full" />
            </div>
            <p className="text-sm text-slate-500 font-medium mt-4 md:mt-0">{currentDate}</p>
          </header>

          {/* Quick Stats */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total students" value="124" sub="across 4 batches" color="purple" />
            <StatCard label="Classes today" value="3" sub="B.Tech Sem 3" color="amber" />
            <StatCard label="Pending club approvals" value={pendingCount} sub="awaiting review" color="red" />
            <StatCard label="Assignments posted" value="7" sub="this semester" color="green" />
          </section>

          {/* Today's Schedule */}
          <section className="mb-10">
            <div className="mb-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600">TODAY'S SCHEDULE</span>
              <h3 className="font-serif text-2xl text-purple-900 font-bold">Classes for Tuesday</h3>
              <div className="w-8 h-0.5 bg-yellow-600 mt-2 rounded" />
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
              {SCHEDULE_DATA.length > 0 ? (
                SCHEDULE_DATA.map(cls => (
                  <div key={cls.id} className={`min-w-[240px] snap-start bg-white border border-amber-200 rounded-xl p-4 shadow-sm flex flex-col justify-between border-l-4 ${
                    cls.type === 'Lecture' ? 'border-l-purple-600' : 
                    cls.type === 'Lab' ? 'border-l-amber-500' : 'border-l-teal-500'
                  }`}>
                    <div>
                      <p className="text-purple-800 font-bold text-sm mb-1">{cls.time}</p>
                      <h4 className="font-serif text-xl font-bold text-slate-900">{cls.subject}</h4>
                      <p className="text-slate-500 text-xs mt-1">{cls.batch}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">{cls.room}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        cls.type === 'Lecture' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'
                      }`}>{cls.type}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white border border-amber-200 rounded-xl p-6 flex items-center gap-3 text-slate-500 w-full">
                  <span className="text-xl">📅</span> No classes scheduled for today
                </div>
              )}
            </div>
          </section>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            
            {/* Left Col: Assignments */}
            <section className="lg:col-span-2">
              <div className="mb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600">ACADEMICS</span>
                <h3 className="font-serif text-2xl text-purple-900 font-bold">Recently Posted Assignments</h3>
                <div className="w-8 h-0.5 bg-yellow-600 mt-2 rounded" />
              </div>

              <div className="space-y-3">
                {ASSIGNMENTS_DATA.map(task => (
                  <div key={task.id} className="bg-white border border-amber-100 shadow-sm rounded-xl p-4 sm:flex items-start justify-between gap-4">
                    <div className="mb-3 sm:mb-0">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mb-2 ${task.type === 'Lecture' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'}`}>{task.subject}</span>
                      <h4 className="font-serif font-bold text-lg text-purple-900 leading-tight">{task.title}</h4>
                      <p className="text-slate-400 text-xs mt-1">Posted on {task.posted}</p>
                    </div>
                    <div className="sm:text-right min-w-[140px]">
                      <p className={`text-sm font-medium mb-1 ${task.progress === 100 ? 'text-green-600' : 'text-purple-700'}`}>
                        {task.subs} / {task.total} submitted
                      </p>
                      <div className="bg-amber-100 rounded-full h-1.5 w-full overflow-hidden mb-1">
                        <div className="bg-purple-600 h-full rounded-full transition-all" style={{ width: `${task.progress}%` }} />
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
                        <span className="text-slate-400">{task.progress}%</span>
                        <span className={`font-medium ${task.status === 'overdue' ? 'text-red-500' : task.status === 'soon' ? 'text-amber-600' : 'text-slate-500'}`}>
                          {task.status === 'completed' ? 'Completed' : `Due ${task.due}`}
                        </span>
                      </div>
                      <Link to={`/faaculty/assignments/:${task.id}`} className="inline-block mt-2 text-xs font-semibold text-purple-600 hover:text-purple-800 hover:underline">
                        View submissions &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <Link to="/faculty/assignments" className="text-sm font-medium text-amber-600 hover:text-amber-700 hover:underline">View all assignments &rarr;</Link>
                </div>
              </div>
            </section>

            {/* Right Col: Notices & Approvals */}
            <section className="lg:col-span-1 space-y-8">
              
              {/* Notices */}
              <div>
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600">CAMPUS</span>
                  <h3 className="font-serif text-2xl text-purple-900 font-bold">Latest Notices</h3>
                  <div className="w-8 h-0.5 bg-yellow-600 mt-2 rounded" />
                </div>
                
                <div className="bg-white border border-amber-200 rounded-xl overflow-hidden shadow-sm">
                  {NOTICES_DATA.map((notice, idx) => (
                    <div key={notice.id} className={`p-4 ${idx !== NOTICES_DATA.length - 1 ? 'border-b border-amber-100' : ''}`}>
                      <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded uppercase mb-1 ${
                        notice.category === 'Exam' ? 'bg-red-100 text-red-700' : 
                        notice.category === 'Event' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'
                      }`}>{notice.category}</span>
                      <h4 className="font-bold text-sm text-purple-900 leading-tight mb-1">{notice.title}</h4>
                      <p className="text-[11px] text-slate-400">Posted by administration · {notice.date}</p>
                    </div>
                  ))}
                  <div className="bg-amber-50/50 p-3 text-center border-t border-amber-100">
                    <Link to="/faculty/notices" className="text-xs font-semibold text-purple-700 hover:underline">View all notices &rarr;</Link>
                  </div>
                </div>
              </div>

              {/* Pending Approvals */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-red-500">PENDING APPROVALS</span>
                    <h3 className="font-serif text-2xl text-purple-900 font-bold">Club Applications</h3>
                    <div className="w-8 h-0.5 bg-yellow-600 mt-2 rounded" />
                  </div>
                  {pendingCount > 0 && (
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">{pendingCount} New</span>
                  )}
                </div>

                <div className="space-y-3">
                  {clubApprovals.map(club => {
                    if (club.status === 'approved') {
                      return (
                        <div key={club.id} className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm text-sm text-green-800">
                          <strong>✓ Approved</strong> — {club.name}
                        </div>
                      );
                    }
                    if (club.status === 'rejected') {
                      return (
                        <div key={club.id} className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm text-sm text-red-800">
                          <strong>✗ Rejected</strong> — {club.name}
                        </div>
                      );
                    }
                    return (
                      <div key={club.id} className="bg-white border border-red-100 shadow-sm rounded-xl p-4 border-l-4 border-l-red-400">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-purple-900 text-sm">{club.name}</h4>
                          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">{club.category}</span>
                        </div>
                        <p className="text-xs text-slate-600 mb-1">Applied by: <span className="font-medium text-slate-800">{club.student}</span> ({club.enrollment})</p>
                        <p className="text-[11px] text-slate-400 mb-3">Applied on {club.appliedOn}</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleApproval(club.id, 'approved')}
                            aria-label={`Approve ${club.name} application`}
                            className="flex-1 bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleApproval(club.id, 'rejected')}
                            aria-label={`Reject ${club.name} application`}
                            className="flex-1 bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {clubApprovals.length === 0 && (
                    <div className="text-sm text-slate-500 italic p-4 border border-dashed border-amber-200 rounded-xl text-center">
                      No pending approvals.
                    </div>
                  )}
                </div>
              </div>

            </section>
          </div>

          
        </div>
      </main>
    </div>
  );
}

// --- SUBCOMPONENTS ---

const StatCard = ({ label, value, sub, color }) => {
  const borderColors = {
    purple: 'border-t-purple-600',
    amber: 'border-t-amber-500',
    red: 'border-t-red-500',
    green: 'border-t-green-500'
  };
  const textColors = {
    purple: 'text-purple-700',
    amber: 'text-amber-600',
    red: 'text-red-600',
    green: 'text-green-600'
  };

  return (
    <div className={`bg-white border border-amber-200 rounded-xl p-4 shadow-sm border-t-4 ${borderColors[color]}`}>
      <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
      <p className={`font-serif text-3xl font-bold ${textColors[color]}`}>{value}</p>
      <p className="text-[11px] text-slate-400 mt-1 truncate">{sub}</p>
    </div>
  );
};

const QuickAction = ({ icon, label, sub }) => (
  <a href="#" className="bg-white border border-amber-200 rounded-xl p-5 text-center hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer shadow-sm group">
    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
    <h4 className="font-serif font-bold text-[15px] text-purple-900 mb-0.5">{label}</h4>
    <p className="text-xs text-slate-500">{sub}</p>
  </a>
);