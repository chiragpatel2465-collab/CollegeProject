import React, { useState, useEffect, useMemo } from 'react';
import PostNoticeModal from '../../components/faculty/PostNoticeModal';

const initialNotices = [
  {
    id: 1,
    title: "Mid-semester practical exam schedule released",
    body: "The mid-semester practical examinations for all B.Tech Semester 3 students will be held from 5th May to 10th May 2026. Students are required to bring their lab manuals and student ID cards. Detailed subject-wise schedule is attached below. Please note that no re-examination will be conducted for absentees without prior medical certification.",
    category: "Exam",
    target: "B.Tech Sem 3",
    targetBatch: "B.Tech Sem 3",
    targetSection: "All Sections",
    pinned: true,
    postedOn: "2026-04-17",
  },
  {
    id: 2,
    title: "Assignment submission guidelines updated",
    body: "Please note that all written assignments must now be submitted in single-sided format with a minimum of 4 pages unless specified otherwise. Digital submissions will not be accepted. Students failing to follow the prescribed format will have their assignments marked as incomplete.",
    category: "General",
    target: "All Students",
    targetBatch: "All Batches",
    targetSection: "All Sections",
    pinned: true,
    postedOn: "2026-04-14",
  },
  {
    id: 3,
    title: "Techno-Fest judging panel volunteers needed",
    body: "Faculty members interested in volunteering as judges for the upcoming Techno-Fest 2026 are requested to register their names with the cultural committee by 25th April. The fest is scheduled for 2nd and 3rd May 2026. Your participation will be highly appreciated.",
    category: "Event",
    target: "All Students",
    targetBatch: "All Batches",
    targetSection: "All Sections",
    pinned: false,
    postedOn: "2026-04-12",
  },
  {
    id: 4,
    title: "OOP internal assessment marks uploaded",
    body: "The internal assessment marks for CS304 — Object Oriented Programming have been uploaded to the student portal. Students are requested to verify their marks and report any discrepancies to the department office within 3 working days. No queries will be entertained after the deadline.",
    category: "Exam",
    target: "B.Tech Sem 3",
    targetBatch: "B.Tech Sem 3",
    targetSection: "All Sections",
    pinned: false,
    postedOn: "2026-04-10",
  },
  {
    id: 5,
    title: "Extra OOP lab session scheduled",
    body: "An additional OOP Lab session has been scheduled for Section B on Saturday 26th April 2026 from 10:00 AM to 12:00 PM in Lab L-02. Attendance is compulsory. Students are advised to complete Lab Cycle 2 before attending.",
    category: "General",
    target: "B.Tech Sem 3 · Section B",
    targetBatch: "B.Tech Sem 3",
    targetSection: "Section B",
    pinned: false,
    postedOn: "2026-04-08",
  },
  {
    id: 6,
    title: "Hackathon 2026 — team registration open",
    body: "Team registrations for Hackathon 2026 are now open. Students may form teams of 3 to 5 members. The hackathon will be held on 15th May 2026 from 9:00 AM. Problem statements will be released 30 minutes before the event begins. Register via the student portal under the Clubs section.",
    category: "Event",
    target: "All Students",
    targetBatch: "All Batches",
    targetSection: "All Sections",
    pinned: false,
    postedOn: "2026-04-05",
  },
];

export default function Notices() {
  const [notices, setNotices] = useState(initialNotices);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditing] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePost = (noticeData) => {
    if (editingNotice) {
      setNotices(prev => prev.map(n =>
        n.id === editingNotice.id ? { ...n, ...noticeData } : n
      ));
      showToast("Notice updated successfully!", "success");
    } else {
      const newNotice = {
        ...noticeData,
        id: Date.now(),
        postedOn: new Date().toISOString().split("T")[0],
      };
      setNotices(prev => [newNotice, ...prev]);
      showToast("Notice posted successfully!", "success");
    }
    setShowModal(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    setDeletingId(null);
    showToast("Notice deleted.", "error");
  };

  const togglePin = (id) => {
    setNotices(prev => prev.map(n =>
      n.id === id ? { ...n, pinned: !n.pinned } : n
    ));
    const notice = notices.find(n => n.id === id);
    showToast(!notice.pinned ? "Notice pinned to top." : "Notice unpinned.", "info");
  };

  const toggleExpand = (id) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Filtered and Sorted Logic
  const filteredNotices = useMemo(() => {
    return notices
      .filter(n => activeFilter === "All" || n.category === activeFilter)
      .filter(n =>
        searchQuery === "" ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.body.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.postedOn) - new Date(a.postedOn);
      });
  }, [notices, searchQuery, activeFilter]);

  const pinnedNotices = filteredNotices.filter(n => n.pinned);

  // Stats
  const stats = {
    total: notices.length,
    pinned: notices.filter(n => n.pinned).length,
    thisMonth: notices.filter(n => n.postedOn.startsWith('2026-04')).length
  };

  const categories = ["All", "Exam", "Event", "General"];

  const getCategoryColor = (cat, type = 'text') => {
    const colors = {
      Exam: { text: 'text-red-700', bg: 'bg-red-100', border: 'border-l-red-400' },
      Event: { text: 'text-purple-800', bg: 'bg-purple-100', border: 'border-l-purple-500' },
      General: { text: 'text-amber-700', bg: 'bg-amber-100', border: 'border-l-amber-400' }
    };
    return colors[cat]?.[type] || '';
  };

  return (
    <div className="min-h-screen mt-20 bg-[#FBF7F0] font-sans p-4 md:p-8">
      <h2 className="sr-only">Faculty notices page</h2>

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <nav className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Faculty Portal › Notices</nav>
          <h1 className="font-serif text-3xl text-purple-900">Notices</h1>
          <p className="text-slate-600 text-sm">Post and manage announcements for your students</p>
          <div className="w-12 h-0.5 bg-yellow-600 rounded mt-3"></div>
        </div>
        <button 
          onClick={() => { setEditing(null); setShowModal(true); }}
          className="bg-purple-900 text-amber-50 font-semibold px-6 py-2.5 rounded-xl hover:bg-purple-800 transition shadow-lg shadow-purple-900/10"
        >
          + Post New Notice
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-amber-200 rounded-xl p-4 border-t-4 border-t-purple-700">
          <div className="font-serif text-2xl font-bold text-purple-900">{stats.total}</div>
          <div className="text-[12px] text-slate-500 font-medium">Total notices posted</div>
          <div className="text-[11px] text-slate-400">since joining</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-4 border-t-4 border-t-amber-400">
          <div className="font-serif text-2xl font-bold text-yellow-600">{stats.pinned}</div>
          <div className="text-[12px] text-slate-500 font-medium">Pinned notices</div>
          <div className="text-[11px] text-slate-400">always on top</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-4 border-t-4 border-t-green-500">
          <div className="font-serif text-2xl font-bold text-green-600">{stats.thisMonth}</div>
          <div className="text-[12px] text-slate-500 font-medium">Posted this month</div>
          <div className="text-[11px] text-slate-400">April 2026</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 mb-8">
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            type="text"
            placeholder="Search notices by title or content..."
            className="w-full bg-white border border-amber-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all border ${
                activeFilter === cat 
                ? 'bg-purple-900 text-amber-50 border-purple-900 shadow-md' 
                : 'bg-white text-purple-700 border-amber-200 hover:bg-amber-50'
              }`}
            >
              {cat} <span className={`ml-1 opacity-60`}>({cat === "All" ? notices.length : notices.filter(n => n.category === cat).length})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pinned Section */}
      {pinnedNotices.length > 0 && !searchQuery && activeFilter === "All" && (
        <section className="mb-10">
          <div className="mb-4">
            <span className="text-[10px] font-bold text-yellow-600 tracking-widest uppercase">📌 Pinned</span>
            <h3 className="font-serif text-xl text-purple-900">Important notices</h3>
            <div className="w-8 h-0.5 bg-yellow-600 rounded mt-1"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pinnedNotices.map(notice => (
              <div key={notice.id} className="bg-amber-50 border-2 border-amber-400 rounded-xl p-5 relative shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-400 text-purple-900 text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1">
                      📌 PINNED
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${getCategoryColor(notice.category, 'bg')} ${getCategoryColor(notice.category, 'text')}`}>
                      {notice.category}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => togglePin(notice.id)} className="p-1.5 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors" title="Unpin">📌</button>
                    <button onClick={() => { setEditing(notice); setShowModal(true); }} className="p-1.5 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors">✏️</button>
                    <button onClick={() => setDeletingId(notice.id)} className="p-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">🗑️</button>
                  </div>
                </div>
                <h4 className="font-serif font-bold text-purple-900 text-[17px] mb-2 leading-snug">{notice.title}</h4>
                <p className="text-slate-600 text-[13px] leading-relaxed mb-4 line-clamp-3">{notice.body}</p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-amber-200/50">
                   <span className="bg-purple-100 text-purple-800 text-[10px] px-2.5 py-1 rounded-lg font-semibold">{notice.target}</span>
                   <span className="text-[10px] text-slate-400 italic">Posted {new Date(notice.postedOn).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric'})}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Notices */}
      <section>
        <div className="mb-4">
          <span className="text-[10px] font-bold text-yellow-600 tracking-widest uppercase">All Notices</span>
          <h3 className="font-serif text-xl text-purple-900">Posted notices</h3>
          <div className="w-8 h-0.5 bg-yellow-600 rounded mt-1"></div>
        </div>

        <div className="flex flex-col gap-4">
          {filteredNotices.length > 0 ? (
            filteredNotices.map(notice => {
              const isExpanded = expandedIds.includes(notice.id);
              const isDeleting = deletingId === notice.id;

              return (
                <div key={notice.id} className={`bg-white border border-amber-100 rounded-xl p-5 hover:border-purple-200 hover:shadow-sm transition-all border-l-4 ${getCategoryColor(notice.category, 'border')}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${getCategoryColor(notice.category, 'bg')} ${getCategoryColor(notice.category, 'text')}`}>
                        {notice.category}
                      </span>
                      {notice.pinned && <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-md font-bold">Pinned</span>}
                    </div>
                    <span className="text-[10px] text-slate-400">{new Date(notice.postedOn).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric'})}</span>
                  </div>

                  <h4 className="font-serif font-bold text-purple-900 text-lg mb-1">{notice.title}</h4>
                  <div className="relative">
                    <p className={`text-slate-600 text-[13px] leading-relaxed transition-all ${!isExpanded ? 'line-clamp-2' : ''}`}>
                      {notice.body}
                    </p>
                    {notice.body.length > 150 && (
                      <button 
                        onClick={() => toggleExpand(notice.id)}
                        className="text-purple-700 text-[11px] font-bold mt-1 hover:underline focus:outline-none"
                      >
                        {isExpanded ? "Show Less" : "Read More"}
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-amber-50 mt-4 gap-3">
                    <div className="flex items-center gap-3">
                      <span className="bg-purple-50 text-purple-700 text-[11px] px-3 py-1 rounded-lg font-medium">{notice.target}</span>
                      <span className="text-[10px] text-slate-400 font-medium">Posted by you</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isDeleting ? (
                        <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 animate-in fade-in slide-in-from-right-2">
                          <span className="text-red-700 text-[10px] font-bold">Delete?</span>
                          <button onClick={() => handleDelete(notice.id)} className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded">Yes</button>
                          <button onClick={() => setDeletingId(null)} className="text-[10px] font-bold text-slate-500">No</button>
                        </div>
                      ) : (
                        <>
                          <button 
                            onClick={() => togglePin(notice.id)} 
                            className="bg-amber-50 text-amber-800 text-[11px] px-3 py-1.5 rounded-lg font-bold hover:bg-amber-100 transition-colors"
                          >
                            {notice.pinned ? "Unpin" : "Pin 📌"}
                          </button>
                          <button 
                            onClick={() => { setEditing(notice); setShowModal(true); }}
                            className="bg-purple-50 text-purple-800 text-[11px] px-3 py-1.5 rounded-lg font-bold hover:bg-purple-100 transition-colors"
                          >
                            Edit ✏️
                          </button>
                          <button 
                            onClick={() => setDeletingId(notice.id)}
                            className="bg-red-50 text-red-700 text-[11px] px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 transition-colors"
                          >
                            Delete 🗑️
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-12 text-center flex flex-col items-center">
              <svg className="w-12 h-12 text-amber-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <h4 className="font-serif text-xl text-purple-900 mb-1">No notices found</h4>
              <p className="text-slate-500 text-sm mb-4">Try adjusting your search or filters</p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
                className="text-yellow-600 font-bold text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Post Modal */}
      <PostNoticeModal 
        isOpen={showModal} 
        onClose={() => { setShowModal(false); setEditing(null); }}
        onSubmit={handlePost}
        editingNotice={editingNotice}
      />

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-xl text-white text-sm font-bold shadow-2xl animate-in slide-in-from-bottom-5 transition-all flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-green-600' : 
          toast.type === 'error' ? 'bg-red-600' : 'bg-purple-700'
        }`}>
          {toast.type === 'success' && <span>✓</span>}
          {toast.message}
        </div>
      )}
    </div>
  );
}