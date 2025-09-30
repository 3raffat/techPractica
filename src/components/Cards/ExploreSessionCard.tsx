import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { ISession } from "../../interfaces";
import { categoriess } from "../../data/data";
interface IProps {
  project: ISession;
  onClick: () => void;
}
const ExploreSessionCard = ({ onClick, project }: IProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
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
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="h-full border-2 border-gray-100 hover:border-[#42D5AE]/30 transition-all duration-300 hover:shadow-xl bg-white overflow-hidden rounded-lg">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-[#42D5AE]/5 to-[#022639]/5 p-6 border-b border-gray-100">
          <div className="flex justify-between items-start gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-[#022639] mb-2 line-clamp-2 group-hover:text-[#42D5AE] transition-colors">
                {project.name}
              </h3>
              {/* Owner info with avatar */}
              <div className="flex items-center gap-2 ">
                <div className="h-6 w-6 rounded-full bg-[#42D5AE]/10 text-[#022639] flex items-center justify-center text-xs font-medium">
                  {getInitials(project.ownerFullName)}
                </div>
                <span className="text-sm text-gray-600">
                  @{project.ownerFullName}
                </span>
              </div>
            </div>

            {/* System badge with icon */}
            <div className="flex items-center gap-2 bg-[#42D5AE]/10 text-[#022639] border border-[#42D5AE]/30 hover:bg-[#42D5AE]/20 transition-colors shrink-0 px-3 py-1 rounded-full ">
              {/* <CategoryIcon className="w-3 h-3" /> */}
              {CategoryIcon && <CategoryIcon className="w-3 h-3" />}
              <span className="text-xs font-medium">{project.system.name}</span>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6">
          {/* Description */}
          <div className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed break-words">
            {project.description}
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.slice(0, 5).map((tech: any, index: any) => {
                return (
                  <span
                    key={index}
                    className="text-xs bg-white border border-[#42D5AE]/30 text-[#022639] hover:bg-[#42D5AE]/10 transition-colors px-2 py-1 rounded-full flex items-center gap-1"
                  >
                    {tech}
                  </span>
                );
              })}
              {allTechnologies.length > 4 && (
                <span className="text-xs bg-gray-50 border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors px-2 py-1 rounded-full">
                  +{allTechnologies.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-end">
            <button className="bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white shadow-md hover:shadow-lg transition-all duration-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 group">
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
