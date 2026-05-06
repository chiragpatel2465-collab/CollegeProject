import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Upload, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  CloudUpload,
  ArrowRight,
  ArrowLeft,
  Image as ImageIcon,
  Check
} from 'lucide-react';

import { FaInstagram , FaLinkedin , FaGithub} from "react-icons/fa";



const FACULTY_LIST = [
  { id: 1, name: "Prof. Ramesh Patel", subject: "Data Structures", dept: "CE" },
  { id: 2, name: "Dr. Sneha Mehta", subject: "Computer Organization", dept: "IT" },
  { id: 3, name: "Prof. Anjali Shah", subject: "Discrete Mathematics", dept: "CE" },
  { id: 4, name: "Dr. Vikram Joshi", subject: "Object Oriented Programming", dept: "IT" },
  { id: 5, name: "Prof. Meena Desai", subject: "Engineering Mathematics", dept: "General" },
  { id: 6, name: "Dr. Arjun Nair", subject: "Computer Networks", dept: "CE" },
];

const CATEGORIES = [
  { name: "Technology", color: "bg-purple-100 text-purple-800" },
  { name: "Sports", color: "bg-green-100 text-green-800" },
  { name: "Cultural & Arts", color: "bg-pink-100 text-pink-800" },
  { name: "Science", color: "bg-blue-100 text-blue-800" },
  { name: "Entrepreneurship", color: "bg-amber-100 text-amber-800" },
  { name: "Photography", color: "bg-orange-100 text-orange-800" },
  { name: "Literary & Debate", color: "bg-teal-100 text-teal-800" }
];

export default function CreateClubForm({ onCancel }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const topRef = useRef(null);

  const [formData, setFormData] = useState({
    clubName: "",
    category: "",
    description: "",
    logo: null,
    goalInput: "",
    goals: [],
    expectedMembers: 10,
    facultyCoordinator: "",
    memberName: "",
    memberEnrollment: "",
    members: [],
    instagram: "",
    linkedin: "",
    github: "",
    clubImages: [],
    declarationChecked: false,
  });

  // Handle Escape Key
  useEffect(() => {
    const handleEsc = (e) => { e.key === 'Escape' && onCancel(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  const update = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.clubName || formData.clubName.length < 3) newErrors.clubName = "Club name must be at least 3 characters";
      if (!formData.category) newErrors.category = "Please select a category";
      if (!formData.description || formData.description.length < 50) newErrors.description = "Description must be at least 50 characters";
      if (!formData.logo) newErrors.logo = "Please upload a club logo or banner";
    }
    if (step === 2) {
      if (formData.goals.length < 1) newErrors.goals = "Add at least one goal";
      if (!formData.facultyCoordinator) newErrors.facultyCoordinator = "Please select a faculty coordinator";
    }
    if (step === 3) {
      if (formData.members.length < 3) newErrors.members = "Add at least 3 founding members";
    }
    if (step === 4) {
      if (!formData.declarationChecked) newErrors.declaration = "Please accept the declaration to submit";
    }
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitted(true);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedFaculty = FACULTY_LIST.find(f => f.name === formData.facultyCoordinator);
  const selectedCategory = CATEGORIES.find(c => c.name === formData.category);

  if (submitted) {
    return (
      <div className="min-h-screen bg-amber-50 p-6 flex items-center justify-center font-sans">
        <div className="bg-white border border-amber-200 rounded-2xl max-w-xl w-full p-10 text-center shadow-sm relative overflow-hidden">
          <div className="h-1 bg-amber-400 absolute top-0 left-0 w-full" />
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="font-serif text-4xl font-bold text-[#4A1D96] mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Your club application is now under review by the faculty coordinator. You will be notified once it is approved or rejected.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 text-left">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-2">Reference Details</p>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[#D97706] font-bold">Application ID: CLB-2026-0042</span>
              <span className="text-xs text-gray-500">Submitted on: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
          <button 
            onClick={onCancel}
            className="flex items-center justify-center gap-2 w-full bg-[#D97706] text-white font-bold py-3 rounded-xl hover:bg-amber-600 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Clubs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 p-6 font-sans" ref={topRef}>
      <h2 className="sr-only">Create club application form</h2>
      
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-8">
        <nav className="flex items-center gap-2 text-sm mb-4">
          <button onClick={onCancel} className="text-gray-500 hover:text-[#4A1D96] transition-colors">Clubs</button>
          <span className="text-gray-400">›</span>
          <span className="text-[#4A1D96] font-medium">Create New Club</span>
        </nav>
        <h1 className="font-serif text-4xl font-bold text-[#4A1D96] mb-2">Create a New Club</h1>
        <p className="text-gray-600 max-w-2xl">
          Fill in the details below to apply for a new student club. Your application will be reviewed by a faculty coordinator.
        </p>
        <div className="w-12 h-0.5 bg-[#D97706] rounded mt-4" />
      </div>

      {/* Stepper */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-4 left-0 w-full h-0.5 bg-amber-200 -z-10" />
          <div 
            className="absolute top-4 left-0 h-0.5 bg-[#4A1D96] transition-all duration-300 -z-10" 
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
          
          {[
            { n: 1, label: "Basic Info" },
            { n: 2, label: "Details" },
            { n: 3, label: "Members" },
            { n: 4, label: "Review" }
          ].map((step) => (
            <div key={step.n} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                ${currentStep > step.n ? 'bg-[#4A1D96] text-amber-50' : 
                  currentStep === step.n ? 'bg-[#D97706] text-[#4A1D96] ring-4 ring-amber-100' : 
                  'bg-white border-2 border-amber-200 text-gray-400'}`}
              >
                {currentStep > step.n ? <Check size={16} strokeWidth={3} /> : step.n}
              </div>
              <span className={`text-[12px] mt-2 font-semibold ${currentStep === step.n ? 'text-[#4A1D96]' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-amber-200 rounded-2xl max-w-3xl mx-auto shadow-sm relative overflow-hidden">
        <div className="h-1 bg-[#D97706] absolute top-0 left-0 w-full" />
        
        <div className="p-8">
          <div className="mb-6 pb-4 border-b border-amber-100">
            <span className="text-[10px] uppercase font-bold text-[#D97706] tracking-widest">Step {currentStep} of 4</span>
            <h3 className="font-serif text-2xl font-bold text-[#4A1D96]">
              {currentStep === 1 ? "Basic Information" : 
               currentStep === 2 ? "Club Details" : 
               currentStep === 3 ? "Members & Media" : "Review & Submit"}
            </h3>
            <p className="text-gray-500 text-sm">
              {currentStep === 1 ? "Tell us the fundamentals of your club" : 
               currentStep === 2 ? "Help us understand your club's purpose and structure" : 
               currentStep === 3 ? "Add your founding members and online presence" : 
               "Please review all your details carefully before submitting"}
            </p>
          </div>

          <div className="space-y-6">
            {/* STEP 1 */}
            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Club name *</label>
                  <input 
                    type="text" 
                    value={formData.clubName}
                    onChange={(e) => update('clubName', e.target.value)}
                    placeholder="e.g. Web Wizards Tech Club"
                    className="w-full bg-[#FBF7F0] border border-amber-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#4A1D96]"
                  />
                  <div className="flex justify-between mt-1">
                    {errors.clubName ? <p className="text-red-500 text-xs">{errors.clubName}</p> : <div/>}
                    <span className="text-[10px] text-gray-400">{formData.clubName.length} / 60</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => update('category', e.target.value)}
                    className="w-full bg-[#FBF7F0] border border-amber-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#4A1D96] mb-3"
                  >
                    <option value="">Select a category...</option>
                    {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                  {selectedCategory && (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${selectedCategory.color}`}>
                      {selectedCategory.name}
                    </span>
                  )}
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
                  <textarea 
                    rows={5}
                    value={formData.description}
                    onChange={(e) => update('description', e.target.value)}
                    placeholder="Describe what your club is about..."
                    className="w-full bg-[#FBF7F0] border border-amber-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#4A1D96] resize-none"
                  />
                  <div className="flex justify-between mt-1">
                    {errors.description ? <p className="text-red-500 text-xs">{errors.description}</p> : <div/>}
                    <span className={`text-[10px] ${formData.description.length > 450 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                      {formData.description.length} / 500
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Club logo or banner *</label>
                  {formData.logo ? (
                    <div className="relative rounded-xl overflow-hidden group border border-amber-200">
                      <img src={formData.logo} alt="Logo" className="w-full h-40 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <button onClick={() => update('logo', null)} className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2">
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-amber-300 rounded-xl p-8 bg-amber-50 hover:bg-amber-100 transition cursor-pointer">
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                        if(e.target.files[0]) update('logo', URL.createObjectURL(e.target.files[0]));
                      }} />
                      <CloudUpload size={40} className="text-[#D97706] mb-3" />
                      <p className="text-[#4A1D96] font-bold">Click to upload or drag & drop</p>
                      <p className="text-xs text-gray-400">PNG or JPG · Max 5MB</p>
                    </label>
                  )}
                  {errors.logo && <p className="text-red-500 text-xs mt-1">{errors.logo}</p>}
                </div>
              </>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Goals & objectives *</label>
                  <p className="text-[10px] text-gray-500 mb-2 italic">Add at least 1 goal. Maximum 8 goals allowed.</p>
                  <div className="flex gap-2 mb-4">
                    <input 
                      type="text" 
                      value={formData.goalInput}
                      onChange={(e) => update('goalInput', e.target.value)}
                      placeholder="e.g. Conduct weekly coding sessions"
                      className="flex-1 bg-[#FBF7F0] border border-amber-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#4A1D96]"
                    />
                    <button 
                      onClick={() => {
                        if (formData.goalInput && formData.goals.length < 8) {
                          update('goals', [...formData.goals, formData.goalInput]);
                          update('goalInput', "");
                        }
                      }}
                      className="bg-[#D97706] text-white px-6 rounded-xl font-bold hover:bg-amber-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.goals.map((goal, idx) => (
                      <div key={idx} className="bg-purple-100 text-[#4A1D96] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border border-purple-200">
                        {goal}
                        <button onClick={() => update('goals', formData.goals.filter((_, i) => i !== idx))}><X size={14}/></button>
                      </div>
                    ))}
                  </div>
                  {errors.goals && <p className="text-red-500 text-xs mt-1">{errors.goals}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Expected number of members *</label>
                  <p className="text-[10px] text-gray-500 mb-2 italic">Minimum 5 · Maximum 200</p>
                  <div className="flex items-center">
                    <button 
                      onClick={() => update('expectedMembers', Math.max(5, formData.expectedMembers - 1))}
                      className="bg-amber-100 text-amber-800 px-4 py-2.5 rounded-l-xl hover:bg-amber-200"
                    ><Minus size={18} /></button>
                    <div className="bg-white border-y border-amber-200 px-8 py-2.5 font-bold text-[#4A1D96] w-20 text-center">
                      {formData.expectedMembers}
                    </div>
                    <button 
                      onClick={() => update('expectedMembers', Math.min(200, formData.expectedMembers + 1))}
                      className="bg-amber-100 text-amber-800 px-4 py-2.5 rounded-r-xl hover:bg-amber-200"
                    ><Plus size={18} /></button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Faculty coordinator *</label>
                  <select 
                    value={formData.facultyCoordinator}
                    onChange={(e) => update('facultyCoordinator', e.target.value)}
                    className="w-full bg-[#FBF7F0] border border-amber-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#4A1D96] mb-4"
                  >
                    <option value="">Select a faculty member...</option>
                    {FACULTY_LIST.map(f => <option key={f.id} value={f.name}>{f.name} — {f.subject}</option>)}
                  </select>

                  {selectedFaculty && (
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-200 text-[#4A1D96] font-bold rounded-full flex items-center justify-center text-lg">
                          {selectedFaculty.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-[#4A1D96] leading-none mb-1">{selectedFaculty.name}</p>
                          <p className="text-xs text-gray-500">{selectedFaculty.subject} • Dept: {selectedFaculty.dept}</p>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase px-2 py-1 rounded border border-green-200">
                        Selected as Coordinator
                      </span>
                    </div>
                  )}
                  {errors.facultyCoordinator && <p className="text-red-500 text-xs mt-1">{errors.facultyCoordinator}</p>}
                </div>
              </>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Proposed founding members *</label>
                  <p className="text-[10px] text-gray-500 mb-2 italic">Add at least 3 members · Maximum 20</p>
                  <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <input 
                      type="text" placeholder="Member name" value={formData.memberName} onChange={(e) => update('memberName', e.target.value)}
                      className="flex-1 bg-[#FBF7F0] border border-amber-200 rounded-xl px-4 py-2.5 outline-none"
                    />
                    <input 
                      type="text" placeholder="Enrollment no." value={formData.memberEnrollment} onChange={(e) => update('memberEnrollment', e.target.value)}
                      className="w-full sm:w-40 bg-[#FBF7F0] border border-amber-200 rounded-xl px-4 py-2.5 outline-none"
                    />
                    <button 
                      onClick={() => {
                        if (formData.memberName && formData.memberEnrollment && formData.members.length < 20) {
                          update('members', [...formData.members, { name: formData.memberName, enrollment: formData.memberEnrollment }]);
                          update('memberName', ""); update('memberEnrollment', "");
                        }
                      }}
                      className="bg-[#D97706] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-amber-600"
                    >Add</button>
                  </div>

                  {formData.members.length > 0 && (
                    <div className="border border-amber-100 rounded-xl overflow-hidden mb-2">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-amber-50 text-amber-800">
                          <tr>
                            <th className="px-4 py-2 border-b border-amber-100">#</th>
                            <th className="px-4 py-2 border-b border-amber-100">Name</th>
                            <th className="px-4 py-2 border-b border-amber-100">Enrollment No</th>
                            <th className="px-4 py-2 border-b border-amber-100 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.members.map((m, i) => (
                            <tr key={i} className="bg-white border-b border-amber-50 last:border-0">
                              <td className="px-4 py-2">{i + 1}</td>
                              <td className="px-4 py-2 font-medium">{m.name}</td>
                              <td className="px-4 py-2 text-gray-500">{m.enrollment}</td>
                              <td className="px-4 py-2 text-center">
                                <button onClick={() => update('members', formData.members.filter((_, idx) => idx !== i))} className="text-red-500"><X size={16} /></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <p className="text-[10px] text-gray-400">{formData.members.length} / 20 members added</p>
                  {errors.members && <p className="text-red-500 text-xs mt-1">{errors.members}</p>}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-sm font-semibold text-gray-700">Social media links</label>
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Optional</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="bg-amber-50 border border-r-0 border-amber-200 rounded-l-xl px-3 py-2.5 text-xs text-amber-700 font-bold flex items-center gap-1">
                        <FaInstagram size={14}/> instagram.com/
                      </div>
                      <input type="text" placeholder="@clubname" value={formData.instagram} onChange={(e) => update('instagram', e.target.value)} className="border border-amber-200 rounded-r-xl px-4 py-2.5 flex-1 outline-none" />
                    </div>
                    <div className="flex items-center">
                      <div className="bg-amber-50 border border-r-0 border-amber-200 rounded-l-xl px-3 py-2.5 text-xs text-amber-700 font-bold flex items-center gap-1">
                       <FaLinkedin size={14}/> linkedin.com/
                      </div>
                      <input type="text" placeholder="company/clubname" value={formData.linkedin} onChange={(e) => update('linkedin', e.target.value)} className="border border-amber-200 rounded-r-xl px-4 py-2.5 flex-1 outline-none" />
                    </div>
                    <div className="flex items-center">
                      <div className="bg-amber-50 border border-r-0 border-amber-200 rounded-l-xl px-3 py-2.5 text-xs text-amber-700 font-bold flex items-center gap-1">
                        <FaGithub size={14}/>github.com/
                      </div>
                      <input type="text" placeholder="clubname" value={formData.github} onChange={(e) => update('github', e.target.value)} className="border border-amber-200 rounded-r-xl px-4 py-2.5 flex-1 outline-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-semibold text-gray-700">Club images</label>
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Optional</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-3 italic">Upload up to 5 images · Max 3MB each</p>
                  
                  {formData.clubImages.length < 5 ? (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-amber-300 rounded-xl p-5 bg-amber-50 hover:bg-amber-100 transition cursor-pointer mb-4">
                      <input type="file" multiple className="hidden" accept="image/*" onChange={(e) => {
                        const files = Array.from(e.target.files).map(f => URL.createObjectURL(f));
                        update('clubImages', [...formData.clubImages, ...files].slice(0, 5));
                      }} />
                      <ImageIcon className="text-amber-400 mb-2" size={32} />
                      <p className="text-[#4A1D96] text-xs font-bold">Add Images</p>
                    </label>
                  ) : (
                    <div className="p-3 bg-amber-100 border border-amber-200 rounded-xl text-amber-800 text-xs font-bold text-center mb-4">
                      Maximum 5 images uploaded
                    </div>
                  )}

                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {formData.clubImages.map((img, i) => (
                      <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 group border border-amber-100">
                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                        <button onClick={() => update('clubImages', formData.clubImages.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <div className="space-y-4">
                {/* Section 1 */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 relative">
                  <button onClick={() => setCurrentStep(1)} className="absolute top-5 right-5 text-[#4A1D96] text-xs font-bold hover:underline">Edit</button>
                  <label className="text-[10px] font-bold text-[#D97706] uppercase tracking-widest block mb-4">Basic info</label>
                  <div className="flex items-center gap-4 mb-4">
                    <img src={formData.logo} alt="Logo" className="w-[60px] h-[60px] rounded-lg object-cover border border-amber-200" />
                    <div>
                      <h4 className="font-serif text-2xl font-bold text-[#4A1D96] leading-none mb-2">{formData.clubName}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${selectedCategory?.color}`}>
                        {formData.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic leading-relaxed">{formData.description}</p>
                </div>

                {/* Section 2 */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 relative">
                  <button onClick={() => setCurrentStep(2)} className="absolute top-5 right-5 text-[#4A1D96] text-xs font-bold hover:underline">Edit</button>
                  <label className="text-[10px] font-bold text-[#D97706] uppercase tracking-widest block mb-4">Club details</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-tighter">Goals</p>
                      <ul className="space-y-1.5">
                        {formData.goals.map((g, i) => (
                          <li key={i} className="flex gap-2 text-sm text-gray-700">
                            <span className="w-1.5 h-1.5 bg-[#D97706] rounded-full mt-1.5 shrink-0" /> {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-tighter">Capacity & Leadership</p>
                      <p className="text-sm mb-4">Members: <span className="font-bold text-[#D97706]">{formData.expectedMembers}</span></p>
                      {selectedFaculty && (
                        <div className="bg-white border border-amber-200 rounded-xl p-3 flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-200 text-[#4A1D96] rounded-full flex items-center justify-center text-xs font-bold">
                            {selectedFaculty.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#4A1D96]">{selectedFaculty.name}</p>
                            <p className="text-[10px] text-gray-500">{selectedFaculty.subject}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 relative">
                  <button onClick={() => setCurrentStep(3)} className="absolute top-5 right-5 text-[#4A1D96] text-xs font-bold hover:underline">Edit</button>
                  <label className="text-[10px] font-bold text-[#D97706] uppercase tracking-widest block mb-4">Members & media</label>
                  <div className="text-sm font-bold text-[#4A1D96] mb-4">{formData.members.length} Founding Members added</div>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    {['FaInstagram', 'FaLinkedin', 'FaGithub'].map(key => formData[key] ? (
                      <div key={key} className="flex items-center gap-1.5 bg-white border border-amber-200 px-3 py-1.5 rounded-lg text-xs text-gray-600">
                        {key === 'FaInstagram' ? <FaInstagram size={14}/> : key === 'FaLinkedin' ? <FaLinkedin size={14}/> : <FaGithub size={14}/>}
                        {formData[key]}
                      </div>
                    ) : null)}
                    {!formData.instagram && !formData.linkedin && !formData.github && <p className="text-xs text-gray-400 italic">No social links provided</p>}
                  </div>

                  {formData.clubImages.length > 0 ? (
                    <div className="flex gap-2">
                      {formData.clubImages.map((img, i) => <img key={i} src={img} className="w-12 h-12 rounded object-cover border border-amber-200" />)}
                    </div>
                  ) : <p className="text-xs text-gray-400 italic">No club images uploaded</p>}
                </div>

                {/* Declaration */}
                <label className={`flex items-start gap-4 p-5 border rounded-2xl transition-all cursor-pointer ${formData.declarationChecked ? 'border-[#4A1D96] bg-purple-50' : 'border-amber-200 bg-white'}`}>
                  <input 
                    type="checkbox" 
                    checked={formData.declarationChecked}
                    onChange={(e) => update('declarationChecked', e.target.checked)}
                    className="w-5 h-5 accent-[#4A1D96] mt-0.5"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#4A1D96]">I confirm that all information provided is accurate and complete.</p>
                    <p className="text-xs text-gray-600 leading-relaxed mt-1">I understand that submitting false information may result in rejection or cancellation of this application.</p>
                    {errors.declaration && <p className="text-red-500 text-xs font-bold mt-2">{errors.declaration}</p>}
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer Navigation */}
        <div className="bg-amber-50/50 p-6 border-t border-amber-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-[#4A1D96] text-sm font-bold flex items-center gap-2 transition-colors order-3 sm:order-1"
          >
            ← Back to Clubs
          </button>
          
          <div className="flex gap-3 w-full sm:w-auto order-1 sm:order-2">
            {currentStep > 1 && (
              <button 
                onClick={handleBack}
                className="flex-1 sm:px-6 py-2.5 bg-white border border-amber-200 text-[#4A1D96] font-bold rounded-xl hover:bg-amber-100 transition-colors"
              >
                ← Back
              </button>
            )}
            <button 
              onClick={handleNext}
              className={`flex-1 sm:px-8 py-2.5 bg-[#4A1D96] text-amber-50 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md
                ${currentStep === 4 && !formData.declarationChecked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#34146a]'}`}
            >
              {currentStep === 4 ? (
                <><CheckCircle2 size={18} /> Submit Application</>
              ) : (
                <>Next Step <ArrowRight size={18} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}