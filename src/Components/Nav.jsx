import { useState } from "react"
import {Link} from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useAuth } from "../Authentication/AuthContext";
import { PrimaryBtn } from "./UI/Button";

const Nav = () => {
  const {user , logout} = useAuth();
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  let navigateItems =()=>{
    if(!user){
      return ["Home","About" , "Courses", "Clubs","CampusLife","Admissions", "Contact"]
    }
    if(user.role === "student"){
      return ["Home","Dashboard","Attendance","Clubs","Assignments","TimeTable","Notices"]
    }
    if(user.role === "faculty"){
      return ["Home","FacultyDashboard","ViewStudents", "Assignments", "Notices", "TimeTable"]
    }
  }
  const navigationItems = (item) => {
     
        if (item === "Home") return "/";
    if (item === "About") return "/about";
    if (item === "Courses") return "/courses";
    if (item === "Clubs") return "/clubs";
    if (item === "Admissions") return "/Admissions";
    if (item === "Contact") return "/contact";
     
    // Student portal pages
    if (user?.role === "student") return `/student/${item}`;
    // Faculty portal pages
    if (user?.role === "faculty") {
      if (item === "FacultyDashboard") return "/faculty";
      return `/faculty/${item}`;
    }
    return `/${item}`;
  };

  return (
    <>
    <div className=" flex justify-center fixed top-0 left-0 w-screen px-4 z-50 bg-white/20 backdrop-blur-xl border-b border-[#E1F5EE] shadow-sm">
      <div className="flex items-center justify-between mx-auto px-3 py-3 rounded-full w-full max-w-auto relative z-10">
        <div className="flex items-center">
          <motion.div
            className="w-full h-full mr-6 flex items-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale:1.1 }}
            transition={{ duration: 0.3 }}
          >
          <img src="https://ssit.co.in/images/logo.png" alt="SSIT Logo" className="w-10 h-10 object-contain" />

         
            <div className="flex flex-col gap-none mx-3">
              <p className="text-sm font-bold text-brand-primary">Shree Swaminarayan</p>
              <p className="text-xs text-brand-primary/70">Institute of Technology</p>
            </div>
          </motion.div>
        </div>
        
          <nav className="hidden md:flex items-center font-serif space-x-8">
            {navigateItems().map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to={navigationItems(item)} className="text-sm text-brand-purple font-medium">
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

        {/* Desktop CTA Button */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
        
          {!user ? (
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-5 py-2 text-sm text-white bg-linear-to-r from-brand-primary via-brand-purple to-brand-mid rounded-full"
            >
              Login
            </Link>
          ) : (
            <Link
              onClick={logout}
              className="inline-flex items-center justify-center px-5 py-2 text-sm text-white bg-linear-to-r from-brand-primary via-brand-purple to-brand-mid rounded-full"
            >
              Logout
            </Link>
          )}
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button className="md:hidden flex items-center" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
          <Menu className="h-6 w-6 text-[#0F6E56]" />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-[#F8F8F6] z-50 pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-[#0F6E56]" />
            </motion.button>
            <div className="flex flex-col text-center  space-y-6">
              {navigateItems().map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Link to={navigationItems(item)} className="text-base text-[#2C2C2A] hover:text-[#0F6E56] font-medium" onClick={toggleMenu}>
                    {item}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-white bg-[#D85A30] rounded-full transition-colors hover:bg-[#c75129]"
                  onClick={toggleMenu}
                >
                  Let's Talk!
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  
    </>)
}


export default Nav