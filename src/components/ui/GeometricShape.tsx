import { motion } from "framer-motion";

const GeometricShape = ({
  delay = 0,
  duration = 15,
  size = 60,
  rotation = 0,
  x = 0,
  y = 0,
}) => (
  <motion.div
    className="absolute border-2 border-[#42D5AE]/30 backdrop-blur-sm"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      borderRadius: rotation % 2 === 0 ? "50%" : "20%",
    }}
    animate={{
      rotate: [rotation, rotation + 360],
      x: [0, 20, -20, 0],
      y: [0, -20, 20, 0],
      scale: [1, 1.1, 0.9, 1],
    }}
    transition={{
      duration,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "linear",
    }}
  />
);
export default GeometricShape;
