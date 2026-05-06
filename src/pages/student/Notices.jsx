import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Pin, 
  Bookmark, 
  FileText, 
  Image as ImageIcon, 
  Share2, 
  Download, 
  Calendar,
  ChevronDown,
  X,
  CheckCircle2
} from 'lucide-react';

const Notices = () => {
  // --- Mock Data (Replace with API call later) ---
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Mid-Semester Examination Time Table - Summer 2026",
      content: "The official timetable for all departments has been released. Please download the PDF for detailed slot timings and room numbers.",
      category: "Exam",
      department: "All",
      postedBy: "Exam Controller",
      date: "2026-04-18",
      isPinned: true,
      hasAttachment: true,
      attachmentType: 'pdf',
      isRead: false
    },
    {
      id: 2,
      title: "Annual Tech Fest 'Udaan' - Poster Launch",
      content: "Get ready for the biggest event of the year! Registrations for robotic combat and hackathon open tonight.",
      category: "Event",
      department: "General",
      postedBy: "Student Council",
      date: "2026-04-19",
      isPinned: false,
      hasImage: true,
      imageUrl: "https://via.placeholder.com/400x200", // Placeholder
      isRead: true
    },
    {
      id: 3,
      title: "Placement Drive: Google Cloud India",
      content: "Eligibility: 7th Semester CE/IT students with CGPA > 8.5. Pre-placement talk in Seminar Hall.",
      category: "Placement",
      department: "CE/IT",
      postedBy: "T&P Cell",
      date: "2025-04-15",
      isPinned: false,
      isRead: false
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All"); // All, Bookmarks, Unread
  const [bookmarkedIds, setBookmarkedIds] = useState([1]);
  const [selectedDept, setSelectedDept] = useState("All");

  // --- Logic ---
  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredNotices = useMemo(() => {
    return notices.filter(notice => {
      const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === "All" || notice.department === selectedDept;
      const matchesTab = activeTab === "All" || 
                        (activeTab === "Bookmarks" && bookmarkedIds.includes(notice.id)) ||
                        (activeTab === "Unread" && !notice.isRead);
      return matchesSearch && matchesDept && matchesTab;
    });
  }, [searchQuery, selectedDept, activeTab, bookmarkedIds, notices]);

  const pinnedNotices = filteredNotices.filter(n => n.isPinned);
  const regularNotices = filteredNotices.filter(n => !n.isPinned);

  return (
    <div className="p-4 md:p-8 bg-[#FBF7F0] min-h-screen font-sans">
      
      {/* 1. Header & Controls */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-[#4A1D96] mb-2">Notice Board</h1>
          <p className="text-gray-600">Stay updated with the latest college announcements.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative group flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4A1D96] transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search notices..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-purple-100 rounded-xl focus:ring-2 focus:ring-[#4A1D96] outline-none transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Dept Filter */}
          <div className="relative">
            <select 
              className="appearance-none w-full bg-white border border-purple-100 px-4 py-2.5 pr-10 rounded-xl focus:ring-2 focus:ring-[#4A1D96] outline-none shadow-sm cursor-pointer"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="CE/IT">CE / IT</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>
      </header>

      {/* 2. Tabs */}
      <nav className="flex gap-6 border-b border-purple-100 mb-8 overflow-x-auto pb-1">
        {["All", "Unread", "Bookmarks"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold transition-all relative whitespace-nowrap ${
              activeTab === tab ? "text-[#4A1D96]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab} Feed
            {activeTab === tab && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706]" />
            )}
          </button>
        ))}
      </nav>

      {/* 3. Pinned Section (30% Secondary Color) */}
      {pinnedNotices.length > 0 && activeTab === "All" && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4 text-[#D97706]">
            <Pin size={18} />
            <span className="font-bold uppercase tracking-wider text-xs">Pinned Updates</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedNotices.map(notice => (
              <NoticeCard 
                key={notice.id} 
                notice={notice} 
                isPinned 
                bookmarked={bookmarkedIds.includes(notice.id)}
                onBookmark={() => toggleBookmark(notice.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 4. Main Feed */}
      <section className="space-y-4">
        <h3 className="font-serif text-xl text-[#4A1D96] mb-4">Recent Announcements</h3>
        <AnimatePresence mode='popLayout'>
          {filteredNotices.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-purple-100"
            >
              <p className="text-gray-400">No notices found matching your filters.</p>
            </motion.div>
          ) : (
            regularNotices.map(notice => (
              <NoticeCard 
                key={notice.id} 
                notice={notice} 
                bookmarked={bookmarkedIds.includes(notice.id)}
                onBookmark={() => toggleBookmark(notice.id)}
              />
            ))
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

// --- Sub-Component: NoticeCard ---
const NoticeCard = ({ notice, isPinned, bookmarked, onBookmark }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`relative group rounded-2xl p-5 transition-all flex flex-col sm:flex-row gap-5 ${
        isPinned 
        ? 'bg-[#4A1D96] text-white shadow-xl shadow-purple-200 border-l-4 border-[#D97706]' 
        : `bg-white border border-purple-100 shadow-sm hover:shadow-md ${!notice.isRead && 'border-l-4 border-[#D97706]'}`
      }`}
    >
      {/* Icon/Date Column */}
      <div className={`hidden sm:flex flex-col items-center justify-center min-w-[70px] h-[70px] rounded-xl border ${
        isPinned ? 'bg-purple-800 border-purple-600' : 'bg-[#FBF7F0] border-amber-100'
      }`}>
        <span className={`text-[10px] font-bold uppercase tracking-tighter ${isPinned ? 'text-purple-300' : 'text-gray-400'}`}>
          {new Date(notice.date).toLocaleString('default', { month: 'short' })}
        </span>
        <span className={`text-2xl font-bold ${isPinned ? 'text-amber-400' : 'text-[#4A1D96]'}`}>
          {new Date(notice.date).getDate()}
        </span>
      </div>

      {/* Content Column */}
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest ${
            isPinned ? 'bg-amber-400 text-[#4A1D96]' : 'bg-purple-100 text-[#4A1D96]'
          }`}>
            {notice.category}
          </span>
          <span className={`text-[11px] font-medium ${isPinned ? 'text-purple-200' : 'text-gray-400'}`}>
            • For {notice.department} Department
          </span>
          {!notice.isRead && !isPinned && (
             <span className="flex items-center gap-1 text-[10px] font-bold text-[#D97706]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D97706]" /> NEW
             </span>
          )}
        </div>

        <h2 className={`font-serif text-lg leading-tight mb-2 ${isPinned ? 'text-white' : 'text-gray-800 group-hover:text-[#4A1D96] transition-colors'}`}>
          {notice.title}
        </h2>
        
        <p className={`text-sm line-clamp-2 mb-4 ${isPinned ? 'text-purple-100' : 'text-gray-500'}`}>
          {notice.content}
        </p>

        {/* Attachments Preview */}
        {(notice.hasAttachment || notice.hasImage) && (
          <div className="flex gap-3 mb-4">
            {notice.hasAttachment && (
              <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isPinned ? 'bg-purple-800 border-purple-600 hover:bg-purple-700' : 'bg-amber-50 border-amber-200 text-[#D97706] hover:bg-amber-100'
              }`}>
                <FileText size={14} /> View PDF
              </button>
            )}
            {notice.hasImage && (
              <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isPinned ? 'bg-purple-800 border-purple-600 hover:bg-purple-700' : 'bg-white border-purple-100 text-gray-600 hover:bg-gray-50'
              }`}>
                <ImageIcon size={14} /> Image
              </button>
            )}
          </div>
        )}

        {/* Footer */}
        <div className={`flex items-center justify-between pt-3 border-t ${isPinned ? 'border-purple-800' : 'border-gray-50'}`}>
          <span className={`text-[11px] font-medium ${isPinned ? 'text-purple-300' : 'text-gray-400'}`}>
            By: {notice.postedBy}
          </span>
          <div className="flex gap-4">
            <button className="hover:scale-110 transition-transform"><Share2 size={16} className={isPinned ? 'text-purple-300' : 'text-gray-400'} /></button>
            <button onClick={onBookmark} className="hover:scale-110 transition-transform">
              <Bookmark 
                size={18} 
                className={bookmarked ? 'fill-[#D97706] text-[#D97706]' : (isPinned ? 'text-purple-300' : 'text-gray-400')} 
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Notices;