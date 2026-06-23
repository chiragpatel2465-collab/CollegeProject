import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, AlertCircle } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';




// --- Hook Abstraction Layer with Validation ---
const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  // Real-time validation logic
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.trim().length < 3) error = 'Name must be at least 3 characters';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) error = 'Email is required';
        else if (!emailRegex.test(value)) error = 'Please enter a valid email address';
        break;
      case 'phone':
        // Optional field, but if entered, must be valid (numbers, spaces, dashes, plus sign, min 10 chars)
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (value && !phoneRegex.test(value)) error = 'Please enter a valid phone number';
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required';
        else if (value.trim().length < 10) error = 'Message must be at least 10 characters long';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validate in real-time as the user types
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateAll()) return; // Stop submission if validation fails

    setStatus('submitting');
    
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus('success');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setErrors({});
    
    // Reset status after a few seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return { formData, errors, status, handleChange, handleSubmit };
};

// --- Main Component ---
const ContactSection = () => {
  const { formData, errors, status, handleChange, handleSubmit } = useContactForm();

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Helper function for input styles based on error state
  const getInputStyle = (error) => `
    w-full bg-transparent border rounded-xl px-4 py-3 text-white placeholder-gray-500 
    focus:outline-none transition-colors
    ${error 
      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
      : 'border-brand-purple focus:border-brand-purple focus:ring-1 focus:ring-brand-purple'
    }
  `;

  return (
    <section className="min-h-screen bg-brand-light flex items-center justify-center p-4 md:p-8 font-sans text-gray-300">
      <div className="max-w-6xl w-full  rounded-3xl p-4 md:p-8 shadow-2xl relative overflow-hidden">
       
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Form */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <h2 className="inline-block text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-brand-primary via-brand-purple to-brand-mid font-sans mb-10 tracking-tight">
              Get in touch.
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className={getInputStyle(errors.name)}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={getInputStyle(errors.email)}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-2">Phone (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className={getInputStyle(errors.phone)}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  rows="4"
                  className={`${getInputStyle(errors.message)} resize-none`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'submitting'}
                type="submit"
                className="bg-linear-to-r from-brand-primary via-brand-purple to-brand-mid text-white font-medium py-3 px-8 rounded-full transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Sent Successfully!' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column: Contact Details (Modern 2x2 Grid) */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center mt-8 lg:mt-0 lg:pt-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              
              <div className="flex items-start gap-4">
                <MapPin className="text-brand-mid w-6 h-6 shrink-0 mt-1" />
                <div>
                  <h3 className="text-brand-primary text-xl font-medium mb-2">Address</h3>
                  <p className="text-sm text-brand-primary/70 leading-relaxed">
                    2972 Westheimer Rd. Santa Ana,<br />Illinois 85486
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-brand-mid w-6 h-6 shrink-0 mt-1" />
                <div>
                  <h3 className="text-brand-primary text-xl font-medium mb-2">Email</h3>
                  <a href="mailto:kenzi.lawson@example.com" className="text-sm text-brand-primary/70 transition-colors">
                    kenzi.lawson@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-brand-mid w-6 h-6 shrink-0 mt-1" />
                <div>
                  <h3 className="text-brand-primary text-xl font-medium mb-2">Phone</h3>
                  <a href="tel:+11234567890" className="text-sm text-brand-primary/70  transition-colors">
                    (123) 456-7890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div>
                  <h3 className="inline-block font-semibold bg-linear-to-r from-brand-primary via-brand-purple to-brand-mid bg-clip-text text-transparent text-xl mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    <Link to="#" className="bg-brand-light border border-brand-mid/20 p-2.5 rounded-full text-brand-mid/20 hover:text-pink-600 hover:bg-brand-light/50 transition-all">
                      <FaInstagram className="w-5 h-5" />
                    </Link>
                    <Link to="#" className="bg-brand-light border border-brand-mid/20 p-2.5 rounded-full text-brand-mid/20 hover:text-blue-600 hover:bg-brand-light/50 transition-all">
                      <FaLinkedin className="w-5 h-5" />
                    </Link>
                    <Link to="#" className="bg-brand-light border border-brand-mid/20 p-2.5 rounded-full text-brand-mid/20 hover:text-red-500 hover:bg-brand-light/50 transition-all">
                      <FaYoutube className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;