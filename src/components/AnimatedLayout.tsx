import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedLayoutProps {
  children: ReactNode;
}

const AnimatedLayout = ({ children }: AnimatedLayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.3
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedLayout; 