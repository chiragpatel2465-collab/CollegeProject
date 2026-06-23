import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

/**
 * GOOGLE FONTS IMPORT (Place this in your index.html or at the top of your main CSS)
 * @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;700&display=swap');
 */

// --- Dummy Data ---
const STUDENT_INFO = {
  name: "Raj Kumar",
  id: "BT2023045",
  program: "B.Tech Semester 3",
  initials: "RK"
};

const STATS = [
  { label: "Overall Attendance", value: "82%", status: "success" }, // Green >= 75
  { label: "Pending Assignments", value: "3", status: "warning" },
  { label: "Upcoming Events", value: "2", status: "neutral" },
  { label: "Club Status", value: "Pending", status: "warning" },
];

const ASSIGNMENTS = [
  { id: 1, subject: "Data Structures (CS301)", title: "Binary Tree Traversal", dueDate: "2026-04-20", status: "Pending" },
  { id: 2, subject: "OOP (CS304)", title: "Inheritance & Polymorphism", dueDate: "2026-04-23", status: "Pending" },
  { id: 3, subject: "Computer Organization (CS302)", title: "ALU Design Report", dueDate: "2026-04-25", status: "Pending" },
  { id: 4, subject: "Discrete Maths (CS303)", title: "Set Theory Worksheet", dueDate: "2026-04-30", status: "Submitted" },
];

const NOTICES = [
  { id: 1, type: "Exam", title: "Mid-semester exam schedule released", author: "Admin Office", date: "17 Apr 2026", color: "bg-red-100 text-red-700" },
  { id: 2, type: "Event", title: "Techno-Fest registrations now open", author: "Cultural Committee", date: "15 Apr 2026", color: "bg-purple-100 text-purple-700" },
  { id: 3, type: "General", title: "Library timing extended till 10 PM", author: "Library Dept", date: "14 Apr 2026", color: "bg-amber-100 text-amber-700" },
  { id: 4, type: "Exam", title: "Practical exam dates announced", author: "Exam Cell", date: "12 Apr 2026", color: "bg-red-100 text-red-700" },
];

const EVENTS = [
  { id: 1, name: "Techno-Fest 2025", date: "25 Apr 2026", time: "10:00 AM", venue: "Main Auditorium", cat: "Tech" },
  { id: 2, name: "Sports Day", date: "1 May 2026", time: "8:00 AM", venue: "Sports Ground", cat: "Sports" },
  { id: 3, name: "Farewell Ceremony", date: "10 May 2026", time: "5:00 PM", venue: "Garden Lawn", cat: "Cultural" },
  { id: 4, name: "Hackathon 2025", date: "15 May 2026", time: "9:00 AM", venue: "CS Block", cat: "Tech" },
];

const CLUB_DATA = {
  name: "Web Wizards Tech Club",
  category: "Technology",
  applied: "10 Apr 2026",
  coordinator: "Dr. Vikram Joshi",
  status: "Pending",
  message: "Your application is under review by the faculty coordinator."
};

// --- Helper Components ---

const SectionTitle = ({ children }) => (
  <div className="mb-4">
    <h3 className="font-serif text-xl text-brand-primary">{children}</h3>
    <div className="w-8 h-0.5 bg-brand-primary mt-1"></div>
  </div>
);

// --- Main Components ---


export default function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const formattedDate = useMemo(() => {
    return new Date().toLocaleDateString('en-IN', { 
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
    });
  }, []);

  const getDueDateLabel = (dateStr) => {
    const today = new Date();
    const target = new Date(dateStr);
    const diff = target.setHours(0,0,0,0) - today.setHours(0,0,0,0);
    const dayMs = 24 * 60 * 60 * 1000;

    if (diff === 0) return { text: "Due today", color: "text-red-600 font-bold" };
    if (diff === dayMs) return { text: "Due tomorrow", color: "text-amber-600" };
    return { text: dateStr, color: "text-gray-500" };
  };

  return (
    <div className="flex h-screen overflow-hidden bg-brand-surface font-sans selection:bg-brand-light">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;700&display=swap');
          .font-serif { font-family: 'Cormorant Garamond', serif; }
          .font-sans { font-family: 'DM Sans', sans-serif; }
        `}
      </style>

      {/* Sidebar Component */}
      {/* <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> */}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TopBar */}
        <header className="bg-white border-b border-brand-purple px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-brand-primary text-2xl" 
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Menu"
            >
              ☰
            </button>
            <h2 className="font-serif text-2xl text-brand-primary">Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="hidden md:block text-sm text-brand-primary/50 font-medium">{formattedDate}</p>
            <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-primary font-bold border border-brand-purple text-xs">
              {STUDENT_INFO.initials}
            </div>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
          <h1 className="sr-only">Student Dashboard Content</h1>

          {/* Section 1: Welcome Banner */}
          <section className="relative overflow-hidden bg-linear-to-r from-brand-primary via-brand-mid to-brand-purple rounded-2xl p-6 md:p-10 shadow-xl">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <span className="inline-block bg-brand-light text-brand-primary text-[10px] font-bold uppercase px-3 py-1 rounded-full mb-3">
                   Good morning 👋
                </span>
                <h1 className="font-serif text-3xl md:text-5xl text-white mb-2">
                  Welcome back, {STUDENT_INFO.name}
                </h1>
                <p className="text-white/80 text-sm md:text-lg mb-6">
                  {STUDENT_INFO.program} · Enrollment No. {STUDENT_INFO.id}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                    <p className="text-[10px] text-white/70 uppercase font-bold">Attendance</p>
                    <p className="text-white font-bold">82%</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                    <p className="text-[10px] text-white/70 uppercase font-bold">Pending Tasks</p>
                    <p className="text-white font-bold">3</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                    <p className="text-[10px] text-white/70 uppercase font-bold">Active Club</p>
                    <p className="text-white font-bold">Web Wizards</p>
                  </div>
                </div>
              </div>
              {/* Decorative "S" */}
              <div className="hidden lg:block absolute right-[-20px] bottom-[-40px] font-serif text-[240px] text-white opacity-10 pointer-events-none">
                S
              </div>
            </div>
          </section>

          {/* Section 2: Stats Row */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <div key={i} className="bg-white border border-brand-purple rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[11px] md:text-xs text-brand-primary/50 font-bold uppercase tracking-wide">{stat.label}</p>
                  <div className={`w-2 h-2 rounded-full ${
                    stat.label.includes("attendance") 
                      ? (parseInt(stat.value) >= 75 ? 'bg-green-500' : 'bg-red-500')
                      : (stat.value === 'Pending' ? 'bg-brand-mid' : 'bg-brand-primary')
                  }`} />
                </div>
                <p className={`font-serif text-2xl md:text-3xl ${
                  stat.label.includes("attendance") && parseInt(stat.value) < 75 ? 'text-red-600' : 'text-brand-primary'
                }`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </section>

          {/* Section 3: Two Column Layout */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Pending Assignments */}
            <div className="lg:col-span-2">
              <SectionTitle>Pending Assignments</SectionTitle>
              <div className="space-y-4">
                {ASSIGNMENTS.slice(0, 4).map((task) => {
                  const dateInfo = getDueDateLabel(task.dueDate);
                  return (
                    <div key={task.id} className="bg-white p-4 rounded-xl border border-brand-purple flex items-center justify-between group hover:border-brand-mid transition-colors">
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-brand-primary/50 uppercase mb-0.5">{task.subject}</p>
                        <h4 className="text-brand-primary font-bold text-sm md:text-base group-hover:text-brand-mid">{task.title}</h4>
                        <p className={`text-xs mt-1 ${dateInfo.color}`}>{dateInfo.text}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${
                          task.status === 'Submitted' ? 'bg-green-100 text-green-700' : 
                          task.status === 'Late' ? 'bg-red-100 text-red-900' : 'bg-red-100 text-red-600'
                        }`}>
                          {task.status}
                        </span>
                        <a href="#" className="text-brand-primary/50 hover:text-brand-primary font-bold text-xs">View →</a>
                      </div>
                    </div>
                  );
                })}
                <Link to="/student/assignments" className="inline-block text-brand-primary font-bold text-sm hover:text-brand-mid transition-colors">
                  View all assignments →
                </Link>
              </div>
            </div>

            {/* Right: Latest Notices */}
            <div className="bg-white p-6 rounded-2xl border border-brand-purple shadow-sm self-start">
              <SectionTitle>Latest Notices</SectionTitle>
              <div className="space-y-6">
                {NOTICES.map((notice) => (
                  <div key={notice.id} className="relative pl-4 border-l-2 border-brand-purple hover:border-brand-mid transition-colors cursor-pointer group">
                    <span className={`inline-block text-[9px] px-2 py-0.5 rounded font-bold uppercase mb-1 ${notice.color}`}>
                      {notice.type}
                    </span>
                    <h5 className="text-sm font-bold text-brand-primary leading-tight group-hover:text-brand-mid">{notice.title}</h5>
                    <p className="text-[10px] text-brand-primary/50 mt-1">{notice.author} · {notice.date}</p>
                  </div>
                ))}
              </div>
              <Link to="/student/notices" className="mt-6 block text-center bg-brand-light text-brand-primary py-2 rounded-lg text-xs font-bold border border-brand-purple hover:bg-brand-surface transition-colors">
                View all notices →
              </Link>
            </div>
          </section>

          {/* Section 4: Upcoming Events Strip */}
          <section>
            <SectionTitle>Upcoming Events</SectionTitle>
            <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
              {EVENTS.map((event) => (
                <div key={event.id} className="min-w-[240px] bg-white p-5 rounded-xl border-l-4 border-l-brand-mid shadow-sm border border-brand-purple shrink-0">
                  <span className="text-[10px] bg-brand-light text-brand-primary font-bold px-2 py-1 rounded uppercase">{event.cat}</span>
                  <h4 className="font-serif text-lg text-brand-primary mt-2 mb-3">{event.name}</h4>
                  <div className="space-y-1 text-xs text-brand-primary/50">
                    <p className="flex items-center gap-2">📅 {event.date} · {event.time}</p>
                    <p className="flex items-center gap-2">📍 {event.venue}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Club Status Card */}
          <section className="bg-white p-6 rounded-2xl border-2 border-dashed border-brand-purple">
            <SectionTitle>My Clubs</SectionTitle>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-3xl">🧙‍♂️</div>
                <div>
                  <h4 className="text-lg font-bold text-brand-primary">{CLUB_DATA.name}</h4>
                  <p className="text-xs text-brand-primary/50 font-bold uppercase tracking-wider">{CLUB_DATA.category}</p>
                  <p className="text-xs text-brand-primary/50 mt-1">Applied: {CLUB_DATA.applied} · Coord: {CLUB_DATA.coordinator}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-end gap-3">
                <span className="bg-brand-light text-brand-primary px-4 py-1.5 rounded-full font-bold text-xs uppercase border border-brand-purple">
                  {CLUB_DATA.status}
                </span>
                <p className="text-[11px] text-brand-primary/50 italic text-center md:text-right max-w-[200px]">
                  "{CLUB_DATA.message}"
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}