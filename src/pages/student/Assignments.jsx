import React, { useState, useMemo, useEffect } from "react";

// --- DUMMY DATA ---
const assignments = [
  {
    id: 1, subjectCode: "CS301", subjectName: "Data Structures", faculty: "Prof. Ramesh Patel", subjectType: "Lecture",
    title: "Linked List Implementation", description: "Implement singly and doubly linked lists in C++. Include insertion, deletion, and traversal operations with proper documentation and time complexity analysis.",
    postedOn: "2026-04-05", dueDate: "2026-04-22", status: "Submitted", submittedOn: "2026-04-20", attachments: ["DS_Assignment1_Instructions.pdf"],
  },
  {
    id: 2, subjectCode: "CS301", subjectName: "Data Structures", faculty: "Prof. Ramesh Patel", subjectType: "Lecture",
    title: "Binary Tree Traversal", description: "Write programs for inorder, preorder and postorder traversal of a binary tree. Also implement level-order traversal using a queue.",
    postedOn: "2026-04-10", dueDate: "2026-04-28", status: "Pending", submittedOn: null, attachments: ["BinaryTree_Reference.pdf"],
  },
  {
    id: 3, subjectCode: "CS302", subjectName: "Computer Organization", faculty: "Dr. Sneha Mehta", subjectType: "Lecture",
    title: "ALU Design Report", description: "Design a 4-bit ALU supporting ADD, SUB, AND, OR operations. Provide truth tables, circuit diagrams and a brief report explaining design decisions.",
    postedOn: "2026-04-08", dueDate: "2026-04-19", status: "Late", submittedOn: null, attachments: ["ALU_Design_Guidelines.pdf", "Circuit_Template.docx"],
  },
  {
    id: 4, subjectCode: "CS303", subjectName: "Discrete Mathematics", faculty: "Prof. Anjali Shah", subjectType: "Lecture",
    title: "Graph Theory Problems", description: "Solve the given problem set on graph theory. Topics include Eulerian paths, Hamiltonian circuits, graph coloring and minimum spanning trees.",
    postedOn: "2026-04-01", dueDate: "2026-04-25", status: "Submitted", submittedOn: "2026-04-18", attachments: [],
  },
  {
    id: 5, subjectCode: "CS303", subjectName: "Discrete Mathematics", faculty: "Prof. Anjali Shah", subjectType: "Lecture",
    title: "Set Theory Worksheet", description: "Complete the worksheet on sets, relations and functions. Include proofs for De Morgan's laws and properties of relations.",
    postedOn: "2026-04-12", dueDate: "2026-04-30", status: "Pending", submittedOn: null, attachments: ["SetTheory_Worksheet.pdf"],
  },
  {
    id: 6, subjectCode: "CS304", subjectName: "Object Oriented Programming", faculty: "Dr. Vikram Joshi", subjectType: "Lecture",
    title: "Inheritance & Polymorphism", description: "Build a mini project demonstrating all four OOP pillars — Encapsulation, Abstraction, Inheritance and Polymorphism — using Java or C++.",
    postedOn: "2026-04-09", dueDate: "2026-04-23", status: "Pending", submittedOn: null, attachments: ["OOP_Project_Guidelines.pdf"],
  },
  {
    id: 7, subjectCode: "CS304", subjectName: "Object Oriented Programming", faculty: "Dr. Vikram Joshi", subjectType: "Lecture",
    title: "Design Patterns Report", description: "Write a report on any 5 design patterns (creational, structural or behavioral). Include UML diagrams and real-world use cases for each.",
    postedOn: "2026-04-14", dueDate: "2026-05-05", status: "Pending", submittedOn: null, attachments: [],
  },
  {
    id: 8, subjectCode: "CS305", subjectName: "Data Structures Lab", faculty: "Prof. Ramesh Patel", subjectType: "Lab",
    title: "Lab Cycle 3 — Stack & Queue", description: "Implement stack using arrays and queues using linked lists. Demonstrate push, pop, enqueue and dequeue operations with sample inputs.",
    postedOn: "2026-04-07", dueDate: "2026-04-21", status: "Submitted", submittedOn: "2026-04-19", attachments: ["LabCycle3_Instructions.pdf"],
  },
  {
    id: 9, subjectCode: "CS306", subjectName: "OOP Lab", faculty: "Dr. Vikram Joshi", subjectType: "Lab",
    title: "Lab Cycle 2 — Exception Handling", description: "Write Java programs demonstrating try-catch-finally, custom exceptions and multi-catch blocks. Submit source code and output screenshots.",
    postedOn: "2026-04-11", dueDate: "2026-04-26", status: "Pending", submittedOn: null, attachments: ["LabCycle2_Reference.pdf"],
  },
  {
    id: 10, subjectCode: "CS303T", subjectName: "Discrete Maths Tutorial", faculty: "Prof. Anjali Shah", subjectType: "Tutorial",
    title: "Tutorial Sheet 4 — Logic & Proofs", description: "Solve all 15 problems from Tutorial Sheet 4. Topics include propositional logic, predicate logic, proof by induction and contradiction.",
    postedOn: "2026-04-13", dueDate: "2026-04-27", status: "Pending", submittedOn: null, attachments: ["TutorialSheet4.pdf"],
  },
];

// --- HELPER LOGIC ---
function getDueDateInfo(dueDateStr, status) {
  if (status === "Submitted") {
    return { label: "Submitted", color: "text-green-600", borderColor: "border-green-300", urgent: false };
  }
  // Hardcoded to the context date for accurate presentation of dummy data
  const today = new Date("2026-04-19T00:00:00"); 
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDateStr);
  due.setHours(0, 0, 0, 0);
  
  const diff = Math.round((due - today) / (1000 * 60 * 60 * 24));
  
  if (diff < 0) return { label: `Overdue by ${Math.abs(diff)} day${Math.abs(diff) > 1 ? "s" : ""}`, color: "text-red-600", borderColor: "border-red-400", urgent: true };
  if (diff === 0) return { label: "Due today", color: "text-red-600", borderColor: "border-red-400", urgent: true };
  if (diff === 1) return { label: "Due tomorrow", color: "text-amber-600", borderColor: "border-amber-400", urgent: true };
  if (diff <= 3) return { label: `Due in ${diff} days`, color: "text-amber-500", borderColor: "border-amber-400", urgent: false };
  
  return { label: new Date(dueDateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), color: "text-gray-500", borderColor: "border-green-300", urgent: false };
}

// --- MAIN COMPONENT ---
export default function Assignments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Close drawer on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedAssignment(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Stats calculation
  const stats = useMemo(() => {
    return assignments.reduce(
      (acc, curr) => {
        acc.total++;
        if (curr.status === "Pending") acc.pending++;
        if (curr.status === "Submitted") acc.submitted++;
        if (curr.status === "Late") acc.late++;
        return acc;
      },
      { total: 0, pending: 0, submitted: 0, late: 0 }
    );
  }, []);

  // Filtering & Grouping
  const groupedAssignments = useMemo(() => {
    let filtered = assignments.filter((a) => {
      if (activeFilter !== "All" && a.status !== activeFilter) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          a.title.toLowerCase().includes(query) ||
          a.subjectName.toLowerCase().includes(query) ||
          a.faculty.toLowerCase().includes(query)
        );
      }
      return true;
    });

    const groups = {};
    filtered.forEach((a) => {
      if (!groups[a.subjectCode]) {
        groups[a.subjectCode] = {
          subjectName: a.subjectName,
          subjectCode: a.subjectCode,
          faculty: a.faculty,
          items: [],
        };
      }
      groups[a.subjectCode].items.push(a);
    });

    return Object.values(groups);
  }, [searchQuery, activeFilter]);

  const currentDate = new Date("2026-04-19").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-amber-50 font-sans text-gray-800 p-4 sm:p-6 lg:p-8 relative overflow-x-hidden pt-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;700&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
      `}</style>
      
      <h2 className="sr-only">Student assignments page</h2>

      {/* --- SECTION 1: HEADER & STATS --- */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-purple-900 mb-1">Assignments</h1>
            <p className="text-sm text-gray-500 mb-3">B.Tech — Semester 3 · All subjects</p>
            <div className="w-12 h-0.5 bg-yellow-600 rounded"></div>
          </div>
          <div className="text-sm font-medium text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
            {currentDate}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total assignments" value={stats.total} colorClass="text-purple-900" borderTop="border-t-purple-600" />
          <StatCard label="Pending" value={stats.pending} colorClass="text-amber-600" borderTop="border-t-amber-400" />
          <StatCard label="Submitted" value={stats.submitted} colorClass="text-green-600" borderTop="border-t-green-500" />
          <StatCard label="Late / Overdue" value={stats.late} colorClass="text-red-600" borderTop="border-t-red-500" />
        </div>

        {/* --- SECTION 2: SEARCH & FILTERS --- */}
        <div className="space-y-4 pt-4">
          <div className="relative max-w-2xl">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by subject, title or faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 transition-shadow"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterTab label="All" count={stats.total} active={activeFilter === "All"} onClick={() => setActiveFilter("All")} />
            <FilterTab label="Pending" count={stats.pending} active={activeFilter === "Pending"} onClick={() => setActiveFilter("Pending")} />
            <FilterTab label="Submitted" count={stats.submitted} active={activeFilter === "Submitted"} onClick={() => setActiveFilter("Submitted")} />
            <FilterTab label="Late" count={stats.late} active={activeFilter === "Late"} onClick={() => setActiveFilter("Late")} />
          </div>
        </div>

        {/* --- SECTION 3: SUBJECT GROUPS --- */}
        <div className="space-y-8 pt-6 pb-20">
          {groupedAssignments.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-amber-100">
              No assignments found matching your criteria.
            </div>
          ) : (
            groupedAssignments.map((group) => (
              <div key={group.subjectCode} className="space-y-4">
                <div className="flex items-end justify-between border-b border-amber-200 pb-2">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-purple-900">
                      {group.subjectName} <span className="text-purple-700 opacity-75">— {group.subjectCode}</span>
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{group.faculty}</p>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {group.items.length} {group.items.length === 1 ? "assignment" : "assignments"}
                  </span>
                </div>

                {/* --- SECTION 4: CARDS GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.items.map((assignment) => (
                    <AssignmentCard 
                      key={assignment.id} 
                      assignment={assignment} 
                      onClick={() => setSelectedAssignment(assignment)} 
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* --- SECTION 5: DETAILS DRAWER --- */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-amber-200 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          selectedAssignment ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!selectedAssignment}
      >
        {selectedAssignment && (
          <div className="h-full flex flex-col">
            <div className="h-1 bg-amber-400 w-full shrink-0"></div>
            
            <div className="p-4 flex justify-end shrink-0">
              <button 
                onClick={() => setSelectedAssignment(null)}
                className="p-2 hover:bg-amber-50 rounded-full text-gray-500 transition-colors"
                aria-label="Close details"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-6">
              <div>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded mb-3">
                  {selectedAssignment.subjectCode} — {selectedAssignment.subjectType}
                </span>
                <h2 className="text-2xl font-serif font-bold text-purple-900 mb-3">{selectedAssignment.title}</h2>
                <StatusBadge status={selectedAssignment.status} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <p className="text-gray-500 text-xs">Posted by</p>
                  <p className="font-medium text-gray-900">{selectedAssignment.faculty}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Posted on</p>
                  <p className="font-medium text-gray-900">{new Date(selectedAssignment.postedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <p className="text-sm text-gray-600 mb-1">Last date of submission</p>
                <p className="text-2xl font-serif font-bold text-yellow-600 mb-1">
                  {new Date(selectedAssignment.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                {(() => {
                  const dueInfo = getDueDateInfo(selectedAssignment.dueDate, selectedAssignment.status);
                  if (selectedAssignment.status !== "Submitted") {
                    return <p className={`text-sm font-bold ${dueInfo.color}`}>{dueInfo.label}</p>;
                  }
                  return null;
                })()}
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedAssignment.description}
                </p>
              </div>

              {selectedAssignment.attachments.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Attachments</h4>
                  <div className="space-y-2">
                    {selectedAssignment.attachments.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white border border-amber-100 rounded-lg shadow-sm">
                        <span className="text-sm text-gray-700 truncate mr-3">{file}</span>
                        <button className="shrink-0 bg-amber-400 hover:bg-amber-500 text-yellow-900 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <hr className="border-amber-200" />

              {/* Submit Area */}
              <div>
                {selectedAssignment.status === "Submitted" ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-green-700 font-semibold mb-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Assignment submitted successfully
                    </div>
                    <p className="text-xs text-green-600 mb-3">
                      Submitted on {new Date(selectedAssignment.submittedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    <button className="text-sm text-purple-700 hover:text-purple-900 underline font-medium">
                      Re-submit assignment
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Submit your assignment</h4>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-amber-300 rounded-xl cursor-pointer bg-amber-50 hover:bg-amber-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 text-amber-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-600">
                          {uploadedFile ? <span className="font-semibold text-purple-700">{uploadedFile.name}</span> : <span>Click to upload or drag and drop</span>}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Max file size: 10MB · Accepted: PDF, DOC, DOCX, ZIP</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => setUploadedFile(e.target.files[0])}
                      />
                    </label>
                    <button 
                      className="w-full bg-purple-900 hover:bg-purple-800 text-amber-50 px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!uploadedFile}
                    >
                      Upload & Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StatCard({ label, value, colorClass, borderTop }) {
  return (
    <div className={`bg-white border border-amber-200 rounded-xl p-4 shadow-sm border-t-4 ${borderTop}`}>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-3xl font-serif font-bold ${colorClass}`}>{value}</p>
    </div>
  );
}

function FilterTab({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 border ${
        active 
          ? "bg-purple-900 text-amber-50 border-purple-900" 
          : "bg-white text-purple-700 border-amber-200 hover:bg-amber-50"
      }`}
    >
      {label}
      <span className={`text-xs px-2 py-0.5 rounded-full ${active ? "bg-purple-700 text-white" : "bg-purple-100 text-purple-800"}`}>
        {count}
      </span>
    </button>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-amber-100 text-amber-800 border-amber-200",
    Submitted: "bg-green-100 text-green-800 border-green-200",
    Late: "bg-red-100 text-red-800 border-red-200"
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {status}
    </span>
  );
}

function AssignmentCard({ assignment, onClick }) {
  const dueInfo = getDueDateInfo(assignment.dueDate, assignment.status);
  
  return (
    <div 
      onClick={onClick}
      className={`bg-white border border-amber-100 rounded-xl p-5 cursor-pointer hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between h-full border-b-4 ${dueInfo.borderColor}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
    >
      <div>
        <div className="flex justify-between items-start mb-3 gap-2">
          <h4 className="font-serif font-bold text-purple-900 text-lg leading-tight line-clamp-2">
            {assignment.title}
          </h4>
          <div className="shrink-0">
            <StatusBadge status={assignment.status} />
          </div>
        </div>
        
        <p className="text-gray-500 text-[13px] line-clamp-2 mb-3">
          {assignment.description}
        </p>
        
        <p className="text-[11px] text-gray-400 font-medium mb-4 uppercase tracking-wider">
          Posted by {assignment.faculty}
        </p>
      </div>

      <div className="mt-auto pt-3 border-t border-gray-50 flex flex-col">
        <span className="text-[11px] text-gray-400 mb-0.5">Last date of submission</span>
        <div className="flex items-center gap-2">
          <span className={`font-bold text-sm ${dueInfo.color}`}>
            {dueInfo.label}
          </span>
          {dueInfo.urgent && assignment.status !== "Submitted" && (
             <span className="flex w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          )}
        </div>
      </div>
    </div>
  );
}