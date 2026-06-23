import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const CTAsection = ({Header,Desc,Primarybtn,PrimaryLink,Secondarybtn,SecondaryLink}) => {
  return (
    <section className="bg-white border border-brand-mid/20 max-w-7xl w-[95vw] rounded-3xl my-10 mx-auto px-4 lg:px-8 shadow-xl shadow-brand-purple/10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto text-brand-primary py-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-sans font-semibold tracking-tight mb-6 leading-tight">
           {Header}
          </h2>
          <p className="text-lg font-medium text-brand-primary/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            {Desc}
          </p>

          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-brand-primary via-brand-purple to-brand-mid text-white px-5 lg:px-10 py-4 rounded-xl font-semibold tracking-wide shadow-lg shadow-brand-purple/20 hover:opacity-90 transition-all"
            >
             <Link to={PrimaryLink}>{Primarybtn}</Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-brand-purple text-brand-purple bg-white px-8 py-4 rounded-xl font-semibold tracking-wide hover:bg-brand-light transition-colors"
            >
              <Link to={SecondaryLink}>{Secondarybtn}</Link>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
  )
}

export default CTAsection