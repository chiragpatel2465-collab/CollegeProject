export const mockFaculty = {
  profile: {
    name: "Dr. Sarah Chen",
    department: "Computer Science",
    designation: "Associate Professor",
    avatar: "SC"
  },
  stats: {
    totalStudents: 145,
    classesToday: 3,
    pendingReviews: 12,
    noticesPosted: 5
  },
  notices: [
    { id: 1, title: "Department Meeting at 3 PM", date: "Oct 14", category: "General", body: "All CS faculty must attend in Room 402." }
  ],
  studentsList: [
    { id: "CS2024-001", name: "Alex Johnson", rollNo: "001", branch: "CS", semester: "6th", attendance: 82, cgpa: 8.4 },
    { id: "CS2024-002", name: "Maria Garcia", rollNo: "002", branch: "CS", semester: "6th", attendance: 95, cgpa: 9.1 },
    { id: "CS2024-003", name: "James Smith", rollNo: "003", branch: "CS", semester: "6th", attendance: 65, cgpa: 7.2 }, // Low attendance
    { id: "CS2024-004", name: "Priya Patel", rollNo: "004", branch: "CS", semester: "6th", attendance: 88, cgpa: 8.9 },
  ]
};