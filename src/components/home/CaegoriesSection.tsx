import {
  categories,
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {categories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div
                  className={`bg-gradient-to-br ${category.color} border ${category.borderColor} rounded-3xl p-8 hover:shadow-lg transition-all h-full`}
                >
                  <div
                    className={`inline-flex p-4 bg-white rounded-2xl mb-4 shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    <category.icon
                      className={`w-8 h-8 ${category.iconColor}`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600">{category.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};
export default CaegoriesSection;
