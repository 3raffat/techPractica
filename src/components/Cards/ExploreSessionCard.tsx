import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { ISession } from "../../interfaces";
import { categoriess, getInitials } from "../../data/data";
interface IProps {
  project: ISession;
  onClick: () => void;
}
const ExploreSessionCard = ({ onClick, project }: IProps) => {
  const CategoryIcon = categoriess.find(
    (x) => x.title === project.system.name
  )?.Icon;

  const allTechnologies = project.requirements.flatMap(
    (req) => req.technologies
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="border-2 border-gray-200 hover:border-[#42D5AE]/40 transition-all duration-300 hover:shadow-2xl bg-white overflow-hidden rounded-3xl shadow-lg hover:shadow-[#42D5AE]/10">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-br from-[#42D5AE]/10 via-[#42D5AE]/5 to-[#022639]/5 p-6 border-b-2 border-gray-100">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#42D5AE]/5 rounded-full blur-3xl -mr-16 -mt-16" />

          <div className="relative flex justify-between items-start gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-[#022639] mb-3 line-clamp-2 leading-tight group-hover:text-[#42D5AE] transition-colors duration-300">
                {project.name}
              </h3>
              {/* Owner info with avatar */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#42D5AE]/20 to-[#38b28d]/20 text-[#38b28d] flex items-center justify-center text-xs font-bold shadow-sm border border-[#42D5AE]/30">
                  {getInitials(project.ownerFullName)}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  @{project.ownerFullName}
                </span>
              </div>

              {/* System badge with icon */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="flex items-center gap-2 bg-gradient-to-r from-[#42D5AE]/15 to-[#42D5AE]/10 text-[#022639] border border-[#42D5AE]/30 px-3 py-1.5 rounded-full shadow-sm">
                  {CategoryIcon && (
                    <CategoryIcon className="w-4 h-4 text-[#42D5AE]" />
                  )}
                  <span className="text-xs font-semibold">
                    {project.system.name}
                  </span>
                </div>
                <span
                  className={`text-xs px-3 py-1.5 rounded-full border-2 font-semibold shadow-sm transition-all ${
                    project.private
                      ? "bg-orange-50 text-orange-600 border-orange-200"
                      : "bg-green-50 text-green-600 border-green-200"
                  }`}
                >
                  {project.private ? "Private" : "Public"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 bg-gradient-to-b from-white to-gray-50/50">
          {/* Description */}
          <div className="text-gray-700 text-sm mb-6 line-clamp-3 leading-relaxed break-words">
            {project.description}
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-1 bg-[#42D5AE] rounded-full" />
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.slice(0, 5).map((tech: any, index: any) => {
                return (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-xs bg-white border-2 border-[#42D5AE]/30 text-[#022639] hover:bg-gradient-to-r hover:from-[#42D5AE]/15 hover:to-[#42D5AE]/10 hover:border-[#42D5AE]/50 transition-all duration-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium shadow-sm"
                  >
                    {tech}
                  </motion.span>
                );
              })}
              {allTechnologies.length > 4 && (
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-xs bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-400 transition-all duration-200 px-3 py-1.5 rounded-full font-semibold shadow-sm"
                >
                  +{allTechnologies.length - 4} more
                </motion.span>
              )}
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-end pt-2 border-t-2 border-gray-100">
            <button className="bg-gradient-to-r from-[#42D5AE] via-[#3fc9a0] to-[#38b28d] hover:from-[#38b28d] hover:via-[#3fc9a0] hover:to-[#42D5AE] text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 group hover:scale-[1.02] active:scale-[0.98]">
              <span>View Details</span>
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ExploreSessionCard;
