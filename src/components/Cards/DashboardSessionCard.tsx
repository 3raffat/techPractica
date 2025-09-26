import { AnimatePresence, motion } from "framer-motion";

import { categoryIcons, techIcons } from "../../data/data";
import { FaCode } from "react-icons/fa";
import { Edit3, Eye, Trash2 } from "lucide-react";
import { SessionsResponse } from "../../interfaces";

export function ProjectCard({
  project,
  onEdit,
  onDelete,
  onView,
}: {
  project: SessionsResponse;
  onEdit: (project: any) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}) {
  const getVisibilityColor = (visibility: string) => {
    return visibility === "public"
      ? "bg-green-50 text-green-600 border-green-200"
      : "bg-orange-50 text-orange-600 border-orange-200";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative"
    >
      <div className="h-full border-2 border-gray-100 hover:border-[#42D5AE]/30 transition-all duration-300 hover:shadow-xl bg-white overflow-hidden rounded-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#42D5AE]/5 to-[#022639]/5 p-6 border-b border-gray-100">
          <div className="flex justify-between items-start gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-[#022639] group-hover:text-[#42D5AE] transition-colors line-clamp-1">
                  {project.name}
                </h3>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-2 bg-[#42D5AE]/10 text-[#022639] border border-[#42D5AE]/30 px-2 py-1 rounded-full">
                  <CategoryIcon className="w-3 h-3" />
                  <span className="text-xs font-medium">
                    {project.category}
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${getVisibilityColor(
                    project.visibility
                  )}`}
                >
                  {project.visibility}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((_) => {
                const TechIcon = techIcons[_];
                return (
                  <span
                    key={_}
                    className="text-xs bg-white border border-[#42D5AE]/30 text-[#022639] hover:bg-[#42D5AE]/10 transition-colors px-2 py-1 rounded-full flex items-center gap-1"
                  >
                    {TechIcon && <TechIcon className="w-3 h-3" />}
                    {_}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => onView(project.id)}
              className="flex-1 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
            <button
              onClick={() => onEdit(project)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => {
                onDelete(project.id);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
