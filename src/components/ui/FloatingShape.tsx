import { motion } from "framer-motion";

const FloatingShape = ({
  delay = 0,
  duration = 20,
  size = 100,
  color = "#42D5AE",
  opacity = 0.1,
  x = 0,
  y = 0,
}) => (
  <motion.div
    className="absolute rounded-full blur-xl"
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color}${Math.floor(opacity * 255)
        .toString(16)
        .padStart(2, "0")} 0%, transparent 70%)`,
      left: `${x}%`,
      top: `${y}%`,
    }}
    animate={{
      x: [0, 30, -30, 0],
      y: [0, -30, 30, 0],
      scale: [1, 1.2, 0.8, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeInOut",
    }}
  />
);
export default FloatingShape;
