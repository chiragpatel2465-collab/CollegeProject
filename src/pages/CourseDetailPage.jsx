import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCourseDetail } from '../hooks/useCourses';
import * as Icons from 'lucide-react';
import CTAsection from '../Components/UI/CTAsection';
const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { course } = useCourseDetail(id);
  const [selectedImg, setSelectedImg] = useState(null);

  if (!course) return <div className="p-10 text-center">Course not found</div>;

  // Simple dynamic icon helper
  const IconComponent = ({ name, ...props }) => {
    const LucideIcon = Icons[name];
    return LucideIcon ? <LucideIcon {...props} /> : <Icons.HelpCircle {...props} />;
  };

  return (
    <div className="min-h-screen bg-purple-50 pb-20 ">
      {/* 1. Hero Section */}
      <div className="bg-linear-to-r from-purple-900 via-purple-700 to-yellow-500 pt-8 pb-16 px-4 ">
        <div className='h-16'></div>
        <div className="max-w-6xl mx-auto">

          <nav className="flex text-sm text-white mb-4 space-x-2 ">
            <Link to="/" className="hover:text-amber-200">Home</Link>
            <span>&gt;</span>
            <Link to="/courses" className="hover:text-amber-200">Courses</Link>
            <span>&gt;</span>
            <span className="text-white/80">{course.name}</span>
          </nav>

          <h1 className="text-4xl font-bold text-white font-serif mb-2">{course.fullTitle}</h1>


          <div className="flex flex-wrap gap-3">
            {[course.duration, course.eligibility, `Intakes: ${course.intakes.join(', ')}`].map((pill, i) => (
              <span key={i} className="inline-block px-4 py-1.5 text-white bg-transparent border border-white rounded-full text-sm">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8 space-y-12">
        {/* 2. Overview */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-4xl font-bold font-serif text-purple-900 mb-4 flex items-center">
            <Icons.Info className="w-6 h-6 mr-3 text-orange-500" /> Why This Course?
          </h2>
          <p className="text-purple-700 leading-relaxed  text-lg">{course.overview}</p>
        </section>

        {/* 3. Core Modules */}
        <section>
          <h2 className="inline-block text-2xl font-bold text-purple-900 border-b-2 border-b-orange-500 pb-2 mb-6">Core Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {course.coreModules.map((module, i) => (
              <div key={i} className="bg-white p-5 rounded-xl  border-l-4 border-l-yellow-500 shadow-sm">
                <IconComponent name={module.icon} className="w-8 h-8 text-orange-400 mb-4" />
                <h4 className="font-bold text-purple-900 text-lg mb-1">{module.title}</h4>
                <p className="text-sm text-purple-700">{module.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Career Prospects */}
        <section className="bg-white p-8 border-l-4 border-l-purple-700 rounded-2xl font-serif  shadow-sm">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">Where This Takes You</h2>
          <div className="flex flex-wrap gap-3 ">
            {course.careerProspects.map((role, i) => (
              <div key={i} className="flex items-center px-3  bg-amber-50 border border-amber-300 text-yellow-800 rounded-full font-medium">
                <Icons.Briefcase className="w-4 h-4 mr-2 text-yellow-600" /> {role}
              </div>
            ))}
          </div>
        </section>

        {/* 5. Lab Gallery */}
        <section>
          <h2 className="inline-block text-2xl font-bold border-b-2 border-b-amber-400 text-purple-900 mb-6 pb-2">Our Facilities</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {course.labImages.map((img) => (
              <div key={img.id} className="group cursor-pointer" onClick={() => setSelectedImg(img)}>
                <div className="overflow-hidden rounded-xl aspect-video mb-2">
                  <img src={img.src} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-sm text-slate-500 text-center">{img.caption}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Faculty */}
        <section>
          <h2 className=" inline-block text-2xl border-b-2 border-b-amber-400 pb-2 font-bold text-purple-900 mb-6">Meet The Faculty</h2>
          <div className="flex overflow-x-auto pb-4 gap-6 no-scrollbar">
            {course.faculty.map((f, i) => (
              <div key={i} className="min-w-[300px] bg-white p-6 rounded-2xl border-l-4 border-amber-400 shadow-sm flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                  {f.avatar ? (
                    <img src={f.avatar} alt={f.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-slate-400">
                      {f.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-purple-900">{f.name}</h4>
                  <p className="text-xs text-yellow-400 font-medium mb-1">{f.designation}</p>
                  <p className="text-xs text-yellow-800">{f.specialization}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-amber-50 text-[10px] rounded-full uppercase border border-yellow-800 text-amber-800">
                    {f.experience}+ Years Exp.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Zero-Library Lightbox */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-indigo-400">
            <Icons.X size={32} />
          </button>
          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <img src={selectedImg.src} alt={selectedImg.caption} className="w-full h-auto rounded-lg shadow-2xl" />
            <p className="text-white text-center mt-4 text-lg">{selectedImg.caption}</p>
          </div>
        </div>
      )}
      {/* CTA SECTION */}
      <CTAsection
        Header={`Interested in ${course.name}?`}
        Desc={`Begin your journey in ${course.name} at SSIT. Apply now or get in touch with us to learn more.`}
        Primarybtn="Apply Now"
        PrimaryLink="/Admissions"
        Secondarybtn="Contact Us"
        SecondaryLink="/Contact"
      />

    </div>
  );
};

export default CourseDetailPage;