import { AnimatePresence, motion } from "framer-motion";
import { ISession } from "../../interfaces";
import { categoriess } from "../../data/data";
import { useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { useState } from "react";
import { FiEdit3, FiMoreVertical } from "react-icons/fi";
import { LuGitPullRequest } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";

interface IProps {
  session: ISession;
  onDelete: (id: string) => void;
  onClick: () => void;
}
export function WorkSpaceSessionCard({ onDelete, session, onClick }: IProps) {
  const [showMenu, setShowMenu] = useState(false);
  const Navigate = useNavigate();
  const getVisibilityColor = (visibility: boolean) => {
    return !visibility
      ? "bg-green-50 text-green-600 border-green-200"
      : "bg-orange-50 text-orange-600 border-orange-200";
  };
  const allTechnologies = session.requirements.flatMap(
    (req) => req.technologies
  );

  const CategoryIcon = categoriess.find(
    (x) => x.title === session.system.name
  )?.Icon;

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
                  {session.name}
                </h3>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-2 bg-[#42D5AE]/10 text-[#022639] border border-[#42D5AE]/30 px-2 py-1 rounded-full">
                  {CategoryIcon && <CategoryIcon className="w-3 h-3" />}
                  <span className="text-xs font-medium">
                    {session.system.name}
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${getVisibilityColor(
                    session.private
                  )}`}
                >
                  {session.private ? "Private" : "Public"}
                </span>
              </div>
            </div>

            {/* Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FiMoreVertical className="w-4 h-4 text-gray-500" />
              </button>

              <AnimatePresence>
                {showMenu && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-10"
                      onClick={() => setShowMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-2"
                    >
                      <button
                        onClick={onClick}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <BsEye className="w-4 h-4" />
                        View Project
                      </button>
                      <button
                        onClick={() => {
                          Navigate(`session/${session.id}/requests`);
                          setShowMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <LuGitPullRequest className="w-4 h-4" />
                        Requests
                      </button>
                      <button
                        onClick={() => {
                          Navigate(`session/${session.id}/edit`);
                          setShowMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <FiEdit3 className="w-4 h-4" />
                        Edit Project
                      </button>

                      <hr className="my-2" />
                      <button
                        onClick={() => {
                          onDelete(session.id);
                          setShowMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                      >
                        <RiDeleteBin5Line className="w-4 h-4" />
                        Delete
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed break-words">
            {session.description.slice(1, 150)}
          </p>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.slice(0, 5).map((tech, index) => {
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

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={onClick}
              className="flex-1 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <BsEye className="w-4 h-4" />
              View
            </button>
            <button
              onClick={() => Navigate(`session/${session.id}/edit`)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FiEdit3 className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
