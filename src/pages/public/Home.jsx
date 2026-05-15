import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import Button from "../../Components/UI/Button";
import CTAsection from "../../Components/UI/CTAsection";
import SectionTitle from "../../Components/UI/SectionTitle";
import {CourseGrid} from "./Coursespage";
import { useCourses } from '../../hooks/useCourses';
import {X} from 'lucide-react';
import '../../App.css'
import CreateClubForm from "../../Components/CreateClubForm";

// --- Custom Animated Counter (Replaces react-countup) ---
const AnimatedCounter = ({ value, duration = 2.5, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [count, value, duration, isInView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

// --- Data Arrays ---
const features = [
  {
    icon: "🎓",
    title: "Unified Information Hub",
    desc: "All admission details, notices, and academic resources centralized in one place.",
  },
  {
    icon: "🔐",
    title: "Role-Based Access",
    desc: "Separate secure portals tailored for students, faculty, and administration.",
  },
  {
    icon: "📊",
    title: "Real-Time Attendance",
    desc: "Track attendance per subject instantly and stay on top of your academic requirements.",
  },
  {
    icon: "📝",
    title: "Assignment Management",
    desc: "Submit, track, and manage your assignments with automated deadline reminders.",
  },
  {
    icon: "🎯",
    title: "Club Applications",
    desc: "Create, manage, and join student clubs to enrich your campus experience.",
  },
  {
    icon: "📢",
    title: "Digital Notice Board",
    desc: "Never miss important announcements, event updates, or urgent campus alerts.",
  },
];

const stats = [
  { num: 3000, label: "Students Served" },
  { num: 50, label: "Courses Available" },
  { num: 200, label: "Clubs & Societies" },
  { num: 98, label: "Satisfaction Rate", suffix: "%" },
];

const faqs = [
  {
    q: "How do I create a student account?",
    a: "New students will receive an enrollment link via their registered email upon admission. Simply click the link and follow the steps to set up your password.",
  },
  {
    q: "Can I apply to create a new club?",
    a: "Yes! Navigate to the 'Clubs' section in your portal and click 'Propose New Club'. You will need a faculty sponsor and at least 10 interested students.",
  },
  {
    q: "How do I track my attendance?",
    a: "Your real-time attendance dashboard is updated daily by faculty. You can view subject-wise breakdowns right from your portal homepage.",
  },
  {
    q: "What happens if I miss an assignment deadline?",
    a: "Late submissions may be subject to penalty depending on the professor's policy. The portal will automatically flag late submissions.",
  },
  {
    q: "Can faculty post announcements?",
    a: "Yes, faculty members have dedicated permissions to post class-specific announcements and upload resources directly to the digital notice board.",
  },
  {
    q: "Is the portal mobile-friendly?",
    a: "Absolutely. The entire portal is fully responsive and optimized for a seamless experience on smartphones, tablets, and desktops.",
  },
];

// --- Sub-components ---
const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="border-b-2 border-purple-200 py-4 cursor-pointer"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full focus:outline-none"
      >
        <h3 className="text-lg font-bold text-purple-900 text-left">
          {faq.q}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-purple-900 text-sm"
        >
          ▼
        </motion.div>
      </button>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="text-purple-700 mt-4 text-base leading-relaxed">
          {faq.a}
        </p>
      </motion.div>
    </motion.div>
  );
};

// --- Club Cards ---
const Card=["image1","image2","image3","image4","image5","image6","image7","image8","image9","image10",]

// --- Main Page Component ---
export default function Home() {
  const { courses } = useCourses();
  const [selectedImage, setSelectedImage] = useState(null);
  const subcourses = courses.slice(0, 3); // Show only top 6 courses on the homepage
  return (
    <div className="font-sans overflow-hidden bg-purple-50">

      {/* ================= SECTION 1: HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#FBF7F0_0%,#E5D4F8_50%,#FEF3C7_100%)]">
        {/* Floating Animated Shapes */}
        <motion.div
          className="absolute -top-20 -right-10 w-96 h-96 rounded-full bg-linear-to-br from-purple-400 to-purple-600 opacity-20 blur-3xl z-0"
          animate={{ y: [0, 40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-linear-to-tr from-yellow-400 to-yellow-600 opacity-20 blur-3xl z-0"
          animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="max-w-5xl mx-auto px-6 z-10 text-center md:text-left mt-20 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-yellow-200 text-[#D97706] text-sm font-medium uppercase tracking-wider shadow-sm"
          >
            ✨ Shree Swaminarayan College of Technology
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-[#2D1B4E] leading-tight"
          >
            Your Gateway to a <br className="hidden md:block" />
            <span className="bg-linear-to-r from-purple-900 via-yellow-600 to-purple-700 bg-clip-text text-transparent block mt-2 pb-2">
              Brighter Future
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-purple-700 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed"
          >
            A modern college portal designed to inform, inspire and connect
            new students to campus life. Explore admissions, courses,
            campus activities and connect with your future peers.
          </motion.p>
          <Button/>
         
        </div>
      </section>

  {/* ================= SECTION 2: Course Card Grid================= */} 
      <div className="h-screen max-w-5xl mx-auto grid grid-cols-auto-1fr ">
       <SectionTitle 
       mainText="Explore Our Courses"
       subText="Find the right programme to shape your future"/>
      <CourseGrid courses={subcourses}/>
      </div>


    {/* ================= SECTION 3: CAMPUS LIFE ================= */}
     <SectionTitle 
       mainText="Campus Life" 
       subText="Discover vibrant student communities and exciting activities"/>
      <section className="w-full overflow-x-hidden mx-auto h-auto my-15 rounded-2xl border-3 border-purple-300">
        <div className="flex carousel-track overflow-x-scroll hide-scrollbar h-full w-full p-5">
          {Card.map((card,idx)=>{
          return (<>
            <div key={idx} className="flex flex-col w-120 h-80 mx-2 shrink-0" onClick={() => setSelectedImage(card)}>
              <img src={card} alt="" className="bg-blue-500 w-full h-full rounded-2xl object-cover" />
              <p className="text-xl font-bold text-purple-900 text-center">{card}</p>
            </div>
            </>
          )
          })}
        </div>  
         {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.caption} className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl" />
            <p className="text-white text-center mt-4 text-lg">{selectedImage.caption}</p>
          </div>
        </div>
      )}

      </section>
      {/* ================= SECTION 2: FEATURE CARDS ================= */}
      <SectionTitle
       mainText="Why Choose Our Portal?"
       subText="Powerful features designed to make your college journey seamless"
      />
      <section className="bg-purple-50 mt-10  px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(74, 29, 150, 0.15)" }}
              transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 300 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-linear-to-br from-white to-purple-50 border-2 border-purple-100 rounded-2xl p-8 hover:border-[#D97706] transition-colors"
            >
              <div className="text-5xl mb-6 bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm border border-purple-50">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#4A1D96] mb-3">
                {feature.title}
              </h3>
              <p className="text-purple-700 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    
    



      {/* ================= SECTION 5: FAQ ================= */}
      <section className="bg-purple-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#4A1D96] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-purple-700">
              Got questions? We have answers.
            </p>
            <div className="w-20 h-1 bg-linear-to-r from-purple-900 to-yellow-600 mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>

        {/* ================= SECTION 4: CALL TO ACTION ================= */}
      <CTAsection
      Header="Ready to be part of this?"
      Desc="Join thousands of students who are building skills, friendships and memories that last a lifetime. Your campus journey starts here."
      Primarybtn="Apply now"
      PrimaryLink="/Admissions"
      Secondarybtn="View courses"
      SecondaryLink="/courses"
      />
     
    </div>
  );
}