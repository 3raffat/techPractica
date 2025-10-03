import {
  featuress,
  floatingShapesFeatures,
  geometricShapesFeatures,
  staggerContainer,
} from "../../data/data";
import { motion } from "framer-motion";
import FloatingShape from "../ui/FloatingShape";
import GeometricShape from "../ui/GeometricShape";
interface IProps {}
const FeaturesSection = ({}: IProps) => {
  return (
    <>
      {/* ENHANCED FEATURES SECTION */}
      <section className="py-24 bg-gradient-to-b from-gray-100 to-gray-50 relative overflow-hidden ">
        {/* Enhanced Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {floatingShapesFeatures.map(
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
          {geometricShapesFeatures.map(({ delay, duration, size, x, y }) => (
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
              Why Choose{" "}
              <span className="bg-gradient-to-r from-[#42D5AE] to-[#022639] bg-clip-text text-transparent">
                Us?
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Experience learning that adapts to your pace and accelerates your
              career goals
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {featuress.map(
              ({ icon: Icon, title, description, color, bgColor }, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerContainer}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="h-full hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl border border-gray-100 hover:border-[#42D5AE]/30 overflow-hidden group">
                    <div className="p-10 relative">
                      <div
                        className={`${bgColor} p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <Icon
                          className={`h-8 w-8 ${color} transition-all duration-300 group-hover:scale-110`}
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#42D5AE] transition-colors duration-300">
                        {title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg font-medium">
                        {description}
                      </p>

                      {/* Decorative element */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#42D5AE]/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
export default FeaturesSection;
