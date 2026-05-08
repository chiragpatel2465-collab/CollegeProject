import {motion} from 'framer-motion';

const Button = ({title, color}) => {
  return (
     <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex gap-4 flex-wrap  justify-center md:justify-start"
              >
                <PrimaryBtn/>
                <SecondaryBtn/>
               
              </motion.div>
  )
}

export const PrimaryBtn = ()=>{
    return (
        <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-linear-to-r from-[#4A1D96] to-[#D97706] text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-purple-900/20 hover:shadow-xl transition-shadow"
                >
                  Get Started
                </motion.button>
    )
}

export const SecondaryBtn = ()=>{
    return (
        <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#4A1D96] text-[#4A1D96] px-8 py-3.5 rounded-xl font-bold hover:bg-purple-50 transition-colors bg-white/50 backdrop-blur-sm"
                >
                  Learn More
                </motion.button>
    )
}   
export default Button