import { FiArrowRight } from "react-icons/fi";
import {
  container,
  fadeInUp,
  floatingShapes,
  geometricShapes,
} from "../../data/data";
import ParticleField from "../ui/ParticleField";
import GeometricShape from "../ui/GeometricShape";
import FloatingShape from "../ui/FloatingShape";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface IProps {}

const HeroSection = ({}: IProps) => {
  const navigate = useNavigate();
  return (
    <>
      <section className="relative bg-gradient-to-br from-[#f0fdf9] via-[#f8fafc] to-[#e0f2fe] min-h-screen flex items-center justify-center px-4 overflow-hidden ">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* More Dynamic Floating Gradient Orbs */}
          {floatingShapes.map(
            ({ color, delay, duration, opacity, size, x, y }) => (
              <FloatingShape
                key={`${size}-${y}-${x}`}
                delay={delay}
                duration={duration}
                size={size}
                color={color}
                opacity={opacity}
                x={x}
                y={y}
              />
            )
          )}
          {/* Enhanced Geometric Shapes */}
          {geometricShapes.map(({ delay, duration, size, x, y }) => (
            <GeometricShape
              key={`${size}-${y}-${x}`}
              delay={delay}
              duration={duration}
              size={size}
              x={x}
              y={y}
            />
          ))}
          {/* Enhanced Particle Field */}
          <ParticleField />
          {/* Enhanced Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2342D5AE' fillOpacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Enhanced Animated Wave */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-40 opacity-20"
            style={{
              background: `linear-gradient(180deg, transparent 0%, #42D5AE 50%, #022639 100%)`,
            }}
            animate={{
              scaleY: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="text-center max-w-5xl z-10 px-4"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <span className="inline-flex items-center px-6 py-3 text-sm font-semibold bg-gradient-to-r from-[#42D5AE]/20 to-[#022639]/20 text-[#022639] border border-[#42D5AE]/30 rounded-full backdrop-blur-sm shadow-lg">
              <span className="mr-2 text-lg">🚀</span>
              Start Your Tech Journey Today
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-tight tracking-tight"
          >
            Turn Knowledge{" "}
            <span className="bg-gradient-to-r from-[#42D5AE] via-[#38b28d] to-[#022639] bg-clip-text text-transparent animate-pulse">
              into Action
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            Master technical skills through hands-on projects, coding
            challenges, and real-world scenarios. Build your portfolio while you
            learn with industry experts.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(66, 213, 174, 0.3)",
              }}
              onClick={() => {
                navigate("/explore");
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white px-10 py-4 text-xl rounded-xl font-bold transition-all duration-300 flex items-center gap-3 shadow-xl"
            >
              Start Learning Free
              <FiArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
