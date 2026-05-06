import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MissionVision from "../../Components/Overview.jsx"
import PageEnding from "../../Components/PageEnding.jsx";


const STATS = [
  { value: "20+", label: "Years of excellence" },
  { value: "5,000+", label: "Alumni Network" },
  { value: "50+", label: "Expert faculty" },
];

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      {/* ── Hero Body ── */}
      <main className="relative bg-purple-900 pt-16 min-h-screen flex flex-col">

        {/* Subtle grid texture */}
        <div className="absolute inset-0 pointer-events-none" />

       

        {/* Content */}
        <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-24">

          {/* Accreditation badge */}
          <div
            className={`inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium px-4 py-1.5 rounded-full mb-8 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
           GTU Affiliated & AICTE Approved
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight max-w-3xl mb-5 transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ letterSpacing: "-0.02em" }}
          >
            Shaping minds,
            
            <span className="text-yellow-500 px-2">building futures</span>since 2001
          </h1>

          {/* Subheading */}
          <p
            className={`text-slate-200/80 text-base sm:text-lg max-w-xl leading-relaxed mb-10 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            A premier institution committed to academic excellence, research, and
            holistic development of every student and faculty member.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              to="/courses"
              className="bg-amber-400 hover:bg-amber-300 text-yellow-900 text-sm font-medium px-7 py-3 rounded-lg transition-colors duration-200"
            >
              Explore programs
            </Link>
            <Link
              to="/Admissions"
              className="border border-white hover:border-white/50 text-amber-50 hover:text-amber-200 text-sm font-medium px-7 py-3 rounded-lg transition-colors duration-200"
            >
              Apply now
            </Link>
          </div>
        </div>

        {/* ── Stats Strip ── */}
        <div
          className={`relative border-t border-amber-400 bg-white backdrop-blur transition-all duration-700 delay-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto flex justify-evenly">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center justify-center py-7 px-4 text-center`}
              >
                <span className="text-2xl font-semibold text-purple-800 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-amber-800 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
             
      </main>

        {/*College Overview*/}
      <div
          className={`relative  my-12 flex items-center gap-3 mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="block w-8 h-px bg-purple-700" />
          <span className="text-purple-900 text-xl font-extrabold font-medium tracking-widest uppercase">
            College Overview
          </span>
        </div>

    <section className="h-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch px-6 bg-transparent">
    <div className="h-auto my-12 flex items-center justify-center">
       <img src="https://ssit.co.in/images/hero/why-ssit.webp" alt="College Image" 
       className="h-[35vh] w-2/3 object-cover rounded-lg shadow-lg shadow-slate-500 bg-purple-500" />
    </div>
     <div className="flex flex-col justify-center px-6 py-3 gap-4 ">
        
        <p className="text-purple-600 text-lg text-[1.1rem]">
         Founded in 2001 by the Satsang Shiksha Parishad, Shree Swaminarayan Institute of Technology (SSIT) leverages decades of academic and industrial expertise to deliver high-quality engineering education. Strategically situated between Ahmedabad and Gandhinagar, the institute offers a range of undergraduate and postgraduate programs designed to cultivate technically skilled, ethically-driven professionals ready to lead in the global marketplace.
        </p>
     </div>
    </section>
    <MissionVision/>
    <PageEnding/>
    </div>
  );
}