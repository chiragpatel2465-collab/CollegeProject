import React, { useState } from 'react';
import { Phone, Mail, Globe, MapPin, Clock } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const SSIT_CONTACT = {
  name: "Shree Swaminarayan Institute of Technology",
  shortName: "SSIT",
  address: "Near Agora Mall & Indira Bridge, Sardar Patel Ring Road, Bhat Circle, Ahmedabad Airport-Gandhinagar Highway, Bhat, Gandhinagar - 382428, Gujarat, India",
  phones: [
    { label: "General Enquiry", number: "+91 9408260607" },
    { label: "Admissions",      number: "+91 7043609281" },
   // { label: "MCA Programme",   number: "+91 9099063433" },
  ],
  emails: [
    { label: "General",  address: "info@ssit.co.in" },
    { label: "Director", address: "ssit.director@gmail.com" },
  ],
  website: "www.ssit.co.in",
  officeHours: "Mon – Sat: 9:00 AM – 5:00 PM | Sun: Closed",
  socials: {
    facebook:  "https://www.facebook.com/ssit.gandhinagar/",
    instagram: "https://www.instagram.com/ssit.gandhinagar/",
    twitter:   "#", 
  },
  // Replaced with a generalized embed URL for demonstration; update with exact PB value if needed

  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7515129.465733003!2d63.40143407500002!3d23.1155091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c4a9e3deea261%3A0xbc05c1601bdba993!2sShree%20Swaminarayan%20Institute%20of%20Technology!5e0!3m2!1sen!2sus!4v1776053018262!5m2!1sen!2sus"
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.fullName || formData.fullName.length < 2) newErrors.fullName = "Name must be at least 2 characters.";
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (!formData.phone || formData.phone.replace(/\D/g, '').length < 10) newErrors.phone = "Phone number must be at least 10 digits.";
    if (!formData.subject || formData.subject.length < 5) newErrors.subject = "Subject must be at least 5 characters.";
    if (!formData.message || formData.message.length < 20) newErrors.message = "Message must be at least 20 characters long.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for the field being typed in
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      
      {/* ① Hero Banner */}
      <section className="w-full bg-purple-900 py-16 relative overflow-hidden flex flex-col items-center justify-center">
        {/* Subtle radial overlay */}
        <div className="absolute inset-0 bg-purple-900 opacity-50 pointer-events-none"></div>
        <div className="relative z-10 text-center px-6">
          <p className="text-amber-400 text-sm mb-4">Home / Contact Us</p>
          <h1 className="text-amber-400 text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-amber-200 text-base max-w-lg mx-auto">Get in touch with us — we'd love to hear from you</p>
        </div>
      </section>

      {/* ② Two-Column Contact Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT — Contact Form */}
        <div>
          <span className="text-purple-600 text-sm uppercase tracking-widest font-medium mb-2 block">Contact Us</span>
          <h2 className="text-purple-900 text-3xl font-bold mb-8">Get In Touch</h2>

          {isSubmitted && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 flex items-center shadow-sm">
              <span>✅ Thank you! We'll get back to you within 24 hours.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-yellow-600 text-sm font-medium mb-1.5" htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Rahul Sharma"
                className="w-full rounded-lg border border-amber-200 bg-white px-4 py-3 text-slate-700 placeholder:text-purple-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" />
              {errors.fullName && <p className="text-yellow-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-yellow-600 text-sm font-medium mb-1.5" htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. rahul@gmail.com"
                className="w-full rounded-lg border border-amber-200 bg-white px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-yellow-600 text-sm font-medium mb-1.5" htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. +91 98765 43210"
                className="w-full rounded-lg border border-amber-200 bg-white px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-yellow-600 text-sm font-medium mb-1.5" htmlFor="subject">Subject / Topic</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is your query about?"
                className="w-full rounded-lg border border-amber-200 bg-white px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>

            <div>
              <label className="block text-yellow-600 text-sm font-medium mb-1.5" htmlFor="message">Message / Query</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Write your message here... We'll get back to you within 24 hours." rows={5}
                className="w-full rounded-lg border border-amber-200 bg-white px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 mt-2 shadow-sm">
              Send Message &rarr;
            </button>
          </form>
        </div>

        {/* RIGHT — Contact Details Panel */}
        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm h-fit">
          <span className="text-indigo-600 text-sm uppercase tracking-widest font-medium mb-2 block">Contact Us</span>
          <h2 className="text-slate-800 text-3xl font-bold mb-4">Reach Us Directly</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            Have questions about admissions, courses, or campus life? We're here to help — reach out through any of the channels below.
          </p>

          <div className="flex flex-col">
                {/* Phone & Email Row */}
   <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm h-fit">
 

  {/* 2x2 Grid for Primary Info */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-10">
    
    {/* Cell 1: Call Us */}
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
          <Phone className="text-slate-400 w-5 h-5" />
        </div>
        <p className="text-slate-800 font-semibold text-sm uppercase tracking-wide">Call Us</p>
      </div>
      <div className="flex flex-col space-y-1 pl-1">
    
        {SSIT_CONTACT.phones.map((phone, idx) => (
          <a key={idx} href={`tel:${phone.number}`} className="text-slate-600 text-sm hover:text-indigo-600 transition-colors">
            {phone.number} <span className="text-slate-400 text-xs">({phone.shortLabel || phone.label})</span>
          </a>
        ))}
      </div>
    </div>

    {/* Cell 2: Email Us */}
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
          <Mail className="text-slate-400 w-5 h-5" />
        </div>
        <p className="text-slate-800 font-semibold text-sm uppercase tracking-wide">Email Us</p>
      </div>
      <div className="flex flex-col space-y-1 pl-1">
        {SSIT_CONTACT.emails.map((email, idx) => (
          <a key={idx} href={`mailto:${email.address}`} className="text-slate-600 text-sm hover:text-indigo-600 transition-colors break-all">
            {email.address}
          </a>
        ))}
      </div>
    </div>

    {/* Cell 3: Website */}
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
          <Globe className="text-slate-400 w-5 h-5" />
        </div>
        <p className="text-slate-800 font-semibold text-sm uppercase tracking-wide">Website</p>
      </div>
      <div className="pl-1">
        <a href={`https://${SSIT_CONTACT.website}`} target="_blank" rel="noreferrer" className="text-slate-600 text-sm hover:text-indigo-600 transition-colors">
          {SSIT_CONTACT.website}
        </a>
      </div>
    </div>

    {/* Cell 4: Office Hours */}
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
          <Clock className="text-slate-400 w-5 h-5" />
        </div>
        <p className="text-slate-800 font-semibold text-sm uppercase tracking-wide">Working Hours</p>
      </div>
      <div className="pl-1">
        <p className="text-slate-600 text-sm leading-tight">
          {SSIT_CONTACT.officeHours}
        </p>
      </div>
    </div>
  </div>

  {/* Full Width Bottom Section for Address & Socials */}
  <div className="pt-8 border-t border-slate-100 space-y-6">
    <div className="flex items-start gap-4">
      <MapPin className="text-slate-400 w-6 h-6 mt-1 flex-shrink-0" />
      <div>
        <p className="text-slate-800 font-semibold text-sm uppercase tracking-wide mb-1">Campus Address</p>
        <p className="text-slate-600 text-sm leading-relaxed">
          {SSIT_CONTACT.address}
        </p>
      </div>
    </div>

  
  </div>
</div>

           
</div>

          {/* Social Links */}
          <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium mb-4">Follow Us On</p>
            <div className="flex gap-3">
              <a href={SSIT_CONTACT.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 transition-all duration-200 hover:shadow-md hover:border-slate-300 hover:text-blue-600 cursor-pointer">
                <FaFacebook size={18} />
              </a>
              <a href={SSIT_CONTACT.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 transition-all duration-200 hover:shadow-md hover:border-slate-300 hover:text-sky-500 cursor-pointer">
                <FaTwitter size={18} />
              </a>
              <a href={SSIT_CONTACT.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 transition-all duration-200 hover:shadow-md hover:border-slate-300 hover:text-pink-500 cursor-pointer">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ③ Google Maps Embed */}
      <section className="w-full border-t border-slate-200 bg-slate-200">
        <div className="w-full h-72 md:h-96">
          <iframe
            src={SSIT_CONTACT.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SSIT Campus Location"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      
    </div>
  );
}