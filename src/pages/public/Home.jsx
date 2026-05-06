import React, { useState, useEffect, useRef } from 'react';

// --- Custom Hook: Intersection Observer for Scroll Reveals ---
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsInView(true);
    }, { threshold: 0.1, ...options });

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [options]);

  return [ref, isInView];
};

// --- Sub-component: Gradient Stat Card ---
const StatCard = ({ end, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView();
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="relative group">
      <div className="absolute -inset-1 bg-linear-to-r from-[#7C3AED] to-[#F5A623] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center">
        <div className="text-4xl md:text-5xl font-serif font-bold bg-linear-to-r from-white via-[#F5A623] to-[#7C3AED] bg-clip-text text-transparent">
          {count}{suffix}
        </div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-[#CBD5E1] mt-2 font-bold">{label}</div>
      </div>
    </div>
  );
};

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="bg-amber-50 text-[#F1F5F9] font-sans overflow-x-hidden">
      {/* Dynamic CSS for Mesh Gradients & Modern Animations */}
      <style>{`
        @keyframes mesh {
          0% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0,0) scale(1); }
        }
        .mesh-blob {
          position: absolute;
          filter: blur(80px);
          opacity: 0.4;
          z-index: 0;
          animation: mesh 20s infinite alternate;
        }
        .gradient-border-card {
          position: relative;
          background: linear-gradient(#0F172A, #0F172A) padding-box,
                      linear-gradient(135deg, rgba(124,58,237,0.5), rgba(245,166,35,0.5)) border-box;
          border: 1px solid transparent;
        }
        .animate-reveal {
          animation: reveal 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        @keyframes reveal {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Navigation */}
      {/* <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-center">
        <div className="w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex justify-between items-center shadow-2xl">
          <div className="font-serif text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-tr from-[#7C3AED] to-[#F5A623] rounded-lg"></div>
            SS<span className="text-[#F5A623]">CT</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            {['Academics', 'Campus', 'Research', 'Portal'].map((item) => (
              <a key={item} href="#" className="hover:text-[#F5A623] transition-colors">{item}</a>
            ))}
          </div>
          <button className="bg-linear-to-r from-[#7C3AED] to-[#6D28D9] px-6 py-2 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[#7C3AED]/60 transition-all">
            Join Now
          </button>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Modern Mesh Background */}
        <div className="mesh-blob w-[500px] h-[500px] bg-[#7C3AED] -top-20 -left-20" />
        <div className="mesh-blob w-[400px] h-[400px] bg-[#F5A623] top-1/2 right-0" style={{ animationDelay: '-5s' }} />
        <div className="mesh-blob w-[600px] h-[600px] bg-[#1E1B4B] -bottom-40 left-1/2" style={{ animationDelay: '-10s' }} />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-reveal">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5A623] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5A623]"></span>
            </span>
            <span className="text-xs font-bold tracking-widest uppercase">Admissions Open 2026-27</span>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl leading-[1.1] mb-8 animate-reveal" style={{ animationDelay: '0.2s' }}>
            Elevate Your <br/>
            <span className="bg-linear-to-r from-[#F5A623] via-white to-[#7C3AED] bg-clip-text text-transparent italic">Intellectual Journey</span>
          </h1>

          <p className="text-lg md:text-xl text-[#CBD5E1] max-w-2xl mx-auto mb-12 animate-reveal" style={{ animationDelay: '0.4s' }}>
            Where tradition meets innovation. Experience a digital-first campus designed for the next generation of global leaders.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-reveal" style={{ animationDelay: '0.6s' }}>
            <button className="group relative px-10 py-5 bg-white text-[#0F172A] rounded-2xl font-bold transition-all overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-[#F5A623] to-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative group-hover:text-white transition-colors">Apply Today</span>
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl font-bold hover:bg-white/10 transition-all">
              Virtual Tour
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 relative bg-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-5xl md:text-6xl mb-6">Built for <span className="text-[#F5A623]">Excellence.</span></h2>
              <p className="text-[#CBD5E1] text-lg">Our integrated ecosystem ensures every student, faculty member, and administrator stays connected with real-time data.</p>
            </div>
            <div className="h-1 grow bg-linear-to-r from-transparent via-white/20 to-transparent hidden md:block mb-4 mx-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { i: "🎓", t: "Academic Hub", d: "Access curricula, research papers, and lecture notes in a single unified workspace." },
              { i: "⚡", t: "Real-time Pulse", d: "Instant attendance tracking and subject-wise performance analytics." },
              { i: "🛡️", t: "Secure Access", d: "Biometric and role-based login protocols for total data privacy." },
              { i: "🤝", t: "Club Synergy", d: "Discover and join 50+ student-led organizations with a single tap." },
              { i: "🔔", t: "Smart Alerts", d: "Never miss an exam or event with intelligent, context-aware notifications." },
              { i: "📱", t: "Fluid Mobile", d: "A fully native experience across all your devices, anytime, anywhere." }
            ].map((f, idx) => (
              <div key={idx} className="gradient-border-card p-8 rounded-4xl group hover:-translate-y-3 transition-all duration-500">
                <div className="w-14 h-14 bg-linear-to-br from-[#7C3AED]/20 to-[#F5A623]/20 rounded-2xl flex items-center justify-center text-2xl mb-6 border border-white/5 group-hover:scale-110 transition-transform">
                  {f.i}
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">{f.t}</h3>
                <p className="text-[#CBD5E1] text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard end={3000} label="Students" suffix="+" />
          <StatCard end={50} label="Programs" suffix="+" />
          <StatCard end={98} label="Success" suffix="%" />
          <StatCard end={200} label="Partners" suffix="+" />
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto relative rounded-[3rem] overflow-hidden bg-linear-to-br from-[#1E1B4B] to-[#0F172A] border border-white/10 p-12 md:p-24 text-center">
          <div className="mesh-blob w-full h-full bg-[#7C3AED] top-0 left-0 opacity-10" />
          <div className="relative z-10">
            <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">Ready to start your <br/> <span className="text-[#F5A623]">legacy?</span></h2>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-12 py-5 bg-[#F5A623] text-black font-bold rounded-2xl hover:bg-white transition-colors shadow-[0_0_40px_rgba(245,166,35,0.3)]">
                Enroll Now
              </button>
              <button className="px-12 py-5 bg-white/5 backdrop-blur-md border border-white/20 font-bold rounded-2xl hover:bg-white/10 transition-all">
                Contact Office
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <h2 className="font-serif text-5xl text-center mb-16">Support <span className="text-[#7C3AED]">&</span> Clarity</h2>
        <div className="space-y-4">
          {[
            { q: "Is there a mobile application?", a: "Yes, our portal is progressive and can be installed as a PWA on iOS and Android devices." },
            { q: "How do I reset my portal password?", a: "Use the 'Forgot Password' link on the login screen or contact the IT Helpdesk with your student ID." },
            { q: "What are the lab timings?", a: "Computer and specialized engineering labs are open from 8:00 AM to 8:00 PM on weekdays." }
          ].map((item, i) => (
            <div key={i} className="border-b border-white/10">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full py-8 flex justify-between items-center text-left"
              >
                <span className="text-xl font-serif">{item.q}</span>
                <span className={`text-2xl transition-transform duration-500 ${activeFaq === i ? 'rotate-45 text-[#F5A623]' : ''}`}>+</span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${activeFaq === i ? 'max-h-40 pb-8' : 'max-h-0'}`}>
                <p className="text-[#CBD5E1] leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="font-serif text-3xl font-bold mb-6">SS<span className="text-[#F5A623]">CT</span></div>
            <p className="text-[#CBD5E1] max-w-md mb-8">Pioneering technical education through a blend of traditional values and modern technological infrastructure.</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#7C3AED] transition-colors cursor-pointer">IG</div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#7C3AED] transition-colors cursor-pointer">TW</div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#7C3AED] transition-colors cursor-pointer">LN</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-[#F5A623]">Quick Links</h4>
            <ul className="space-y-4 text-sm text-[#CBD5E1]">
              <li><a href="#" className="hover:text-white transition-colors">Student Handbook</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Library Catalog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Campus Map</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-[#F5A623]">Legal</h4>
            <ul className="space-y-4 text-sm text-[#CBD5E1]">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Anti-Ragging</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-20 pt-8 border-t border-white/5 text-[#CBD5E1] text-xs">
          © 2026 Shree Swaminarayan College of Technology. Crafted for the future.
        </div>
      </footer>
    </div>
  );
}