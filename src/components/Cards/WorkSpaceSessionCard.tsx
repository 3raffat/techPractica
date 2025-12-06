import { AnimatePresence, motion } from "framer-motion";
import { ISession } from "../../interfaces";
import {
  categoriess,
  getRoleColor,
  getStatusColor,
  getVisibilityColor,
} from "../../data/data";
import { useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { useState } from "react";
import { FiEdit3, FiMoreVertical } from "react-icons/fi";
import { LuGitPullRequest } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";

interface IProps {
  session: ISession;
  onDelete: (id: string) => void;
  onClick: () => void;
  onEdit: (id: string) => void;
}
export function WorkSpaceSessionCard({
  onDelete,
  session,
  onClick,
  onEdit,
}: IProps) {
  const [showMenu, setShowMenu] = useState(false);
  const Navigate = useNavigate();

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
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative"
    >
      <div className="border-2 border-gray-200 hover:border-[#42D5AE]/40 transition-all duration-300 hover:shadow-2xl bg-white overflow-hidden rounded-3xl shadow-lg hover:shadow-[#42D5AE]/10">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#42D5AE]/10 via-[#42D5AE]/5 to-[#022639]/5 p-6 border-b-2 border-gray-100">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#42D5AE]/5 rounded-full blur-3xl -mr-16 -mt-16" />

          <div className="relative flex justify-between items-start gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-[#022639] group-hover:text-[#42D5AE] transition-colors duration-300 line-clamp-2 leading-tight">
                  {session.name}
                </h3>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="flex items-center gap-2 bg-gradient-to-r from-[#42D5AE]/15 to-[#42D5AE]/10 text-[#022639] border border-[#42D5AE]/30 px-3 py-1.5 rounded-full shadow-sm">
                  {CategoryIcon && (
                    <CategoryIcon className="w-4 h-4 text-[#42D5AE]" />
                  )}
                  <span className="text-xs font-semibold">
                    {session.system.name}
                  </span>
                </div>
                <span
                  className={`text-xs px-3 py-1.5 rounded-full border-2 font-semibold shadow-sm transition-all ${getVisibilityColor(
                    session.private
                  )}`}
                >
                  {session.private ? "Private" : "Public"}
                </span>
                <span
                  className={`text-xs px-3 py-1.5 rounded-full border-2 font-semibold shadow-sm transition-all ${getRoleColor(
                    session.role
                  )}`}
                >
                  {session.role?.charAt(0).toUpperCase() +
                    session.role?.slice(1).toLowerCase()}
                </span>
                <span
                  className={`text-xs px-3 py-1.5 rounded-full border-2 font-semibold shadow-sm transition-all ${getStatusColor(
                    session.status
                  )}`}
                >
                  {session.status?.charAt(0).toUpperCase() +
                    session.status?.slice(1).toLowerCase()}
                </span>
              </div>
            </div>

            {/* Menu */}
            <div className="relative z-20">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2.5 rounded-xl hover:bg-white/60 active:bg-white/80 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
              >
                <FiMoreVertical className="w-5 h-5 text-gray-600" />
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
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl z-20 py-2 overflow-hidden"
                    >
                      {session.status === "RUNNING" && (
                        <button
                          onClick={onClick}
                          className="w-full px-5 py-3 text-left text-sm hover:bg-gradient-to-r hover:from-[#42D5AE]/10 hover:to-transparent flex items-center gap-3 transition-all duration-200 group"
                        >
                          <MdOutlineSpaceDashboard className="w-4 h-4 text-gray-600 group-hover:text-[#42D5AE] transition-colors" />
                          <span className="font-medium text-gray-700 group-hover:text-[#022639]">
                            Task manager
                          </span>
                        </button>
                      )}
                      {session.role != "PARTICIPATE" && (
                        <>
                          {" "}
                          <button
                            onClick={() => {
                              Navigate(`session/${session.id}/requests`);
                              setShowMenu(false);
                            }}
                            className="w-full px-5 py-3 text-left text-sm hover:bg-gradient-to-r hover:from-[#42D5AE]/10 hover:to-transparent flex items-center gap-3 transition-all duration-200 group"
                          >
                            <LuGitPullRequest className="w-4 h-4 text-gray-600 group-hover:text-[#42D5AE] transition-colors" />
                            <span className="font-medium text-gray-700 group-hover:text-[#022639]">
                              Requests
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              onEdit(session.id);
                              setShowMenu(false);
                            }}
                            className="w-full px-5 py-3 text-left text-sm hover:bg-gradient-to-r hover:from-[#42D5AE]/10 hover:to-transparent flex items-center gap-3 transition-all duration-200 group"
                          >
                            <FiEdit3 className="w-4 h-4 text-gray-600 group-hover:text-[#42D5AE] transition-colors" />
                            <span className="font-medium text-gray-700 group-hover:text-[#022639]">
                              Edit Project
                            </span>
                          </button>
                          <div className="my-2 border-t border-gray-200" />
                          <button
                            onClick={() => {
                              onDelete(session.id);
                              setShowMenu(false);
                            }}
                            className="w-full px-5 py-3 text-left text-sm hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent text-red-600 flex items-center gap-3 transition-all duration-200 group"
                          >
                            <RiDeleteBin5Line className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span className="font-semibold group-hover:text-red-700">
                              Delete
                            </span>
                          </button>
                        </>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-gradient-to-b from-white to-gray-50/50">
          <p className="text-gray-700 text-sm mb-6 line-clamp-3 leading-relaxed break-words">
            {session.description.slice(1, 150)}
          </p>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-1 bg-[#42D5AE] rounded-full" />
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.slice(0, 5).map((tech, index) => {
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

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t-2 border-gray-100">
            <button
              onClick={() => {
                Navigate(`/workspace/session/${session.id}`, {
                  state: { session: session },
                });
              }}
              className="flex-1 bg-gradient-to-r from-[#42D5AE] via-[#3fc9a0] to-[#38b28d] hover:from-[#38b28d] hover:via-[#3fc9a0] hover:to-[#42D5AE] text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <BsEye className="w-4 h-4" />
              View
            </button>
            {session.role != "PARTICIPATE" && (
              <>
                {" "}
                <button
                  onClick={() => onEdit(session.id)}
                  className="bg-white border-2 border-gray-300 hover:border-[#42D5AE]/50 hover:bg-[#42D5AE]/5 text-gray-700 hover:text-[#022639] py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FiEdit3 className="w-4 h-4" />
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
