import { motion } from "framer-motion"

const CTAsection = () => {
  return (
    <section className="bg-linear-to-r max-w-7xl w-[95vw] rounded-xl  my-10 mx-auto from-purple-900 via-purple-700 to-yellow-500 py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto text-white"
        >
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-serif font-bold mb-6 leading-tight">
            Ready to Explore Your Future?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of students already using our platform to connect,
            learn, and grow together in a vibrant academic community.
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
              className="bg-white text-purple-900 px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all"
            >
              Start Exploring
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
            >
              Schedule Tour
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
  )
}

export default CTAsection