import React from "react";
import { motion } from "framer-motion";

interface ProgrammingShapeProps {
  x: number;
  y: number;
  size?: number;
  delay?: number;
  duration?: number;
  color?: string;
  opacity?: number;
  rotation?: number;
  text?: string;
}

const ProgrammingShape: React.FC<ProgrammingShapeProps> = ({
  x,
  y,
  size = 40,
  delay = 0,
  duration = 16,
  color = "#42D5AE",
  opacity = 0.75,
  rotation = 0,
  text = "</>",
}) => {
  return (
    <motion.div
      initial={{ y: y + 10, opacity: 0 }}
      animate={{
        y: y,
        opacity: opacity,
        rotate: rotation,
      }}
      transition={{
        delay: delay,
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        fontSize: `${size}px`,
        color: color,
        opacity: opacity,
        fontWeight: "bold",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {text}
    </motion.div>
  );
};

export default ProgrammingShape;
