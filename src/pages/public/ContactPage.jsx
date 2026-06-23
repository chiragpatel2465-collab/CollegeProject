import React, { useState } from 'react';
import { Phone, Mail, Globe, MapPin, Clock } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import HeroBanner from '../../Components/UI/HeroBanner';
import ContactSection from '../../Components/UI/ContactSection';


  // Replaced with a generalized embed URL for demonstration; update with exact PB value if needed

const mapEmbedUrl= "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7515129.465733003!2d63.40143407500002!3d23.1155091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c4a9e3deea261%3A0xbc05c1601bdba993!2sShree%20Swaminarayan%20Institute%20of%20Technology!5e0!3m2!1sen!2sus!4v1776053018262!5m2!1sen!2sus";


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
    <div className="min-h-screen bg-brand-surface font-sans">
      
      {/* ① Hero Banner */}
      <HeroBanner
      pageTitle="Contact Us"
      pageDesc="Get in touch with us — we'd love to hear from you"
      pageName="Contact"
      />
     <ContactSection/>

      {/* ③ Google Maps Embed */}
      <section className="w-full bg-purple-50 ">
        <div className="w-full h-72 md:h-96">
          <iframe
            src={mapEmbedUrl}
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