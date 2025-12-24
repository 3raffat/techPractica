import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiLock } from "react-icons/ci";
import { IoCheckbox } from "react-icons/io5";
import {
  BsAward,
  BsBriefcase,
  BsCheck,
  BsChevronDown,
  BsChevronUp,
  BsClock,
  BsEye,
  BsX,
  BsTrash2,
} from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import { getInitials, getStatusRequestColor } from "../../data/data";
import { Root } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";

interface RequestCardProps {
  request: Root;
  SessionId: string;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
  sessionStatus?: string;
  onRemoveParticipant?: (
    participantId: string,
    participantName: string,
    requestId: string
  ) => void;
}

export default function RequestCard({
  request,
  onApprove,
  onReject,
  sessionStatus,
  onRemoveParticipant,
}: RequestCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useNavigate();
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <CiLock className="w-4 h-4" />;
      case "approved":
        return <IoCheckbox className="w-4 h-4" />;
      case "rejected":
        return <BsX className="w-4 h-4" />;
      default:
        return <BsClock className="w-4 h-4" />;
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAction = async (action: () => void) => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    action();
    setIsProcessing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#42D5AE] via-[#3fc9a0] to-[#38b28d] flex items-center justify-center text-white text-lg font-bold shadow-xl ring-4 ring-white/50 group-hover:ring-[#42D5AE]/30 transition-all duration-300 group-hover:scale-110">
              {getInitials(request?.fullName!)}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900">
                {request.fullName}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1 ${getStatusRequestColor(
                  request.state
                )}`}
              >
                {getStatusIcon(request.state)}
                {request.state.charAt(0).toUpperCase() + request.state.slice(1)}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-1">
                <BsBriefcase className="w-4 h-4" />
                <span className="font-medium">{request.field.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <BsClock className="w-4 h-4" />
                <span>{formatDate(request.requestDate)}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {isExpanded ? (
            <BsChevronUp className="w-5 h-5" />
          ) : (
            <BsChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Skills Preview */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {request.skills.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech.id}
              className="px-3 py-1 bg-[#42D5AE]/10 text-[#42D5AE] border border-[#42D5AE]/30 rounded-full text-sm font-medium"
            >
              {tech.name}
            </span>
          ))}

          {request.skills.technologies.length > 5 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
              +{request.skills.technologies.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 border-t border-gray-200 pt-6"
          >
            {/* Contact Information */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MdOutlineAlternateEmail className="w-4 h-4" />
                  <a
                    href={`mailto:${request.email}`}
                    className="hover:text-[#42D5AE] transition-colors"
                  >
                    {request.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Motivation */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Why they want to join
              </h4>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl wrap-break-word">
                {request.brief}
              </p>
            </div>

            {/* All Skills */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">All Skills</h4>

              <div className="flex flex-wrap gap-2">
                {request.skills.technologies.map((tech) => (
                  <span
                    key={tech.id}
                    className="px-3 py-1 bg-[#42D5AE]/10 text-[#42D5AE] border border-[#42D5AE]/30 rounded-full text-sm font-medium"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      {request.state === "PENDING" && (
        <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
          <div className="flex gap-3">
            <button
              onClick={() => {
                router(`/explore/profile/${request.userId}`);
              }}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <BsEye className="w-4 h-4" />
              View Profile
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleAction(() => onReject(request.requestId))}
              disabled={isProcessing}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors disabled:opacity-50"
            >
              <BsX className="w-4 h-4" />
              Reject
            </button>
            <button
              onClick={() => handleAction(() => onApprove(request.requestId))}
              disabled={isProcessing}
              className="flex items-center gap-2 px-6 py-2 bg-[#42D5AE] text-white hover:bg-[#38b28d] rounded-lg transition-colors disabled:opacity-50"
            >
              {isProcessing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <BsCheck className="w-4 h-4" />
              )}
              Approve
            </button>
          </div>
        </div>
      )}

      {request.state === "APPROVE" && (
        <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
          <div className="flex items-center gap-2 text-green-700">
            <BsCheck className="w-5 h-5" />
            <span className="font-medium">
              Request approved - User added to team
            </span>
          </div>
          {onRemoveParticipant && (
            <button
              onClick={() =>
                onRemoveParticipant(
                  request.userId,
                  request.fullName,
                  request.requestId
                )
              }
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors"
            >
              <BsTrash2 className="w-4 h-4" />
              Remove
            </button>
          )}
        </div>
      )}

      {request.state === "REJECTED" && (
        <div className="flex items-center justify-center pt-6 border-t border-gray-200 mt-6">
          <div className="flex items-center gap-2 text-red-700">
            <BsX className="w-5 h-5" />
            <span className="font-medium">Request rejected</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
