import React, { useState, useEffect, useCallback } from 'react';

// --- Static Data & Helpers ---

// Slot IDs match the slots array below:
// 1 → 9:00–10:00 AM  | 2 → 10:00–11:00 AM | 3 → Lunch (break)
// 4 → 11:20–12:10 PM | 5 → 12:10–1:00 PM  | 6 → Lunch (break)
// 7 → 1:50–2:40 PM   | 8 → 2:40–3:30 PM
const timetableData = {
  "MON-1": { subject: "Object Oriented Programming", code: "CS304", type: "Lecture", batch: "B.Tech Sem 3", section: "Section A", room: "A-103", time: "9:00 – 10:00 AM",   cancelled: false },
  "MON-2": { subject: "Object Oriented Programming", code: "CS304", type: "Lecture", batch: "B.Tech Sem 3", section: "Section B", room: "A-103", time: "10:00 – 11:00 AM",  cancelled: false },
  "MON-7": { subject: "OOP Lab",                     code: "CS306", type: "Lab",     batch: "B.Tech Sem 3", section: "Section A", room: "L-02",  time: "1:50 – 2:40 PM",   cancelled: false },
  "MON-8": { subject: "OOP Lab",                     code: "CS306", type: "Lab",     batch: "B.Tech Sem 3", section: "Section A", room: "L-02",  time: "2:40 – 3:30 PM",   cancelled: false },
  "TUE-2": { subject: "Object Oriented Programming", code: "CS304", type: "Lecture", batch: "B.Tech Sem 3", section: "Section A", room: "A-103", time: "10:00 – 11:00 AM",  cancelled: false },
  "TUE-4": { subject: "Object Oriented Programming", code: "CS304", type: "Lecture", batch: "B.Tech Sem 3", section: "Section B", room: "A-103", time: "11:20 – 12:10 PM",  cancelled: false },
  "TUE-7": { subject: "Discrete Maths Tutorial",     code: "CS303T",type: "Tutorial",batch: "B.Tech Sem 3", section: "Section A", room: "B-202", time: "1:50 – 2:40 PM",   cancelled: false },
  "WED-1": { subject: "OOP Lab",                     code: "CS306", type: "Lab",     batch: "B.Tech Sem 3", section: "Section B", room: "L-02",  time: "9:00 – 10:00 AM",   cancelled: false },
  "WED-2": { subject: "OOP Lab",                     code: "CS306", type: "Lab",     batch: "B.Tech Sem 3", section: "Section B", room: "L-02",  time: "10:00 – 11:00 AM",  cancelled: false },
  "WED-4": { subject: "Object Oriented Programming", code: "CS304", type: "Lecture", batch: "B.Tech Sem 3", section: "Section A", room: "A-103", time: "11:20 – 12:10 PM",  cancelled: true  },
  "WED-7": { subject: "Discrete Maths Tutorial",     code: "CS303T",type: "Tutorial",batch: "B.Tech Sem 3", section: "Section B", room: "B-202", time: "1:50 – 2:40 PM",   cancelled: false },
  "THU-1": { subject: "Object Oriented Programming", code: "CS304", type: "Lecture", batch: "B.Tech Sem 3", section: "Section B", room: "A-103", time: "9:00 – 10:00 AM",   cancelled: false },
  "THU-2": { subject: "Object Oriented Programming", code: "CS304", type: "Lecture", batch: "B.Tech Sem 3", section: "Section A", room: "A-103", time: "10:00 – 11:00 AM",  cancelled: false },
  "THU-7": { subject: "OOP Lab",                     code: "CS306", type: "Lab",     batch: "B.Tech Sem 3", section: "Section B", room: "L-02",  time: "1:50 – 2:40 PM",   cancelled: false },
  "THU-8": { subject: "OOP Lab",                     code: "CS306", type: "Lab",     batch: "B.Tech Sem 3", section: "Section B", room: "L-02",  time: "2:40 – 3:30 PM",   cancelled: false },
  "FRI-1": { subject: "Object Oriented Programming", code: "CS304", type: "Lecture", batch: "B.Tech Sem 3", section: "Section A", room: "A-103", time: "9:00 – 10:00 AM",   cancelled: false },
  "FRI-4": { subject: "Discrete Maths Tutorial",     code: "CS303T",type: "Tutorial",batch: "B.Tech Sem 3", section: "Section A", room: "B-202", time: "11:20 – 12:10 PM",  cancelled: false },
  "FRI-5": { subject: "Object Oriented Programming", code: "CS304", type: "Lecture", batch: "B.Tech Sem 3", section: "Section B", room: "A-103", time: "12:10 – 1:00 PM",   cancelled: false },
 
};

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
const dayNamesFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", ];

const slots = [
  { id: 1, label: "9:00 – 10:00 AM"  },
  { id: 2, label: "10:00 – 11:00 AM" },
  { id: 3, label: "Lunch" , isLunch:true},
  { id: 4, label: "11:20 – 12:10 PM"},
  { id: 5, label: "12:10 – 1:00 PM" },
  { id: 6, label: "Lunch" , isLunch:true},
  { id: 7, label: "1:50 – 2:40 PM"  },
  { id: 8, label: "2:40 – 3:30 PM"  },
  
];

const getWeekLabel = (offset) => {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1) + offset * 7);
  const saturday = new Date(monday);
  saturday.setDate(monday.getDate() + 5);
  return `Week of ${monday.toLocaleDateString('en-IN', { day:'numeric', month:'short' })} – ${saturday.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}`;
};

export default function Timetable() {
  const [schedule, setSchedule] = useState(timetableData);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedSlot, setSelected] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [toast, setToast] = useState(null);

  const todayIndex = new Date().getDay(); 
  const currentDayKey = weekOffset === 0 && todayIndex !== 0 ? days[todayIndex - 1] : null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCardClick = (day, slotId, classData) => {
    setSelected({ day, slotId, classData });
    setModalMode(classData.cancelled ? "restore" : "cancel");
    setCancelReason("");
  };

  const confirmCancel = () => {
    const key = `${selectedSlot.day}-${selectedSlot.slotId}`;
    setSchedule(prev => ({
      ...prev,
      [key]: { ...prev[key], cancelled: true },
    }));
    setSelected(null);
    setModalMode(null);
    showToast("Class marked as cancelled.", "error");
  };

  const confirmRestore = () => {
    const key = `${selectedSlot.day}-${selectedSlot.slotId}`;
    setSchedule(prev => ({
      ...prev,
      [key]: { ...prev[key], cancelled: false },
    }));
    setSelected(null);
    setModalMode(null);
    showToast("Class restored successfully.", "success");
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case 'Lab': return 'bg-amber-100 border-amber-300 text-amber-800 border-l-amber-500';
      case 'Tutorial': return 'bg-teal-50 border-teal-300 text-teal-800 border-l-teal-500';
      default: return 'bg-purple-100 border-purple-300 text-purple-900 border-l-purple-600';
    }
  };

  // Close modal on Escape
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') { setModalMode(null); setSelected(null); } };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen mt-20 font-sans text-slate-900 p-4 md:p-8">
      <h2 className="sr-only mt-20">Faculty timetable page</h2>

      {/* Section 1: Header */}
      <header className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <nav className="text-[10px] uppercase tracking-widest  text-slate-500 mb-1">
            Faculty Portal › My Timetable
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl text-purple-900 mb-2">My Timetable</h1>
          <p className="text-slate-600 font-medium">Dr. Vikram Joshi · Object Oriented Programming · CS Department</p>
          <div className="w-12 h-0.5 bg-yellow-600 rounded mt-3"></div>
        </div>
        
        <div className="flex items-center gap-2 text-slate-500 text-sm bg-white px-4 py-2 rounded-lg border border-amber-100 shadow-sm">
          <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
        </div>
      </header>

      {/* Section 2: Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-amber-200 border-t-4 border-t-purple-900 rounded-xl p-4">
          <div className="font-serif text-2xl font-bold text-purple-900">14</div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-tight">Classes this week</div>
          <div className="text-[11px] text-slate-400">across 3 subjects</div>
        </div>
        <div className="bg-white border border-amber-200 border-t-4 border-t-red-500 rounded-xl p-4">
          <div className="font-serif text-2xl font-bold text-red-600">1</div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-tight">Cancelled this week</div>
          <div className="text-[11px] text-slate-400">marked as cancelled</div>
        </div>
        <div className="bg-white border border-amber-200 border-t-4 border-t-amber-400 rounded-xl p-4">
          <div className="font-serif text-2xl font-bold text-amber-600">8</div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-tight">Free periods</div>
          <div className="text-[11px] text-slate-400">across the week</div>
        </div>
      </div>

      {/* Section 3: Week Navigation */}
      <div className="mb-6">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <button 
            onClick={() => setWeekOffset(prev => prev - 1)}
            className="text-purple-700 hover:bg-purple-50 p-2 rounded-full transition-colors"
          >
            ← Prev
          </button>
          <div className="text-center">
            <h3 className="font-serif font-bold text-purple-900">{getWeekLabel(weekOffset)}</h3>
            {weekOffset === 0 && (
              <span className="inline-block bg-amber-400 text-purple-900 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">
                THIS WEEK
              </span>
            )}
          </div>
          <button 
            onClick={() => setWeekOffset(prev => prev + 1)}
            className="text-purple-700 hover:bg-purple-50 p-2 rounded-full transition-colors"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Section 4: Weekly Timetable Grid */}
      <div className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <div className="grid" style={{ gridTemplateColumns: '80px repeat(6, minmax(160px, 1fr))' }}>
            {/* Column Headers */}
            <div className="bg-amber-50/50 border-b border-r border-amber-100 flex items-center justify-center p-2">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-tighter">Time</span>
            </div>
            {days.map((day) => (
              <div key={day} className={`${currentDayKey === day ? 'bg-amber-400 text-purple-900' : 'bg-purple-900 text-amber-50'} py-3 text-center border-b border-purple-800/20`}>
                <div className="text-sm font-bold tracking-widest">{day}</div>
                {currentDayKey === day && (
                  <span className="bg-white text-purple-900 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Today</span>
                )}
              </div>
            ))}

            {/* Time Slot Rows */}
            {slots.map((slot) => (
              <React.Fragment key={slot.id}>
                {slot.isLunch ? (
                  // Lunch row: spans ALL 7 columns (time label + 6 day columns)
                  <div className="col-span-7 bg-amber-100/60 border-b border-amber-200 text-amber-800 text-center text-xs font-bold py-3 flex items-center justify-center gap-2 italic">
                    <span className="w-4 h-px bg-amber-400"></span>
                    🍽 Lunch Break
                    <span className="w-4 h-px bg-amber-400"></span>
                  </div>
                ) : (
                  <>
                    {/* Time Label */}
                    <div className="bg-amber-50 border-b border-r border-amber-200 text-[10px] text-amber-800 font-bold px-2 py-6 text-center flex items-center justify-center">
                      {slot.label}
                    </div>

                    {/* Day Cells */}
                    {days.map((day) => {
                      const classItem = schedule[`${day}-${slot.id}`];
                      const isToday = currentDayKey === day;

                      return (
                        <div key={`${day}-${slot.id}`} className="border-b border-r border-amber-50 p-1.5 min-h-[110px] bg-white">
                          {classItem ? (
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={() => handleCardClick(day, slot.id, classItem)}
                              aria-label={`${classItem.subject} ${classItem.type}, ${classItem.room}, ${day} ${classItem.time}. ${classItem.cancelled ? 'Cancelled. Click to restore.' : 'Click to cancel.'}`}
                              className={`
                                relative group h-full rounded-lg p-2.5 text-xs flex flex-col justify-between transition-all cursor-pointer
                                ${getTypeStyles(classItem.type)}
                                ${classItem.cancelled ? 'opacity-60 grayscale-[0.5] border-red-300 bg-red-50' : 'hover:shadow-md hover:-translate-y-0.5'}
                                ${isToday && !classItem.cancelled ? 'ring-2 ring-purple-400 ring-offset-1' : ''}
                              `}
                            >
                              <div>
                                <div className="flex justify-between items-start mb-1">
                                  <span className="bg-white/80 text-purple-900 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold">
                                    {classItem.code}
                                  </span>
                                  <span className={`text-[9px] font-bold uppercase tracking-tighter ${classItem.cancelled ? 'text-red-600' : ''}`}>
                                    {classItem.type}
                                  </span>
                                </div>
                                <div className="font-bold text-purple-900 leading-tight line-clamp-2">
                                  {classItem.subject}
                                </div>
                              </div>

                              <div className="mt-2 space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="bg-white/60 text-amber-900 px-1.5 py-0.5 rounded text-[9px] font-bold">
                                    {classItem.room}
                                  </span>
                                  <span className="text-purple-700 text-[9px] font-medium">{classItem.section}</span>
                                </div>
                              </div>

                              {classItem.cancelled && (
                                <div className="absolute inset-0 flex items-center justify-center bg-red-500/10 rounded-lg pointer-events-none">
                                  <div className="text-red-700 font-black text-[10px] tracking-[0.2em] rotate-[-15deg] border-2 border-red-700 px-2 py-0.5 rounded uppercase">
                                    Cancelled
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="h-full border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50/30">
                              <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Free</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Section 5: Today's Classes Summary Strip */}
      <section className="mt-12">
        <div className="mb-4">
          <div className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.2em] mb-1">Today's Classes</div>
          <h3 className="font-serif text-2xl text-purple-900">
            {currentDayKey ? `${dayNamesFull[todayIndex]}'s Schedule` : "No classes scheduled for today"}
          </h3>
          <div className="w-8 h-0.5 bg-yellow-600 rounded mt-2"></div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
          {currentDayKey && Object.entries(schedule)
            .filter(([key]) => key.startsWith(currentDayKey))
            .sort(([keyA], [keyB]) => keyA.split('-')[1] - keyB.split('-')[1])
            .map(([key, item]) => (
              <div 
                key={key} 
                className={`min-w-[260px] bg-white border border-amber-200 rounded-xl p-4 shadow-sm border-l-4 ${getTypeStyles(item.type).split(' ').find(c => c.startsWith('border-l-'))}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="text-purple-900 font-bold text-sm">{item.time}</div>
                  {item.cancelled ? (
                    <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Cancelled</span>
                  ) : (
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                      Room {item.room}
                    </span>
                  )}
                </div>
                <div className="text-slate-500 text-[10px] font-mono mb-1">{item.code}</div>
                <div className="font-serif text-lg text-purple-900 font-bold leading-tight mb-2">{item.subject}</div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs">{item.batch} · {item.section}</span>
                </div>
              </div>
            ))}
          
          {!currentDayKey || Object.entries(schedule).filter(([key]) => key.startsWith(currentDayKey)).length === 0 ? (
             <div className="w-full bg-amber-50 border border-amber-100 rounded-2xl p-8 text-center flex flex-col items-center">
                <svg className="w-10 h-10 text-amber-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-amber-800 font-medium">Enjoy your day off, Dr. Joshi!</p>
             </div>
          ) : null}
        </div>
      </section>

      {/* Section 6: Cancel/Restore Modal */}
      {modalMode && (
        <div 
          className="fixed inset-0 bg-purple-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => { setModalMode(null); setSelected(null); }}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-1.5 bg-amber-400 w-full"></div>
            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${modalMode === 'cancel' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {modalMode === 'cancel' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <h3 className="font-serif text-2xl text-purple-900">
                  {modalMode === 'cancel' ? "Mark class as cancelled?" : "Restore this class?"}
                </h3>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                <div className="font-bold text-purple-900 mb-1">{selectedSlot.classData.subject} ({selectedSlot.classData.code})</div>
                <div className="text-xs text-slate-600 flex justify-between">
                  <span>{selectedSlot.day} · {selectedSlot.classData.time}</span>
                  <span>Room {selectedSlot.classData.room}</span>
                </div>
              </div>

              {modalMode === 'cancel' && (
                <textarea
                  placeholder="Reason for cancellation (optional)"
                  rows={3}
                  className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none mb-6 transition-all"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
              )}

              <div className="flex gap-3">
                <button 
                  onClick={() => { setModalMode(null); setSelected(null); }}
                  className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors"
                >
                  Go Back
                </button>
                {modalMode === 'cancel' ? (
                  <button 
                    onClick={confirmCancel}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                  >
                    Confirm Cancellation
                  </button>
                ) : (
                  <button 
                    onClick={confirmRestore}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                  >
                    Restore Class
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-60 px-6 py-3 rounded-xl text-white text-sm font-bold shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-300 ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
          {toast.type === 'error' ? (
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round"/></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round"/></svg>
          )}
          {toast.message}
        </div>
      )}
    </div>
  );
}