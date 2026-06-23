import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClubs } from '../../hooks/useClubs';
import { Volleyball, Code2, Medal, Lightbulb, MessageCircle, ArrowRight, User } from 'lucide-react';
import HeroBanner from '../../Components/UI/HeroBanner';

const IconMap = {
  Volleyball: Volleyball,
  Code2: Code2,
};

export default function ClubsPage() {
  const { clubs } = useClubs();
  const [LoggedIn, setLoggedIn] = useState(false)
  const sportsClubs = clubs.filter(c => c.category === 'Sports');
  const skillClubs = clubs.filter(c => c.category === 'Skill Development');

  const renderClubCard = (club) => {
    const IconComponent = IconMap[club.icon] || User;

    return (
      <div key={club.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 overflow-hidden border border-slate-100 flex flex-col h-full">
        {/* Top Accent Bar */}
        <div className="h-1 w-full bg-brand-purple"></div>
        
        <div className="p-6 flex flex-col grow">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-brand-light border border-brand-mid/20 text-brand-primary">
            <IconComponent size={32} />
          </div>
          
          <h3 className="text-2xl font-bold text-brand-primary mb-1">{club.name}</h3>
          <p className="text-md font-medium text-brand-primary/50 mb-3">{club.category} • {club.tagline}</p>
          
          <div className="flex items-center text-brand-purple font-bold  text-md mb-6 grow">
            <User size={16} className="mr-2" />
            <span>Leader: <span className="font-medium tx-sm text-brand-primary/50">{club.leaderName}</span></span>
          </div>
          
          <div className="flex flex-col gap-3 mt-auto">
           {LoggedIn? ( <Link 
              to={club.whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-2.5 px-4 rounded-xl border-2 text-sm font-semibold transition-colors text-purple-800 border-yellow-600"
             
            >
              <MessageCircle size={18} className="mr-2" />
              Join on WhatsApp
            </Link>
            ):(<br/>)}
            <Link 
              to={`/clubs/${club.id}`}
              className="flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 bg-linear-to-r from-brand-primary via-brand-purple to-brand-mid"
            >
              Know More
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-surface pb-20">
      {/* Page Hero Banner */}
      <HeroBanner
      pageTitle="Our Clubs & Communities"
      pageName="Clubs"
      pageDesc="Find your tribe, grow your skills, and build friendships that last."
      />
      <div className="max-w-7xl bg-brand-light rounded-xl border border-brand-mid/20 mx-auto px-6 mt-12 space-y-16">
        {/* Sports Category */}
        <section className='py-6 '>
          <div className="flex items-center mb-6">
            <Medal className="text-brand-purple mr-3" size={28} />
            <h2 className="text-3xl font-bold text-brand-primary">Sports Clubs</h2>
          </div>
          <div className="h-1 w-full bg-brand-purple/20 rounded-full mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sportsClubs.map(renderClubCard)}
          </div>
        </section>

        {/* Skill Development Category */}
        <section className='py-6'>
          <div className="flex items-center mb-6">
            <Lightbulb className="text-brand-purple mr-3" size={28} />
            <h2 className="text-3xl font-bold text-brand-primary">Skill Development Clubs</h2>
          </div>
          <div className="h-1 w-full bg-brand-purple/20 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skillClubs.map(renderClubCard)}
          </div>
        </section>
      </div>
    </div>
  );
}