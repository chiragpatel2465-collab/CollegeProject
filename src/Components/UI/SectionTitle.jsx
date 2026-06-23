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
          className="text-center my-10"
        >
          <h2 className="text-4xl md:text-5xl font-sans font-semibold text-brand-primary mb-2 tracking-tight">
           {mainText}
          </h2>
          <p className="text-lg text-brand-primary/70 max-w-2xl mx-auto leading-relaxed">
            {subText}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-primary via-brand-purple to-brand-mid mx-auto mt-2 rounded-full" />
        </motion.div>
  )
}

export default SectionTitle