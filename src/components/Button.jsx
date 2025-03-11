import { motion } from 'framer-motion';

export const Button = ({ children, variant = 'primary', ...props }) => {
  const baseStyles = "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800",
    secondary: "border-2 border-primary-200 text-primary-700 hover:bg-primary-50 active:bg-primary-100",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};