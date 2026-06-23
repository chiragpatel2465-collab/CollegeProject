import React from 'react'
import {motion} from 'framer-motion'
const Footer = () => {
  return (
    <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-brand-primary via-brand-purple to-brand-mid text-white py-12 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-serif text-2xl text-white font-bold mb-4">
                Shree Swaminarayan College
              </h3>
              <p className="text-white/60 max-w-sm">
                Empowering minds and building the future of technology with modern education and timeless values.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition">Admissions</a></li>
                <li><a href="#" className="hover:text-white transition">Courses</a></li>
                <li><a href="#" className="hover:text-white transition">Campus Life</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Connect</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition">Student Portal Login</a></li>
                <li><a href="#" className="hover:text-white transition">Faculty Login</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-700 pt-8 text-center text-purple-300 text-sm">
            <p>&copy; {new Date().getFullYear()} Shree Swaminarayan College of Technology. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
  )
}

export default Footer