import { motion } from "framer-motion";
import { useState } from "react";
import { BsBriefcase, BsEye } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { IRequirement, ISessionResponseProfile } from "../../interfaces";
import { getFieldIcon } from "../../data/data";
import { LuUser } from "react-icons/lu";
interface IProps {
  session: ISessionResponseProfile;
  index: number;
  userFullName: string;
}
const ProfileSessionCard = ({ session, index, userFullName }: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="bg-white rounded-3xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-2xl hover:border-[#42D5AE]/40 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-xl font-bold text-[#022639] group-hover:text-[#42D5AE] transition-colors">
              {session.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
            <BsBriefcase className="w-4 h-4 text-[#42D5AE]" />
            <span>{session.system.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-green-50 text-green-600 border-2 border-green-200 rounded-full text-xs font-semibold shadow-sm">
            <LuUser className="w-4 h-4 inline mr-1" />
            {userFullName === session.ownerFullName ? "Owner" : "Participate"}
          </div>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed break-words">
        {session.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {session.requirements.map((req: any) => {
          const Icon = getFieldIcon(req.field);
          return (
            <motion.div
              key={req.requirementId}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#42D5AE]/10 to-[#42D5AE]/5 border-2 border-[#42D5AE]/30 rounded-xl text-xs font-semibold shadow-sm"
            >
              <Icon className="w-3.5 h-3.5 text-[#42D5AE]" />
              <span className="text-[#022639]">{req.field}</span>
              <span className="text-gray-600">({req.technologies.length})</span>
            </motion.div>
          );
        })}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-[#42D5AE] hover:text-[#38b28d] transition-all duration-200 text-sm font-bold mb-4 hover:scale-105"
      >
        {isExpanded ? (
          <>
            <FaChevronUp className="w-4 h-4" />
            Hide Technologies
          </>
        ) : (
          <>
            <FaChevronDown className="w-4 h-4" />
            View Technologies
          </>
        )}
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 space-y-3"
        >
          {session.requirements.map((req: IRequirement) => {
            const Icon = getFieldIcon(req.field);
            return (
              <div
                key={req.requirementId}
                className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-[#42D5AE]/10 rounded-lg">
                    <Icon className="w-4 h-4 text-[#42D5AE]" />
                  </div>
                  <h4 className="font-bold text-[#022639] text-sm">
                    {req.field}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {req.technologies.map((tech: string, idx: number) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-xl text-xs text-[#022639] font-medium shadow-sm hover:border-[#42D5AE]/50 hover:bg-[#42D5AE]/5 transition-all duration-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      <div className="mt-4 pt-4 border-t-2 border-gray-100 flex items-center justify-between text-xs text-gray-600 font-medium">
        <div className="flex items-center gap-1.5">
          <LuUser className="w-3.5 h-3.5 text-[#42D5AE]" />
          <span>Owner: {session.ownerFullName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <BsEye className="w-3.5 h-3.5 text-[#42D5AE]" />
          <span>{session.private ? "Private" : "Public"}</span>
        </div>
      </div>
    </motion.div>
  );
};
export default ProfileSessionCard;
