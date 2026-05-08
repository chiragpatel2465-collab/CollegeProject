export const mockCourses = [
  {
    id: "bcs-001",
    name: "Computer Science & Engineering",
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
  },
  {
    id: "bce-002",
    name: "Civil Engineering",
    code: "BCE-2024",
    duration: "4 Years",
    tuitionFee: "₹75,000 / year",
    intakes: ["January", "September"],
    colorAccent: "#10B981", // Emerald
    fullTitle: "Bachelor of Civil Engineering (Infrastructure)",
    eligibility: "10+2 with minimum 50% in PCM (Physics, Chemistry, Maths)",
    overview: "Focuses on the design, construction, and maintenance of the physical and naturally built environment. This course prepares students to build the sustainable cities of tomorrow, from skyscrapers to smart water systems.",
    coreModules: [
      { icon: "Building2", title: "Structural Analysis", desc: "Design of steel and concrete structures" },
      { icon: "Compass", title: "Surveying", desc: "Geographic mapping and site analysis" },
      { icon: "Mountain", title: "Geotechnical Engineering", desc: "Soil mechanics and foundation design" },
      { icon: "Truck", title: "Transportation Engineering", desc: "Highway and urban traffic planning" },
      { icon: "Droplets", title: "Environmental Engineering", desc: "Water treatment and waste management" },
    ],
    careerProspects: [
      "Structural Engineer", "Project Manager", "Site Engineer",
      "Urban Planner", "Sustainability Consultant", "Quantity Surveyor"
    ],
    labImages: [
      { id: 1, src: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800", caption: "Material Testing Facility" },
      { id: 2, src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800", caption: "Construction Technology Yard" },
      { id: 3, src: "https://images.unsplash.com/photo-1574684596441-255c9d6517e4?auto=format&fit=crop&q=80&w=800", caption: "Fluid Mechanics Lab" },
    ],
    faculty: [
      {
        name: "Dr. Rajesh Varma",
        designation: "Professor",
        specialization: "Structural Dynamics",
        experience: 15,
        avatar: ""
      },
      {
        name: "Prof. Anjali Desai",
        designation: "Assistant Professor",
        specialization: "Smart City Infrastructure",
        experience: 6,
        avatar: ""
      }
    ]
  },
  {
    id: "bme-003",
    name: "Mechanical Engineering",
    code: "BME-2024",
    duration: "4 Years",
    tuitionFee: "₹80,000 / year",
    intakes: ["September"],
    colorAccent: "#F59E0B", // Amber/Orange
    fullTitle: "Bachelor of Mechanical Engineering (Robotics & Automation)",
    eligibility: "10+2 with minimum 55% in PCM",
    overview: "One of the most diverse engineering disciplines. Students explore the principles of motion, energy, and force to design everything from micro-scale sensors to massive spacecraft and manufacturing robots.",
    coreModules: [
      { icon: "Settings", title: "Thermodynamics", desc: "Energy conversion and heat transfer" },
      { icon: "Cpu", title: "Mechatronics", desc: "Integrating electronics and mechanics" },
      { icon: "Box", title: "CAD/CAM", desc: "Computer-aided design and manufacturing" },
      { icon: "Activity", title: "Fluid Mechanics", desc: "Dynamics of liquids and gases" },
      { icon: "Wrench", title: "Automobile Engineering", desc: "Internal combustion and EV systems" },
    ],
    careerProspects: [
      "Automotive Engineer", "Robotics Specialist", "Aerospace Engineer",
      "Manufacturing Manager", "R&D Scientist", "Maintenance Engineer"
    ],
    labImages: [
      { id: 1, src: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800", caption: "Advanced Workshop" },
      { id: 2, src: "https://images.unsplash.com/photo-1565465295423-68c959a593ba?auto=format&fit=crop&q=80&w=800", caption: "IC Engine & Testing Lab" },
      { id: 3, src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800", caption: "Robotics & Automation Center" },
    ],
    faculty: [
      {
        name: "Dr. Vikram Rathore",
        designation: "Professor",
        specialization: "Computational Fluid Dynamics",
        experience: 20,
        avatar: ""
      },
      {
        name: "Prof. Sameer Khan",
        designation: "Lecturer",
        specialization: "Electric Vehicle Tech",
        experience: 5,
        avatar: ""
      }
    ]
  },
  {
    id: "bee-004",
    name: "Electrical Engineering",
    code: "BEE-2024",
    duration: "4 Years",
    tuitionFee: "₹78,000 / year",
    intakes: ["January", "September"],
    colorAccent: "#0EA5E9", // Sky Blue
    fullTitle: "Bachelor of Electrical & Electronics Engineering",
    eligibility: "10+2 with minimum 50% in PCM",
    overview: "Dedicated to the study of electricity, electronics, and electromagnetism. This program covers power generation, smart grids, and the hardware that powers our digital world.",
    coreModules: [
      { icon: "Zap", title: "Power Systems", desc: "Generation, transmission & distribution" },
      { icon: "Microwave", title: "Control Systems", desc: "Linear and digital feedback systems" },
      { icon: "CircuitBoard", title: "Microcontrollers", desc: "Embedded systems and VLSI" },
      { icon: "Sun", title: "Renewable Energy", desc: "Solar and Wind power integration" },
      { icon: "Radio", title: "Signal Processing", desc: "Communication systems and modulation" },
    ],
    careerProspects: [
      "Power Grid Engineer", "Electronics Designer", "Control Systems Analyst",
      "Network Engineer", "Energy Consultant", "Hardware Engineer"
    ],
    labImages: [
      { id: 1, src: "https://images.unsplash.com/photo-1517420704952-d9f39e99b43b?auto=format&fit=crop&q=80&w=800", caption: "Electrical Machines Lab" },
      { id: 2, src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", caption: "Control Systems & Simulation" },
      { id: 3, src: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800", caption: "Digital Electronics Workshop" },
    ],
    faculty: [
      {
        name: "Dr. Sunita Iyer",
        designation: "Head of Department",
        specialization: "Power Electronics",
        experience: 18,
        avatar: ""
      },
      {
        name: "Prof. Amit Shah",
        designation: "Senior Lecturer",
        specialization: "Wireless Communication",
        experience: 9,
        avatar: ""
      }
    ]
  }
];