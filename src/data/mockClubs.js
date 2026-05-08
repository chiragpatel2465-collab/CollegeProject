export const mockClubs = [
  // ── SPORTS CLUBS ──────────────────────────────────────
  {
    id: "volleyball-club",
    category: "Sports",
    name: "Volleyball Club",
    tagline: "Spike it. Win it. Live it.",
    icon: "Volleyball",
    colorAccent: "#0EA5E9", 
    leaderName: "Raj Patel",
    whatsappLink: "https://chat.whatsapp.com/xxxxxxx",
    mission: "To foster teamwork, discipline, and athletic excellence both on and off the court.",
    vision: "Becoming the top inter-college volleyball team in the state by 2026.",
    about: "Founded in 2018, the Volleyball Club has been the heartbeat of our college's sports community. We host weekly practice sessions, friendly matches, and prepare rigorously for the annual inter-college tournaments.",
    leader: {
      name: "Raj Patel",
      role: "Club President",
      email: "raj.patel@college.edu",
      phone: "+91 98765 43210",
      avatar: "" // Empty to trigger fallback
    },
    admins: [
      { name: "Meera Shah", role: "Secretary", email: "meera@college.edu", avatar: "" }
    ],
    howToJoin: [
      { step: 1, title: "Scan QR Code", desc: "Scan the WhatsApp QR code below to join our group." },
      { step: 2, title: "Join the Group", desc: "Introduce yourself and tell us your experience level." },
      { step: 3, title: "Attend First Meet", desc: "Show up to the next practice session — details in group." }
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80", caption: "Inter-college Tournament 2024" },
      { src: "https://images.unsplash.com/photo-1546415413-568b209d0dbe?w=800&q=80", caption: "Practice Session" },
      { src: "https://images.unsplash.com/photo-1526628610543-7f97a3f3b95a?w=800&q=80", caption: "Annual Sports Day" },
      { src: "https://images.unsplash.com/photo-1627391507327-a8a443b4a1e0?w=800&q=80", caption: "winners"}
    ],
    whatsappQR: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://chat.whatsapp.com/xxxxxxx"
  },

  // ── SKILL DEVELOPMENT CLUBS ───────────────────────────
  {
    id: "coders-club",
    category: "Skill Development",
    name: "Coders Club",
    tagline: "Code. Build. Ship. Repeat.",
    icon: "Code2",
    colorAccent: "#4F46E5",
    leaderName: "Ananya Joshi",
    whatsappLink: "https://chat.whatsapp.com/xxxxxxx",
    mission: "To build a strong coding culture on campus and help students land top tech internships.",
    vision: "Producing industry-ready developers who contribute to open-source and global tech.",
    about: "The Coders Club runs weekly coding challenges, peer programming sessions, and guest lectures from industry alumni. Whether you're writing your first 'Hello World' or building scalable APIs, there's a place for you here.",
    leader: {
      name: "Ananya Joshi",
      role: "Club Lead",
      email: "ananya@college.edu",
      phone: "+91 91234 56789",
      avatar: "" 
    },
    admins: [
      { name: "Dev Mehta", role: "Technical Head", email: "dev@college.edu", avatar: "" },
      {name : "prachi thakkar", role:"Recruiter Management", email:"prc@college.edu", avtar:""}
    ],
    howToJoin: [
      { step: 1, title: "Scan QR Code", desc: "Scan the QR below to join our WhatsApp community." },
      { step: 2, title: "Join the Group", desc: "Introduce yourself — share your stack and interests." },
      { step: 3, title: "Attend First Session", desc: "Join our weekly coding session — all levels welcome." }
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80", caption: "Hackathon 2024" },
      { src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80", caption: "Workshop on DSA" },
    ],
    whatsappQR: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://chat.whatsapp.com/xxxxxxx"
  }
];