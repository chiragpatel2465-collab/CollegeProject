import { motion } from 'framer-motion';

const Button = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex flex-wrap justify-center gap-4 md:justify-start"
    >
      <PrimaryBtn />
      <SecondaryBtn />
    </motion.div>
  );
};

export const PrimaryBtn = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary via-brand-purple to-brand-mid px-8 py-3.5 font-semibold tracking-wide text-white shadow-lg shadow-brand-purple/25 transition-all duration-300 hover:opacity-90"
    >
      Get Started
    </motion.button>
  );
};

export const SecondaryBtn = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
     className="p-[2px] rounded-lg bg-gradient-to-r from-brand-primary via-brand-mid to-brand-primary transition-all duration-300 hover:opacity-90 ">
  <span class="block px-8 py-3 bg-brand-surface text-brand-primary rounded-lg font-semibold hover:bg-transparent hover:text-white transition-colors duration-300">
    Learn More
  </span>
</motion.button>
  );
};

export default Button;