import { motion } from "framer-motion";
import { categoryIcons, mockProjects, techIcons } from "../../data/data";
import { FiArrowRight, FiClock, FiStar, FiUser } from "react-icons/fi";
import { FaCode } from "react-icons/fa";

const ProjectCard = ({
  project,
  onClick,
}: {
  project: (typeof mockProjects)[0];
  onClick: () => void;
}) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const CategoryIcon = categoryIcons[project.system] || FaCode;

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
                {project.sessionName}
              </h3>

              {/* Owner info with avatar */}
              <div className="flex items-center gap-2 mb-3">
                <div className="h-6 w-6 rounded-full bg-[#42D5AE]/10 text-[#022639] flex items-center justify-center text-xs font-medium">
                  {getInitials(project.ownerName)}
                </div>
                <span className="text-sm text-gray-600">
                  @{project.ownerName}
                </span>
              </div>
            </div>

            {/* System badge with icon */}
            <div className="flex items-center gap-2 bg-[#42D5AE]/10 text-[#022639] border border-[#42D5AE]/30 hover:bg-[#42D5AE]/20 transition-colors shrink-0 px-3 py-1 rounded-full">
              <CategoryIcon className="w-3 h-3" />
              <span className="text-xs font-medium">{project.system}</span>
            </div>
          </div>

          {/* Meta information */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <FiClock className="h-3 w-3" />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiUser className="h-3 w-3" />
              <span>{project.participants} enrolled</span>
            </div>
            <div className="flex items-center gap-1">
              <FiStar className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{project.rating}</span>
            </div>
          </div>

          {/* Difficulty badge */}
          <span
            className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(
              project.difficulty
            )}`}
          >
            {project.difficulty}
          </span>
        </div>

        {/* Content section */}
        <div className="p-6">
          {/* Description */}
          <div className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
            {project.sessionDescription}
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech, index) => {
                const TechIcon = techIcons[tech];
                return (
                  <span
                    key={index}
                    className="text-xs bg-white border border-[#42D5AE]/30 text-[#022639] hover:bg-[#42D5AE]/10 transition-colors px-2 py-1 rounded-full flex items-center gap-1"
                  >
                    {TechIcon && <TechIcon className="w-3 h-3" />}
                    {tech}
                  </span>
                );
              })}
              {project.technologies.length > 4 && (
                <span className="text-xs bg-gray-50 border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors px-2 py-1 rounded-full">
                  +{project.technologies.length - 4} more
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

export default ProjectCard;
