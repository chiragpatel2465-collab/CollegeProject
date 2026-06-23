import { useState, useEffect, useRef } from "react";
import SectionTitle from "./UI/SectionTitle";

const TABS = [
  {
    id: "mission",
    label: "Our mission",
    heading: "Empowering every learner to reach their fullest potential",
    body: "Greenfield College is dedicated to delivering a transformative academic experience grounded in intellectual curiosity, research, and real-world application. We nurture critical thinkers, compassionate leaders, and skilled professionals who are equipped to make a meaningful difference — on campus, in industry, and in the world.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    id: "vision",
    label: "Our vision",
    heading: "To be a globally recognized centre of academic and human excellence",
    body: "To create a collaborative academic environment to foster professional excellence and ethical values in students, and to contribute to the development of society through research, innovation, and outreach.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function MissionVision() {
  const [active, setActive] = useState("mission");
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const ref = useRef(null);

  const tab = TABS.find((t) => t.id === active);
  const isBlue = active === "mission";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleTabChange = (id) => {
    if (id === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(id);
      setAnimating(false);
    }, 200);
  };

  return (
    <section
      ref={ref}
      className="pb-24 px-6"
      id="mission-vision"
    >
      <div className="max-w-7xl mx-auto">

        {/* <SectionTitle
        mainText="Who we are"
        subText="Mission and Vision"
        /> */}

        {/* Tab bar */}
        <div
          className={`flex gap-2 p-1.5 bg-white border mt-10 border-brand-mid/20 rounded-full w-fit mb-14 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {TABS.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-brand-primary via-brand-purple to-brand-mid text-white shadow-lg shadow-brand-purple/20"
                    : "text-brand-primary/70 hover:text-brand-purple"
                }`}
              >
                <span className={isActive ? "text-white" : "text-brand-purple"}>
                  {t.icon}
                </span>
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content panel */}
        <div
          className={`transition-all duration-200 ${
            animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
          }`}
        >
          {/* Accent bar */}
          <div
            className={`w-10 h-1 rounded-full mb-8 transition-colors duration-300 ${
              isBlue ? "bg-brand-purple" : "bg-brand-mid"
            }`}
          />

          {/* Heading */}
          <h2
            className="text-3xl sm:text-4xl lg:text-7xl font-medium font-sans text-brand-primary leading-tight mb-8 pr-10"
            style={{ letterSpacing: "-0.025em" }}
          >
            {tab.heading}
          </h2>

          {/* Body */}
          <p className="text-brand-primary/70 text-xl leading-relaxed max-w-4xl">
            {tab.body}
          </p>

          {/* Dot indicators */}
          <div className="flex items-center gap-2 mt-14">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id)}
                aria-label={`Switch to ${t.label}`}
                className={`rounded-full transition-all duration-300 ${
                  active === t.id
                    ? "w-6 h-2 bg-brand-purple"
                    : "w-2 h-2 bg-brand-mid/40 hover:bg-brand-purple"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}