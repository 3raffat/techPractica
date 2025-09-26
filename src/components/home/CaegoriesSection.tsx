import {
  categoriess,
  floatingShapesBackground,
  geometricShapesBackground,
  staggerContainer,
} from "../../data/data";
import FloatingShape from "../ui/FloatingShape";
import GeometricShape from "../ui/GeometricShape";
import { motion } from "framer-motion";

interface IProps {}
const CaegoriesSection = ({}: IProps) => {
  return (
    <>
      <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden ">
        {/* Enhanced Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {floatingShapesBackground.map(
            ({ color, delay, duration, opacity, size, x, y }) => (
              <FloatingShape
                key={color + delay + duration + size + x + y}
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
          {geometricShapesBackground.map(({ delay, duration, size, x, y }) => (
            <GeometricShape
              key={delay + duration + size + x + y}
              delay={delay}
              duration={duration}
              size={size}
              x={x}
              y={y}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Explore{" "}
              <span className="bg-gradient-to-r from-[#42D5AE] to-[#022639] bg-clip-text text-transparent">
                Categories
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Discover different technology domains and find your passion in the
              world of development
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8"
          >
            {categoriess.map(
              ({ icon: Icon, title, color, bgColor, hoverBg }, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerContainer}
                  whileHover={{ y: -10, scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`group cursor-pointer border-2 border-gray-100 hover:border-[#42D5AE]/50 transition-all duration-500 hover:shadow-2xl bg-white rounded-2xl overflow-hidden transform perspective-1000`}
                  >
                    <div className="flex flex-col items-center p-8 text-center relative">
                      <div
                        className={`p-6 rounded-2xl ${bgColor} ${hoverBg} transition-all duration-300 mb-6 transform group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <Icon
                          className={`h-10 w-10 ${color} transition-all duration-300 group-hover:scale-110`}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#42D5AE] transition-colors duration-300">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">
                        Learn {title.toLowerCase()} development
                      </p>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#42D5AE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};
export default CaegoriesSection;
