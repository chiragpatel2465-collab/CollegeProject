export const mockStudent = {
  profile: {
    name: "Alex Johnson",
    branch: "Computer Science",
    semester: "6th Semester",
    rollNo: "CS2024-042",
    avatar: "AJ"
  },
  stats: {
    attendance: 82,
    pendingAssignments: 3,
    upcomingExams: 2,
    cgpa: 8.4
  },
  notices: [
    { id: 1, title: "Mid-Term Exam Schedule Released", date: "Oct 12", category: "Exam", body: "Please check the exam schedule tab for details." },
    { id: 2, title: "Tech Fest '24 Registrations Open", date: "Oct 10", category: "Event", body: "Register your teams by Friday." }
  ],
  attendanceDetails: [
    { subject: "Database Systems", attended: 35, total: 40 },
    { subject: "Operating Systems", attended: 28, total: 38 },
    { subject: "Computer Networks", attended: 30, total: 35 },
    { subject: "Software Engineering", attended: 18, total: 30 }, // This will trigger the <75% warning
  ]
};