export const mockCourses = [
  {
    id: "bcs-001",
    name: "Bachelor of Computer Science",
    code: "BCS-2024",
    duration: "3 Years",
    tuitionFee: "₹85,000 / year",
    intakes: ["January", "September"],
    colorAccent: "#4F46E5",
    fullTitle: "Bachelor of Computer Science (Honours)",
    eligibility: "10+2 with minimum 50% in Science stream",
    overview: "A future-focused program designed to equip students with cutting-edge technical skills. From software engineering to artificial intelligence, this course provides the foundational knowledge and practical experience required to thrive in the modern digital economy.",
    coreModules: [
      { icon: "Cloud", title: "Cloud Computing", desc: "AWS, Azure & GCP fundamentals" },
      { icon: "Brain", title: "AI & Machine Learning", desc: "Neural networks, model training" },
      { icon: "Code2", title: "Data Structures", desc: "Algorithms, complexity analysis" },
      { icon: "Shield", title: "Cybersecurity", desc: "Ethical hacking, network security" },
      { icon: "Globe", title: "Web Development", desc: "React, Node.js, REST APIs" },
    ],
    careerProspects: [
      "Software Engineer", "Systems Architect", "Data Analyst",
      "Cloud Engineer", "Cybersecurity Analyst", "Full Stack Developer"
    ],
    labImages: [
      { id: 1, src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800", caption: "AI Research Lab" },
      { id: 2, src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800", caption: "Hardware Workshop" },
      { id: 3, src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800", caption: "Server & Networking Lab" },
    ],
    faculty: [
      {
        name: "Dr. Priya Sharma",
        designation: "Head of Department",
        specialization: "AI & Machine Learning",
        experience: 12,
        avatar: "" // Empty to test fallback
      },
      {
        name: "Prof. Arjun Mehta",
        designation: "Senior Lecturer",
        specialization: "Cloud & DevOps",
        experience: 8,
        avatar: "" 
      }
    ]
  }
];