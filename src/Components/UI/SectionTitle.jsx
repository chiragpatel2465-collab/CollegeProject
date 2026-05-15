import React from 'react'
import { motion, 

} from 'framer-motion'

const SectionTitle =({mainText,subText}) => {
    
  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center my-5"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-purple-900 mb-4">
           {mainText}
          </h2>
          <p className="text-lg text-purple-700 max-w-2xl mx-auto">
            {subText}
          </p>
          <div className="w-20 h-1 bg-linear-to-r from-purple-900 to-yellow-600 mx-auto mt-6 rounded-full" />
        </motion.div>
  )
}

export default SectionTitle