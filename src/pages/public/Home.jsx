import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import Button from "../../Components/UI/Button";
import CTAsection from "../../Components/UI/CTAsection";
import SectionTitle from "../../Components/UI/SectionTitle";
import { CourseGrid } from "./Coursespage";
import { useCourses } from '../../hooks/useCourses';
import { X } from 'lucide-react';
import { GoDotFill } from "react-icons/go";
import { HiMiniBookOpen } from "react-icons/hi2";
import { FaComputer } from "react-icons/fa6";
import { BsTools } from "react-icons/bs";
import { GiTheater , GiCoffeeCup } from "react-icons/gi";
import { MdOutlineSportsBasketball } from "react-icons/md";
import '../../App.css'


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
    icon: <HiMiniBookOpen/>,
    title: "Library",
    desc : "A well-stocked library with thousands of books, journals, e-resources, and a peaceful reading area for focused study."
  },
  {
    icon: <FaComputer/>,
    title: "Computer Labs",
    desc: "Multiple state-of-the-art computer labs with the latest hardware, software, and high-speed internet connectivity.",
  },
  {
    icon: <BsTools/>,
    title: "Machanical Workshop",
    desc: "Fully equipped workshop for hands-on training with modern machinery and tools for practical engineering skills.",
  },
  {
    icon: <GiTheater/>,
    title: "Auditorium",
    desc: "A spacious seminar hall and auditorium for lectures, workshops, cultural events, and guest sessions.",
  },
  {
    icon: <GiCoffeeCup/>,
    title: "Canteen",
    desc:"A clean and hygienic canteen serving nutritious meals and snacks at affordable prices throughout the day.",
  },
  {
    icon: <MdOutlineSportsBasketball/>,
    title: "Sports Ground",
    desc: "Expansive grounds for cricket, football, and volleyball with dedicated courts for indoor sports and recreation.",
  },
];

const STATS = [
  { value: "20+", label: "Years of excellence" },
  { value: "5,000+", label: "Alumni Network" },
  { value: "50+", label: "Expert faculty" },
];

// --- Club Cards ---
const Card = [
  { name: "Well manage library", image: "/public/book-shelf.webp" },
  { name: "High tech labs", image: "/public/Practical_lab.jpg" },
  { name: "Guided learning", image: "/public/machenical_lab.jpg" },
  { name: "Well manage library", image: "/public/book-shelf.webp" },
  { name: "High tech labs", image: "/public/Practical_lab.jpg" },
  { name: "Guided learning", image: "/public/machenical_lab.jpg" },
];

// --- Main Page Component ---
export default function Home() {
  const { courses } = useCourses();
  const [selectedImage, setSelectedImage] = useState(null);
  const subcourses = courses.slice(0, 3); // Show only top 6 courses on the homepage
  return (
    <div className="overflow-hidden bg-brand-light text-brand-primary">


      {/* ================= SECTION 1: HERO ================= */}
      <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-brand-surface">
  
       
        <div className="flex flex-col justify-center  mx-auto px-6 z-10 text-center md:text-left mt-20 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:max-w-1/2 flex justify-center items-center gap-2 mb-6 px-4 py-1.5 rounded-full backdrop-blur-sm border border-brand-mid/30 bg-white/60 text-brand-purple text-sm font-medium uppercase tracking-wider shadow-sm"
          >
            <GoDotFill className="text-green-500 font-bold"/>GTU Affiliated & AICTE Aprooved
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-sans font-bold pb-10 text-transparent bg-clip-text bg-linear-to-r from-brand-primary via-brand-mid to-brand-purple leading-[0.9] tracking-tight"
          >
            Your Gateway to a bright future
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-md md:text-xl text-brand-primary/75 font-sans  mb-10 max-w-2xl mx-auto md:mx-0 leading-8 tracking-tight"
          >
            A modern college portal designed to inform, inspire and connect
            new students to campus life. Explore admissions, courses,
            campus activities and connect with your future peers.
          </motion.p>
          <Button />

        </div>
        <div className="flex items-center justify-center">
          <div className="bg-black rounded-full h-100 w-100"></div>
        </div>
      </section>

{/*=====================About us===============================*/}
      <SectionTitle
    mainText="Who we are"
    subText="College Overview"
    />
    <section className="min-h-screen lg:h-[50vh] w-[90vw] mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch gap-6">
    <div className="h-full w-full flex items-center justify-center rounded-3xl overflow-hidden">
       <img src="https://ssit.co.in/images/hero/why-ssit.webp" alt="College Image" 
       className="h-3/4 rounded-xl w-full object-cover" />
    </div>
     <div className="flex flex-col w-full h-full justify-center px-6 py-3">
        
        <p className="text-brand-primary/80 font-mono font-semibold text-md md:text-sm lg:text-md xl:text-lg leading-relaxed">
         Founded in 2001 by the Satsang Shiksha Parishad, Shree Swaminarayan Institute of Technology (SSIT) leverages decades of academic and industrial expertise to deliver high-quality engineering education. Strategically situated between Ahmedabad and Gandhinagar, the institute offers a range of undergraduate and postgraduate programs designed to cultivate technically skilled, ethically-driven professionals ready to lead in the global marketplace.
        </p>
         {/* ── Stats Strip ── */}
        <div>
          <div className="max-w-7xl mx-auto mt-5 pt-5 lg:my-5 flex flex-col md:flex-row justify-evenly gap-4 border-t-2 border-brand-mid/20">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center px-4 text-center"
              >
                <span className="text-2xl font-bold text-brand-purple tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-bold lg:text-xs text-brand-primary/70">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

     </div>
    </section>

      {/* ================= SECTION 2: Course Card Grid================= */}
      <div className="max-w-7xl mx-auto flex flex-col">
        <SectionTitle
          mainText="Explore Our Courses"
          subText="Find the right programme to shape your future" 
          
          />
        <CourseGrid courses={subcourses} />
      </div>


      {/* ================= SECTION 3: CAMPUS LIFE ================= */}
      <SectionTitle
        mainText="Campus Life"
        subText="Discover vibrant student communities and exciting activities" />

      <section className="max-w-7xl mx-auto min-h-100 my-15 rounded-3xl border border-brand-mid/20 bg-brand-surface shadow-sm overflow-x-hidden px-5">
        <div className="flex carousel-track overflow-x-scroll hide-scrollbar h-full w-full p-5">
          {Card.map((card, idx) => {
            return (<>
              <div key={idx} className="flex flex-col w-120 h-80 mx-2 shrink-0 rounded-3xl overflow-hidden border border-brand-mid/20 bg-white shadow-sm cursor-pointer hover:border-brand-purple/40 hover:shadow-md transition-all" onClick={() => setSelectedImage(card)}>
                <img src={card.image} alt="" className="w-full h-full object-cover" />
                
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
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage.src} alt={selectedImage.caption} className="w-full h-auto max-h-[85vh] object-contain rounded-3xl shadow-2xl" />
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
      <section className="bg-brand-light mt-10 px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(83, 74, 183, 0.15)" }}
              transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 300 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white border border-brand-mid/20 rounded-xl p-8 hover:border-brand-purple/50 transition-colors shadow-sm"
            >
              <div className="text-5xl mb-6 bg-brand-light w-16 h-16 rounded-xl flex items-center justify-center shadow-sm border border-brand-mid/20">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-brand-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-brand-primary/70 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
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