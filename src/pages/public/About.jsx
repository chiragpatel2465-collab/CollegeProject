import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Quote } from 'lucide-react';

import MissionVision from "../../Components/MissionVision.jsx"
import PageEnding from "../../Components/PageEnding.jsx";
import CTAsection from "../../Components/UI/CTAsection";
import SectionTitle from "../../Components/UI/SectionTitle.jsx";
import HeroBanner from "../../Components/UI/HeroBanner.jsx";

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
    <div className="min-h-screen bg-purple-50 font-sans">
      <HeroBanner
      pageTitle="About Us"
      pageName="About"
      pageDesc="Shaping the Future of Engineering Education"
      />
      
    
        {/*College Overview*/}
    <SectionTitle
    mainText="Who we are"
    subText="College Overview"
    />
    <section className="h-screen lg:h-[50vh]  w-[90vw] mx-auto grid  grid-cols-1 lg:grid-cols-2 items-stretch">
    <div className="h-full w-full  flex items-center justify-center">
       <img src="https://ssit.co.in/images/hero/why-ssit.webp" alt="College Image" 
       className="h-full w-full object-cover rounded-lg shadow-lg shadow-slate-500 bg-purple-500" />
    </div>
     <div className="flex flex-col w-full h-full justify-center px-6 py-3">
        
        <p className="text-purple-900  font-serif font-semibold text-md md:text-sm lg:text-md xl:text-lg">
         Founded in 2001 by the Satsang Shiksha Parishad, Shree Swaminarayan Institute of Technology (SSIT) leverages decades of academic and industrial expertise to deliver high-quality engineering education. Strategically situated between Ahmedabad and Gandhinagar, the institute offers a range of undergraduate and postgraduate programs designed to cultivate technically skilled, ethically-driven professionals ready to lead in the global marketplace.
        </p>
         {/* ── Stats Strip ── */}
        <div>
          <div className="max-w-7xl mx-auto mt-5 pt-5 lg:my-5 flex justify-evenly border-t-2 border-purple-200">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center justify-center px-4 text-center`}
              >
                <span className="text-2xl font-bold text-yellow-500 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-bold lg:text-xs text-purple-700">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

     </div>
    </section>
    <MissionVision/>
    <PageEnding/>
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