import { motion } from 'framer-motion';

const GradientButton = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        bg-gradient-to-r from-primary-600 to-secondary-600
        text-white font-medium py-2 px-4 rounded-lg
        shadow-lg hover:shadow-xl
        flex items-center justify-center gap-2
        transition-all duration-200
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default GradientButton;