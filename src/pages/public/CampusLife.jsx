import HeroBanner from "../../Components/UI/HeroBanner";
import SectionTitle from "../../Components/UI/SectionTitle";
import CTAsection from "../../Components/UI/CTAsection";
import { GiCoffeeCup, GiCricketBat} from "react-icons/gi";
import { FaComputer, FaVolleyball } from "react-icons/fa6";
import { HiMiniBookOpen } from "react-icons/hi2";
import { MdSportsTennis } from "react-icons/md";

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
  { icon: <GiCricketBat/>, title: "Cricket",   desc: "Full-size ground with practice nets" },
  { icon: <MdSportsTennis/>, title: "Badminton", desc: "4 indoor courts, open daily" },
  { icon: <FaVolleyball/>, title: "Volleyball", desc: "Outdoor & indoor courts available" },
];

const facilities = [
  {
    icon: <HiMiniBookOpen />,
    title: "Central library",
    desc: "Over 40,000 books, 200+ journals, digital e-library access. Reading halls open 8 am – 9 pm, Mon – Sat.",
  },
  {
    icon: <FaComputer />,
    title: "Digital resources",
    desc: "Online access to NPTEL, DELNET and research databases. Dedicated study pods with high-speed Wi-Fi.",
  },
  {
    icon: <GiCoffeeCup />,
    title: "Canteen",
    desc: "Hygienic, affordable meals — breakfast, lunch and dinner. Separate Jain and non-Jain counters available.",
  }
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



/* ── Main component ── */
export default function CampusLife() {
  return (
    <div className="bg-brand-surface min-h-screen">

      {/* ── Hero ── */}
      <HeroBanner
      pageTitle="Life beyond the classroom"
      pageDesc="A vibrant campus where every student finds their passion — from sports courts to fest stages, from library shelves to cafeteria conversations."
      pageName="Campus Life"
      />
     
      {/* ── Gallery ── */}

      <section className="mb-12">
        <SectionTitle mainText="Campus in pictures" subText="Gallery" />
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-3" style={{ gridTemplateRows: "auto" }}>
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
        <p className="text-xs text-center text-amber-700 mt-2">
          Replace the colored blocks above with real <code>&lt;img&gt;</code> tags in your project.
        </p>
      </section>

      {/* ── Events & Fests ── */}
      <section className="mb-12">
        <SectionTitle mainText="Celebrate every moment" subText="Events & fests" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {events.map((e) => (
            <div
              key={e.title}
              className="bg-white border border-brand-mid/20 rounded-xl p-5 border-t-4 border-brand-purple"
            >
              <div className="text-2xl mb-3">{e.icon}</div>
              <h4 className=" text-xl font-bold text-brand-primary mb-2">{e.title}</h4>
              <p className="text-xs text-brand-primary/50 leading-relaxed mb-3">{e.desc}</p>
              <span className="inline-block text-xs text-brand-purple font-medium px-2.5 py-1 rounded-md bg-brand-light border border-brand-mid/20">
                {e.date}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sports & Fitness ── */}
      <section className="max-w-7xl mx-auto mb-12">
        <SectionTitle mainText="Stay active, stay healthy" subText="Sports & fitness" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sports.map((s) => (
            <div key={s.title} className="bg-brand-primary rounded-xl p-6 text-center">
              <div className="inline-block p-3 bg-brand-light text-4xl mb-3 text-brand-purple border border-brand-purple rounded-xl">{s.icon}</div>
              <h4 className="font-serif text-lg font-bold text-brand-light mb-1">{s.title}</h4>
              <p className="text-sm text-brand-light/50">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Library & Cafeteria ── */}
      <section className="max-w-7xl mx-auto mb-12">
        <SectionTitle mainText="Campus facilities" subText="Library & cafeteria" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {facilities.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-l-4 border-brand-purple rounded-xl p-5">
              <div className="flex justify-center items-center h-12 w-12 text-brand-purple bg-brand-light border border-brand-mid/20 rounded-xl mb-4 text-3xl">{f.icon}</div>
              <h4 className="font-serif text-base font-bold text-brand-primary mb-2">{f.title}</h4>
              <p className="text-sm text-brand-primary/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ── */}
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