import { useState } from "react";
import SectionTitle from "../../Components/UI/SectionTitle";
/* ─── Data ─────────────────────────────────────────────────── */

const steps = [
  { num: "01", title: "Register online",   desc: "Create your applicant account on the admissions portal" },
  { num: "02", title: "Fill the form",     desc: "Enter your personal, academic and contact details carefully" },
  { num: "03", title: "Upload documents",  desc: "Attach all required supporting documents listed below" },
  { num: "04", title: "Pay the fee",       desc: "Submit the application fee securely through the portal" },
  { num: "05", title: "Await selection",   desc: "Track your merit list status on the applicant dashboard" },
];

const programs = [
  {
    title: "B.Tech / B.E.",
    desc: "Bachelor of Technology or Engineering across core and emerging disciplines",
    duration: "4 years · Full-time",
  },
  {
    title: "BCA",
    desc: "Bachelor of Computer Applications — foundational computing and software skills",
    duration: "3 years · Full-time",
  },
  {
    title: "MCA",
    desc: "Master of Computer Applications — advanced software, systems and data expertise",
    duration: "2 years · Full-time",
  },
];

const documents = [
  "Class 10 marksheet & passing certificate",
  "Class 12 marksheet & passing certificate",
  "School / college transfer certificate",
  "Aadhar card or government-issued photo ID",
  "Passport-size photographs (4 copies)",
  "Caste certificate (if applicable)",
  "Migration certificate (if from another board)",
  "Domicile / residence certificate",
];

const faqs = [
  {
    q: "What is the eligibility for B.Tech admission?",
    a: "Candidates must have passed 10+2 with Physics, Chemistry, and Mathematics with a minimum aggregate of 60%. Students appearing in board exams may apply provisionally.",
  },
  {
    q: "What is the eligibility for BCA and MCA?",
    a: "For BCA: 10+2 from any stream with Mathematics at 10th or 12th level. For MCA: a BCA, B.Sc (CS/IT) or equivalent degree with Mathematics as a subject.",
  },
  {
    q: "Are scholarships available for deserving students?",
    a: "Yes. Merit-based and need-based scholarships are offered. Students scoring above 90% in board exams are eligible for a 30% tuition fee waiver. Government scholarship schemes are also facilitated.",
  },
  {
    q: "Is hostel accommodation provided?",
    a: "The college provides separate, well-secured hostel facilities for boys and girls, equipped with Wi-Fi, a mess, and 24-hour security.",
  },
  {
    q: "Can I apply for more than one program?",
    a: "Yes. Applicants may indicate preference for up to two programs in a single application. Final allocation is subject to merit and seat availability.",
  },
];

/* ─── Sub-components ────────────────────────────────────────── */



function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-amber-100 last:border-b-0">
      <button
        className="w-full flex justify-between items-center px-5 py-4 text-left font-serif text-base font-semibold text-purple-800"
        onClick={() => setOpen(!open)}
      >
        {faq.q}
        <span
          className="text-yellow-600 text-sm transition-transform duration-200"
          style={{ display: "inline-block", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▾
        </span>
      </button>
      {open && (
        <p className="px-5 pb-4 text-sm text-amber-900 font-serif leading-relaxed">{faq.a}</p>
      )}
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */

export default function Admissions() {
  const scrollToContact = () =>
    document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="w-full mx-auto px-4 py-10 font-serif bg-amber-50 min-h-screen">

      {/* ── Hero ── */}
      <div className="relative bg-purple-900 rounded-2xl overflow-hidden mb-10">
        <div className="h-1.5 bg-amber-400 w-full" />
        <div className="p-10">
          <span className="inline-block bg-amber-400/20 text-amber-400 text-xs tracking-widest uppercase px-4 py-1 rounded-full border border-amber-400/30 mb-5">
            Admissions 2025 – 26
          </span>
          <h1 className="font-serif text-4xl font-bold text-amber-50 leading-tight mb-3">
            Shape your future.<br />Begin here.
          </h1>
          <div className="w-14 h-0.5 bg-amber-400 rounded mb-5" />
          <p className="text-purple-200 text-base leading-relaxed max-w-lg mb-7">
            We invite committed students to join a tradition of academic excellence,
            character, and service. Explore our programs and take the first step today.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={scrollToContact}
              className="bg-amber-400 text-yellow-900 font-semibold text-sm px-7 py-2.5 rounded-lg hover:bg-amber-300 transition"
            >
              Apply now
            </button>
            <button className="bg-transparent text-amber-50 border border-white/30 text-sm px-7 py-2.5 rounded-lg hover:bg-white/10 transition">
              Download prospectus
            </button>
          </div>
        </div>
      </div>

      {/* ── How to Apply ── */}
      <section className="mb-12">
        <SectionTitle mainText="Admission process" subText="How to apply" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((s) => (
            <div
              key={s.num}
              className="bg-white border border-amber-200 rounded-xl p-4"
              style={{ borderTop: "4px solid #FBBF24" }}
            >
              <div className="font-serif text-2xl font-bold text-yellow-600 mb-2">{s.num}</div>
              <h4 className="font-serif font-semibold text-purple-800 text-sm mb-1">{s.title}</h4>
              <p className="text-xs text-amber-800 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Programs ── */}
      <section className="mb-12">
        <SectionTitle mainText="Academic programs" subText="Programs available" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {programs.map((p) => (
            <div
              key={p.title}
              className="bg-purple-50 border border-purple-200 rounded-xl p-5"
              style={{ borderLeft: "4px solid #7C3AED" }}
            >
              <h4 className="font-serif text-lg font-bold text-purple-900 mb-2">{p.title}</h4>
              <p className="text-sm text-purple-700 leading-relaxed mb-4">{p.desc}</p>
              <span className="inline-block bg-amber-50 text-yellow-800 border border-amber-300 text-xs px-3 py-1 rounded-md">
                {p.duration}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Documents ── */}
      <section className="mb-12">
        <SectionTitle mainText="Documents required" subText="What to bring" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {documents.map((doc) => (
            <div
              key={doc}
              className="flex items-start gap-3 bg-white border border-amber-200 rounded-xl px-4 py-3"
            >
              <div className="mt-1.5 min-w-2 h-2 w-2 rounded-full bg-yellow-600" />
              <span className="text-sm text-amber-900 leading-relaxed">{doc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mb-12">
        <SectionTitle mainText="Frequently asked questions" subText="Common queries" />
        <div className="border border-amber-200 rounded-xl overflow-hidden bg-white divide-y divide-amber-100">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>
      </section>

      {/* ── Contact / Apply CTA ── */}
      <section id="contact-section" className="bg-purple-900 rounded-2xl overflow-hidden">
        <div className="h-1.5 bg-amber-400 w-full" />
        <div className="p-8 sm:p-10">
          <h3 className="font-serif text-2xl font-bold text-amber-50 mb-1">Apply for admission</h3>
          <p className="text-purple-300 text-sm mb-7 leading-relaxed">
            Fill in your details below and our admissions team will get in touch with you shortly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Full name"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-amber-50 placeholder:text-white/40 outline-none focus:border-amber-400 transition font-serif"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-amber-50 placeholder:text-white/40 outline-none focus:border-amber-400 transition font-serif"
            />
            <input
              type="tel"
              placeholder="Mobile number"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-amber-50 placeholder:text-white/40 outline-none focus:border-amber-400 transition font-serif"
            />
            <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-amber-50 outline-none focus:border-amber-400 transition font-serif cursor-pointer">
              <option value="" disabled>Program of interest</option>
              <option>B.Tech / B.E.</option>
              <option>BCA</option>
              <option>MCA</option>
            </select>
          </div>

          <textarea
            placeholder="Any additional message or query (optional)"
            rows={3}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-amber-50 placeholder:text-white/40 outline-none focus:border-amber-400 transition resize-none mb-5 font-serif"
          />

          <button className="bg-amber-400 text-yellow-900 font-semibold text-sm px-8 py-3 rounded-lg hover:bg-amber-300 transition">
            Submit application
          </button>

          <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-white/10">
            {[
              { label: "Admissions office", val: "Mon – Sat, 9:00 am – 5:00 pm" },
              { label: "Phone",             val: "+91 98765 43210" },
              { label: "Email",             val: "admissions@college.edu.in" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-amber-50 text-xs font-semibold mb-0.5">{item.label}</p>
                <p className="text-purple-300 text-xs">{item.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}