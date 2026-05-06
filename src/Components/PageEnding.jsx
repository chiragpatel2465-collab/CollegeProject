import { useState, useEffect, useRef } from "react";

function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

const VALUES = [
  {
    title: "Excellence",
    description:
      "We hold ourselves to the highest academic and professional standards in everything we do — from teaching and research to campus life.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    color: "blue",
  },
  {
    title: "Integrity",
    description:
      "Honesty, transparency, and ethical conduct are the foundation of every interaction — between students, faculty, and the institution.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: "indigo",
  },
  {
    title: "Inclusion",
    description:
      "We celebrate diversity of thought, background, and experience — building a campus where every voice is heard and every person belongs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    color: "teal",
  },
  {
    title: "Innovation",
    description:
      "We encourage bold thinking, creative problem-solving, and the courage to challenge convention — in classrooms, labs, and beyond.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    color: "amber",
  },
  {
    title: "Service",
    description:
      "We instil a deep sense of responsibility toward society — inspiring graduates to give back, lead with empathy, and uplift their communities.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    color: "rose",
  },
  {
    title: "Growth",
    description:
      "Learning never stops. We foster a culture of continuous improvement — for students, faculty, and the institution as a whole.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    color: "green",
  },
];

const COLOR_MAP = {
  blue:   { icon: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/20",   hover: "hover:border-blue-500/50"  },
  indigo: { icon: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", hover: "hover:border-indigo-500/50" },
  teal:   { icon: "text-teal-400",   bg: "bg-teal-500/10",   border: "border-teal-500/20",   hover: "hover:border-teal-500/50"  },
  amber:  { icon: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/20",  hover: "hover:border-amber-500/50" },
  rose:   { icon: "text-rose-400",   bg: "bg-rose-500/10",   border: "border-rose-500/20",   hover: "hover:border-rose-500/50"  },
  green:  { icon: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/20",  hover: "hover:border-green-500/50" },
};

function CoreValues() {
  const [ref, visible] = useVisible();

  return (
    <section ref={ref} className="bg-amber-50 py-24 px-6" id="core-values">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px bg-blue-500" />
            <span className="text-blue-400 text-xs font-medium tracking-widest uppercase">
              What we stand for
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-semibold text-purple-950 max-w-lg leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            The values that guide everything we do
          </h2>
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((value, i) => {
            const c = COLOR_MAP[value.color];
            return (
              <div
                key={value.title}
                className={`group p-6 rounded-2xl border bg-white transition-all duration-500 ${c.border} ${c.hover} ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" }}
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${c.bg} ${c.icon}`}>
                  {value.icon}
                </div>

                {/* Title */}
                <h3 className="text-purple-900 font-semibold text-base mb-2 tracking-tight">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-amber-900 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
    

export default function PageEnding() {
  return (
    <>
      <CoreValues />
    
    </>
  );
}