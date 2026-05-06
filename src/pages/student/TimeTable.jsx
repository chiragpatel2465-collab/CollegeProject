import React, { useState, useMemo } from 'react';

// --- Dummy Data ---
const SUBJECTS = {
  CS301: {
    name: "Data Structures",
    code: "CS301",
    faculty: "Prof. Ramesh Patel",
    type: "Lecture",
    room: "A-101",
    assignments: [
      { title: "Linked List Implementation", due: "22 Apr", status: "Completed" },
      { title: "Binary Tree Traversal", due: "28 Apr", status: "Pending" },
    ],
    manual: "DS Lab Manual Unit 3"
  },
  CS302: {
    name: "Computer Organization",
    code: "CS302",
    faculty: "Dr. Sneha Mehta",
    type: "Lecture",
    room: "A-102",
    assignments: [
      { title: "ALU Design Report", due: "20 Apr", status: "Pending" },
    ],
    manual: "CO Lab Manual Unit 2"
  },
  CS303: {
    name: "Discrete Mathematics",
    code: "CS303",
    faculty: "Prof. Anjali Shah",
    type: "Lecture",
    room: "B-201",
    assignments: [
      { title: "Graph Theory Problems", due: "25 Apr", status: "Completed" },
      { title: "Set Theory Worksheet", due: "30 Apr", status: "Pending" },
    ]
  },
  CS304: {
    name: "Object Oriented Programming",
    code: "CS304",
    faculty: "Dr. Vikram Joshi",
    type: "Lecture",
    room: "A-103",
    assignments: [
      { title: "Inheritance & Polymorphism", due: "23 Apr", status: "Pending" },
      { title: "Design Patterns Report", due: "5 May", status: "Pending" },
    ],
    manual: "OOP Lab Manual Unit 4"
  },
  CS305: {
    name: "Data Structures Lab",
    code: "CS305",
    faculty: "Prof. Ramesh Patel",
    type: "Lab",
    room: "L-01",
    assignments: [],
    manual: "DS Lab Cycle 3"
  },
  CS306: {
    name: "OOP Lab",
    code: "CS306",
    faculty: "Dr. Vikram Joshi",
    type: "Lab",
    room: "L-02",
    assignments: [],
    manual: "OOP Lab Cycle 2"
  },
  CS303T: {
    name: "Discrete Maths Tutorial",
    code: "CS303T",
    faculty: "Prof. Anjali Shah",
    type: "Tutorial",
    room: "B-202",
    assignments: []
  }
};

const SCHEDULE = [
  { time: "8-9 AM", slots: ["CS301", "CS302", "CS303", "CS301", "CS304", "CS303T"] },
  { time: "9-10 AM", slots: ["CS302", "CS303", "CS304", "CS302", "CS301", "CS305"] },
  { time: "10-11 AM", slots: ["CS303", "CS304", "CS301", "CS303", "CS302", "CS305"] },
  { time: "11-12 PM", slots: ["Free", "CS305", "CS302", "CS304", "CS303", "CS306"] },
  { time: "12-1 PM", slots: ["Lunch", "Lunch", "Lunch", "Lunch", "Lunch", "Lunch"] },
  { time: "1-2 PM", slots: ["CS304", "Free", "CS306", "Free", "CS305", "Free"] },
  { time: "2-3 PM", slots: ["CS305", "CS306", "Free", "CS305", "CS306", "Free"] },
  { time: "3-4 PM", slots: ["CS306", "CS301", "CS304", "CS306", "Free", "Free"] },
  { time: "4-5 PM", slots: ["Free", "CS303T", "CS303T", "CS303T", "CS303T", "Free"] },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Timetable() {
  const [selectedSlot, setSelectedSlot] = useState(null);

  // --- Logic Helpers ---
  const todayName = useMemo(() => {
    const dayIndex = new Date().getDay();
    return DAYS[dayIndex - 1] || ""; // Adjusting because Sunday is 0
  }, []);

  const stats = useMemo(() => {
    let totalClasses = 0;
    let labSessions = 0;
    let pendingAssignments = 0;

    SCHEDULE.forEach(row => {
      row.slots.forEach(code => {
        if (code !== "Free" && code !== "Lunch") {
          totalClasses++;
          if (SUBJECTS[code]?.type === "Lab") labSessions++;
        }
      });
    });

    Object.values(SUBJECTS).forEach(sub => {
      sub.assignments?.forEach(asn => {
        if (asn.status === "Pending") pendingAssignments++;
      });
    });

    return { totalClasses, labSessions, pendingAssignments };
  }, []);

  const getBadgeStyles = (type) => {
    switch (type) {
      case "Lecture": return "bg-amber-100 text-amber-800";
      case "Lab": return "bg-purple-100 text-purple-800";
      case "Tutorial": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSlotClick = (dayIndex, timeIndex, code) => {
    if (code === "Free" || code === "Lunch") return;
    if (selectedSlot?.day === dayIndex && selectedSlot?.time === timeIndex) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot({ day: dayIndex, time: timeIndex, code });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans text-gray-900 p-4 md:p-8">
      <h1 className="sr-only">Student Timetable Dashboard</h1>

      {/* --- Page Header --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-purple-900 mb-1">My Timetable</h2>
          <p className="text-gray-600 font-medium">B.Tech — Semester 3 · Academic Year 2024–25</p>
          <div className="w-12 h-0.5 bg-yellow-600 mt-2"></div>
        </div>
        <div className="text-right">
          <p className="text-purple-900 font-semibold text-lg">
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </header>

      {/* --- Summary Stats Bar --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Classes this Week", value: stats.totalClasses },
          { label: "Pending Assignments", value: stats.pendingAssignments },
          { label: "Lab Sessions", value: stats.labSessions },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-amber-200 rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-bold text-yellow-600 mt-1">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* --- Weekly Timetable Grid --- */}
      <section className="bg-white rounded-xl shadow-md border border-amber-100 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px] grid grid-cols-7 border-b border-amber-100">
            {/* Time Header Column */}
            <div className="p-4 bg-purple-900 text-white font-serif text-center">Time</div>
            {/* Day Header Columns */}
            {DAYS.map((day) => (
              <div 
                key={day} 
                className={`p-4 text-center font-serif text-lg relative ${
                  day === todayName ? "bg-purple-50 text-purple-900 border-x border-purple-300" : "bg-purple-900 text-white"
                }`}
              >
                {day}
                {day === todayName && (
                  <span className="absolute top-1 left-1/2 -translate-x-1/2 bg-yellow-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter">Today</span>
                )}
              </div>
            ))}

            {/* Timetable Body */}
            {SCHEDULE.map((row, timeIdx) => (
              <React.Fragment key={timeIdx}>
                {/* Time Slot */}
                <div className="p-4 border-b border-r border-amber-100 bg-amber-50/50 flex items-center justify-center font-semibold text-purple-900">
                  {row.time}
                </div>
                {/* Subject Slots */}
                {row.slots.map((code, dayIdx) => {
                  const subject = SUBJECTS[code];
                  const isFree = code === "Free";
                  const isLunch = code === "Lunch";
                  const isSelected = selectedSlot?.day === dayIdx && selectedSlot?.time === timeIdx;
                  const hasPending = subject?.assignments?.some(a => a.status === "Pending");

                  return (
                    <div 
                      key={dayIdx} 
                      onClick={() => handleSlotClick(dayIdx, timeIdx, code)}
                      className={`p-3 border-b border-r border-amber-100 transition-all cursor-pointer group relative
                        ${dayIdx === DAYS.indexOf(todayName) ? "bg-purple-50/30" : "bg-white"}
                        ${isSelected ? "ring-2 ring-inset ring-purple-700 z-10" : "hover:bg-amber-50"}
                        ${(isFree || isLunch) ? "cursor-default" : ""}
                      `}
                    >
                      {isLunch ? (
                        <div className="h-full flex items-center justify-center text-gray-400 font-serif italic uppercase tracking-widest">Lunch Break</div>
                      ) : isFree ? (
                        <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-100 text-gray-300 text-xs py-4">Free period</div>
                      ) : (
                        <div className="flex flex-col h-full">
                          <div className="flex justify-between items-start mb-1">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getBadgeStyles(subject.type)}`}>
                              {subject.type}
                            </span>
                            {subject.assignments?.length > 0 && (
                                <div className="flex items-center gap-1">
                                    <span className={`w-2 h-2 rounded-full ${hasPending ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                    <span className="text-[9px] text-gray-500 font-bold">{subject.assignments.length}</span>
                                </div>
                            )}
                          </div>
                          <h4 className="font-serif font-bold text-purple-900 leading-tight group-hover:text-yellow-600">{subject.name}</h4>
                          <p className="text-[11px] text-gray-500 mt-1">{subject.faculty}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* --- Slot Detail Expand Panel --- */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${selectedSlot ? 'max-h-[500px] border-t-4 border-yellow-600 bg-white' : 'max-h-0'}`}>
          {selectedSlot && (
            <div className="p-6 relative">
              <button 
                onClick={() => setSelectedSlot(null)}
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-purple-900"
              >
                &times;
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Subject Info */}
                <div className="space-y-4">
                  <div>
                    <span className={`inline-block text-xs px-3 py-1 rounded-full font-bold uppercase mb-2 ${getBadgeStyles(SUBJECTS[selectedSlot.code].type)}`}>
                        {SUBJECTS[selectedSlot.code].type}
                    </span>
                    <h3 className="font-serif text-2xl text-purple-900">{SUBJECTS[selectedSlot.code].name} — {selectedSlot.code}</h3>
                    <p className="text-gray-600 font-medium">{SUBJECTS[selectedSlot.code].faculty} (Dept. of CS)</p>
                  </div>
                  
                  <div className="flex gap-6 text-sm">
                    <div className="bg-amber-50 p-3 rounded-lg flex-1">
                        <p className="text-gray-500 uppercase text-[10px] font-bold">Room/Hall</p>
                        <p className="text-purple-900 font-bold text-lg">{SUBJECTS[selectedSlot.code].room}</p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg flex-1">
                        <p className="text-gray-500 uppercase text-[10px] font-bold">Timing</p>
                        <p className="text-purple-900 font-bold text-lg">{SCHEDULE[selectedSlot.time].time}</p>
                    </div>
                  </div>
                </div>

                {/* Right: Assignments & Manual */}
                <div className="border-l border-gray-100 pl-0 md:pl-8">
                  <h4 className="font-serif text-lg text-purple-900 mb-3 underline decoration-yellow-600 underline-offset-4">Assignments & Resources</h4>
                  
                  <div className="space-y-3 mb-6">
                    {SUBJECTS[selectedSlot.code].assignments?.length > 0 ? (
                      SUBJECTS[selectedSlot.code].assignments.map((asn, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100">
                          <div>
                            <p className="text-sm font-bold text-gray-800">{asn.title}</p>
                            <p className="text-[10px] text-gray-500">Due: {asn.due}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded ${asn.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {asn.status}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 italic">No assignments posted for this subject.</p>
                    )}
                  </div>

                  {SUBJECTS[selectedSlot.code].manual && (
                    <div className="bg-purple-900/5 p-4 rounded-xl border border-purple-100">
                      <p className="text-xs font-bold text-purple-900 mb-2">Subject Lab Manual</p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">{SUBJECTS[selectedSlot.code].manual}</p>
                        <button className="bg-amber-400 text-yellow-900 text-xs font-bold px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors shadow-sm">
                          Download PDF
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}