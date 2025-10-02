import { motion } from "framer-motion";
import { useState } from "react";
import { BsBriefcase, BsEye } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { IRequirement, ISession } from "../../interfaces";
import { getFieldIcon } from "../../data/data";
import { LuUser } from "react-icons/lu";
interface IProps {
  session: ISession;
  index: number;
}
const ProfileSessionCard = ({ session, index }: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-sm border  border-gray-200 p-6 hover:shadow-md transition-shadow "
    >
      <div className="flex items-start justify-between mb-4 ">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{session.name}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BsBriefcase className="w-4 h-4" />
            <span>{session.system.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {session.private ? (
            <IoLockClosedOutline className="w-5 h-5 text-gray-400" />
          ) : (
            <CiGlobe className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {session.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {session.requirements.map((req: any) => {
          const Icon = getFieldIcon(req.field);
          return (
            <div
              key={req.requirementId}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg border border-gray-200 text-xs"
            >
              <Icon className="w-3 h-3 text-[#42D5AE]" />
              <span className="font-medium text-gray-700">{req.field}</span>
              <span className="text-gray-500">({req.technologies.length})</span>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-[#42D5AE] hover:text-[#38b28d] transition-colors text-sm font-medium"
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
                className="p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-[#42D5AE]" />
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {req.field}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {req.technologies.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <LuUser className="w-3 h-3" />
          <span>Owner: {session.ownerFullName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <BsEye className="w-3 h-3" />
          <span>{session.private ? "Private" : "Public"}</span>
        </div>
      </div>
    </motion.div>
  );
};
export default ProfileSessionCard;
