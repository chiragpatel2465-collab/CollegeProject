/* ─────────────────────────────────────────────────────────────
   CampusLife.jsx
   Sections: Hero, Gallery, Events & Fests, Sports,
             Library & Cafeteria, CTA
   Theme: Saffron · Purple · Gold  (60-30-10)
   Style: Modern & energetic
───────────────────────────────────────────────────────────── */

const events = [
  {
    icon: "🎭",
    title: "Culturals & Annual Day",
    desc: "Dance, drama, music and talent showcases that light up the campus every year",
    date: "Every March",
    color: "border-t-purple-600",
    badge: "bg-purple-100 text-purple-800",
  },
  {
    icon: "⚡",
    title: "Techno-Fest",
    desc: "Inter-college tech competitions, project expos and innovation challenges",
    date: "Every February",
    color: "border-t-amber-500",
    badge: "bg-amber-100 text-amber-800",
  },
  {
    icon: "🏆",
    title: "Sports Day",
    desc: "Annual athletics meet with track events, team sports and championship trophies",
    date: "Every January",
    color: "border-t-yellow-600",
    badge: "bg-yellow-100 text-yellow-800",
  },
  {
    icon: "💻",
    title: "Hackathon",
    desc: "48-hour coding sprints where teams build real-world solutions and win prizes",
    date: "Every November",
    color: "border-t-violet-600",
    badge: "bg-violet-100 text-violet-800",
  },
];

const sports = [
  { icon: "🏏", title: "Cricket",   desc: "Full-size ground with practice nets" },
  { icon: "🏸", title: "Badminton", desc: "4 indoor courts, open daily" },
  { icon: "🏐", title: "Volleyball", desc: "Outdoor & indoor courts available" },
];

const facilities = [
  {
    icon: "📚",
    title: "Central library",
    desc: "Over 40,000 books, 200+ journals, digital e-library access. Reading halls open 8 am – 9 pm, Mon – Sat.",
  },
  {
    icon: "💻",
    title: "Digital resources",
    desc: "Online access to NPTEL, DELNET and research databases. Dedicated study pods with high-speed Wi-Fi.",
  },
  {
    icon: "🍱",
    title: "Main cafeteria",
    desc: "Hygienic, affordable meals — breakfast, lunch and dinner. Separate Jain and non-Jain counters available.",
  },
  {
    icon: "☕",
    title: "Snack zones",
    desc: "Two quick-bite canteens near the main block and hostel. Fresh juices, snacks and beverages all day.",
  },
];

const galleryItems = [
  { label: "Main auditorium", tall: true,  bg: "bg-purple-900" },
  { label: "Sports ground",   tall: false, bg: "bg-purple-700" },
  { label: "Central library", tall: false, bg: "bg-amber-700"  },
  { label: "Cafeteria",       tall: false, bg: "bg-purple-600" },
  { label: "Tech lab",        tall: false, bg: "bg-purple-800" },
];

const heroStats = [
  { num: "12+",    label: "Annual fests"     },
  { num: "8",      label: "Sports facilities" },
  { num: "40,000+", label: "Library books"   },
  { num: "3",      label: "Cafeteria zones"  },
];

const ctaPerks = [
  { num: "NAAC A+", label: "Accredited institution" },
  { num: "92%",     label: "Placement rate"         },
  { num: "4,200+",  label: "Students enrolled"      },
  { num: "38",      label: "Programs offered"       },
];

/* ── Reusable section header ── */
function SectionHeader({ label, title }) {
  return (
    <div className="mb-6">
      <p className="text-xs tracking-widest uppercase text-purple-600 font-semibold mb-1">{label}</p>
      <h2 className="font-serif text-2xl font-bold text-purple-900 mb-2">{title}</h2>
      <div className="w-11 h-0.5 bg-yellow-600 rounded" />
    </div>
  );
}

/* ── Main component ── */
export default function CampusLife() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 bg-amber-50 min-h-screen">

      {/* ── Hero ── */}
      <div className="bg-purple-900 rounded-2xl overflow-hidden mb-10">
        <div className="h-1.5 bg-amber-400 w-full" />
        <div className="p-8 sm:p-12">
          <span className="inline-block bg-amber-400/20 text-amber-300 text-xs tracking-widest uppercase px-4 py-1 rounded-full border border-amber-400/30 mb-5">
            Campus life
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-amber-50 leading-tight mb-4">
            Life beyond{" "}
            <span className="text-amber-400">the classroom</span>
          </h1>
          <p className="text-purple-200 text-base leading-relaxed max-w-xl mb-8">
            A vibrant campus where every student finds their passion — from sports courts
            to fest stages, from library shelves to cafeteria conversations.
          </p>
          <div className="flex flex-wrap gap-8">
            {heroStats.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-2xl font-bold text-amber-400">{s.num}</div>
                <div className="text-xs text-purple-300 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gallery ── */}
      <section className="mb-12">
        <SectionHeader label="Campus in pictures" title="Gallery" />
        <div className="grid grid-cols-3 gap-3" style={{ gridTemplateRows: "auto" }}>
          {/* Tall card */}
          <div className="row-span-2 bg-purple-900 rounded-xl flex items-end p-3 min-h-60">
            <span className="bg-black/40 text-white text-xs px-2.5 py-1 rounded-md">Main auditorium</span>
          </div>
          <div className="bg-purple-700 rounded-xl flex items-end p-3 min-h-28">
            <span className="bg-black/40 text-white text-xs px-2.5 py-1 rounded-md">Sports ground</span>
          </div>
          <div className="bg-amber-700 rounded-xl flex items-end p-3 min-h-28">
            <span className="bg-black/40 text-white text-xs px-2.5 py-1 rounded-md">Central library</span>
          </div>
          <div className="bg-purple-600 rounded-xl flex items-end p-3 min-h-28">
            <span className="bg-black/40 text-white text-xs px-2.5 py-1 rounded-md">Cafeteria</span>
          </div>
          <div className="bg-purple-800 rounded-xl flex items-end p-3 min-h-28">
            <span className="bg-black/40 text-white text-xs px-2.5 py-1 rounded-md">Tech lab</span>
          </div>
        </div>
        <p className="text-xs text-amber-700 mt-2">
          Replace the colored blocks above with real <code>&lt;img&gt;</code> tags in your project.
        </p>
      </section>

      {/* ── Events & Fests ── */}
      <section className="mb-12">
        <SectionHeader label="Celebrations & competitions" title="Events & fests" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {events.map((e) => (
            <div
              key={e.title}
              className={`bg-white border border-amber-100 rounded-xl p-5 border-t-4 ${e.color}`}
            >
              <div className="text-2xl mb-3">{e.icon}</div>
              <h4 className="font-serif text-base font-bold text-purple-900 mb-2">{e.title}</h4>
              <p className="text-xs text-amber-900 leading-relaxed mb-3">{e.desc}</p>
              <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-md ${e.badge}`}>
                {e.date}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sports & Fitness ── */}
      <section className="mb-12">
        <SectionHeader label="Stay active" title="Sports & fitness" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sports.map((s) => (
            <div key={s.title} className="bg-purple-900 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">{s.icon}</div>
              <h4 className="font-serif text-lg font-bold text-amber-50 mb-1">{s.title}</h4>
              <p className="text-sm text-purple-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Library & Cafeteria ── */}
      <section className="mb-12">
        <SectionHeader label="Campus facilities" title="Library & cafeteria" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {facilities.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-amber-200 rounded-xl p-5"
              style={{ borderLeft: "4px solid #F59E0B" }}
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <h4 className="font-serif text-base font-bold text-purple-900 mb-2">{f.title}</h4>
              <p className="text-sm text-amber-900 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="bg-purple-900 rounded-2xl overflow-hidden">
        <div className="h-1.5 bg-amber-400 w-full" />
        <div className="p-8 sm:p-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-amber-50 mb-3">
            Ready to be part of this?
          </h2>
          <p className="text-purple-200 text-base leading-relaxed max-w-lg mx-auto mb-8">
            Join thousands of students who are building skills, friendships and memories
            that last a lifetime. Your campus journey starts here.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <button className="bg-amber-400 text-yellow-900 font-semibold text-sm px-8 py-3 rounded-lg hover:bg-amber-300 transition">
              Apply now
            </button>
            <button className="bg-transparent text-amber-50 border border-white/30 text-sm font-medium px-8 py-3 rounded-lg hover:bg-white/10 transition">
              View courses
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/10">
            {ctaPerks.map((p) => (
              <div key={p.label}>
                <div className="font-serif text-lg font-bold text-amber-400">{p.num}</div>
                <div className="text-xs text-purple-300 mt-0.5">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}