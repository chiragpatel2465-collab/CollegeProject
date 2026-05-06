import React, { useState } from 'react';
import { useParams, useNavigate , Link } from 'react-router-dom';
import { useClubDetail } from '../hooks/useClubs';
import { ArrowLeft, Volleyball, Code2, Mail, Phone, MessageCircle, X, User } from 'lucide-react';

const IconMap = {
  Volleyball: Volleyball,
  Code2: Code2,
};

// Helper for initials
const getInitials = (name) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

export default function ClubDetailPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { club } = useClubDetail(id);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!club) return <div className="p-10 text-center text-slate-600">Club not found.</div>;

  const IconComponent = IconMap[club.icon] || User;

  const AvatarFallback = ({ name, url }) => (
    url ? (
      <img src={url} alt={name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
    ) : (
      <div className="w-16 h-16 rounded-full   text-amber-400 flex items-center justify-center bg-purple-900 font-bold text-xl shadow-sm">
        {getInitials(name)}
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-amber-50 pb-20">
      
      {/* 1. Hero Banner */}
      <div className="pt-30 pb-16 px-6 relative bg-purple-800">
        <div className="max-w-5xl mx-auto">
                   
          <div className="text-amber-400/70 text-sm mb-6 flex items-center space-x-2">
            <Link to="/" className="hover:text-amber-50">Home</Link>
            <span>&gt;</span>
            <Link to="/clubs" className="hover:text-amber-50">Clubs</Link>
            <span>&gt;</span>
            <span className="text-amber-400">{club.name}</span>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="bg-white/20 p-5 rounded-2xl backdrop-blur-sm border border-white/10 text-amber-400">
              <IconComponent size={48} />
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-amber-50/20 rounded-full text-yellow-400 text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-sm">
                {club.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-amber-50 mb-3" >{club.name}</h1>
              <p className="text-lg text-yellow-400">{club.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-8 space-y-12 relative z-10">
        
        {/* 2. About — Mission & Vision */}
        <section className="bg-white rounded-2xl shadow-sm p-8 border border-purple-100">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">About the Club</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-amber-50 rounded-xl p-6 border  border-amber-800">
              <h3 className="font-bold text-purple-950 mb-2 flex items-center">
                <span className="w-2 h-2 rounded-full mr-3 bg-amber-600" ></span> Mission
              </h3>
              <p className="text-yellow-900 leading-relaxed">{club.mission}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-800">
              <h3 className="font-bold text-purple-950 mb-2 flex items-center">
                <span className="w-2 h-2 rounded-full mr-3 bg-amber-600"></span> Vision
              </h3>
              <p className="text-amber-900 leading-relaxed">{club.vision}</p>
            </div>
          </div>
          <p className="text-amber-900 leading-relaxed text-lg">{club.about}</p>
        </section>

        {/* 3. Club Leader & Admins */}
        <section>
          <h2 className="text-2xl font-bold text-purple-900 mb-6 border-b border-amber-400 pb-2">Meet the Team</h2>
          
          {/* Leader Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6   border-l-4 border-l-amber-400 mb-6 flex flex-col md:flex-row items-center md:items-start gap-6 hover:shadow-md transition-all" >
            <AvatarFallback name={club.leader.name} url={club.leader.avatar} />
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-xl font-bold text-purple-900">{club.leader.name}</h3>
              <p className="text-sm font-medium text-amber-400" >{club.leader.role}</p>
              <div className="mt-4 flex flex-col md:flex-row gap-4 text-sm text-purple-600">
                <a href={`mailto:${club.leader.email}`} className="flex items-center justify-center md:justify-start hover:text-purple-400 transition-colors"><Mail size={16} className="mr-2" /> {club.leader.email}</a>
                <a href={`tel:${club.leader.phone}`} className="flex items-center justify-center md:justify-start hover:text-purple-400 transition-colors"><Phone size={16} className="mr-2" /> {club.leader.phone}</a>
              </div>
            </div>
          </div>

          {/* Admins Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-6">
            {club.admins.map((admin, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm p-5 border border-slate-100 border-l-4 border-l-purple-700 flex items-center gap-4 hover:shadow-md transition-all">
                <div className="w-16 h-16">
                   <AvatarFallback name={admin.name} url={admin.avatar} />
                </div>
                <div className='ml-4'>
                  <h4 className="font-bold text-purple-900">{admin.name}</h4>
                  <p className="text-xs text-amber-400 font-medium mb-1">{admin.role}</p>
                  <a href={`mailto:${admin.email}`} className="text-xs text-purple-500 hover:text-purple-600">{admin.email}</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. How to Join */}
       {loggedIn?( <section className="bg-amber-500 rounded-2xl shadow-sm p-8 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">How to Join</h2>
          
          {/* Visual Stepper */}
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center max-w-3xl mx-auto mb-12 gap-8 md:gap-0">
            {/* Dashed line for desktop */}
            <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[2px] bg-indigo-200 border-t-2 border-dashed border-indigo-300 -z-10"></div>
            
            {club.howToJoin.map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center relative w-full md:w-1/3 bg-white z-10 px-4">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xl mb-4 shadow-md ring-4 ring-white">
                  {step.step}
                </div>
                <h4 className="font-bold text-slate-800 mb-2">{step.title}</h4>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center text-center mt-10">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 mb-4 inline-block">
              <img src={club.whatsappQR} alt="WhatsApp QR Code" className="w-48 h-48 md:w-56 md:h-56 object-contain" />
            </div>
            <p className="text-slate-500 mb-6 text-sm">Scan to join our WhatsApp group</p>
            
            <a 
              href={club.whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full max-w-sm py-4 px-6 rounded-xl text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-sm"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle size={24} className="mr-3" />
              Join on WhatsApp &rarr;
            </a>
          </div>
        </section>):(<br/>)}

        {/* 5. Photo Gallery */}
        <section>
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Our Moments</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {club.gallery.map((image, idx) => (
              <div key={idx} className="group cursor-pointer" onClick={() => setSelectedImage(image)}>
                <div className="overflow-hidden rounded-xl bg-slate-100 aspect-video mb-2 shadow-sm">
                  <img src={image.src} alt={image.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <p className="text-sm text-amber-500 truncate px-1">{image.caption}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.caption} className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl" />
            <p className="text-white text-center mt-4 text-lg">{selectedImage.caption}</p>
          </div>
        </div>
      )}

    </div>
  );
}