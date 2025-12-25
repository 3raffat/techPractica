import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthQuery } from "../../imports";
import type {
  ApiError,
  RequestFormData,
  SessionResponse,
} from "../../interfaces";
import { getInitials } from "../../data/data";
import { GoArrowLeft } from "react-icons/go";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BsX } from "react-icons/bs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axios.config";
import { getToken } from "../../helpers/helpers";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ProjectDetailPage() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  /* ------------------ Fetch Data ------------------ */
  const { id } = useParams();
  const token = getToken();
  const location = useLocation();
  const page = location.pathname.split("/")[1] ?? "";
  const UserSession = useAuthQuery<SessionResponse>({
    queryKey: [`UserSession`],
    url: `/sessions/by-id/${id}`,
  });
  const session = UserSession ?? [];
  const SessionData = session?.data?.data;
  console.log("SessionData", SessionData);
  const fieldName = SessionData?.requirements.map((x) => x.field) ?? [];
  const TechNames =
    SessionData?.requirements.flatMap((x) => x.technologies) ?? [];
  const router = useNavigate();
  /* ------------------ Session Request ------------------ */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RequestFormData>();
  const onSubmit = async (data: RequestFormData) => {
    const reqId = SessionData?.requirements.find(
      (x) => x.field === data.requirementName
    )?.requirementId;

    if (!reqId) {
      toast.error("Requirement not found.", {
        position: "top-right",
        duration: 2000,
      });
      return;
    }

    try {
      setIsSubmitting(true);

      await axiosInstance.post(
        `/sessions/requirements/${reqId}/requests`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Request sent successfully!", {
        position: "top-right",
        duration: 2000,
      });

      reset();
      setShowRequestModal(false);
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      toast.error(error.response?.data.message || "Something went wrong.", {
        position: "top-right",
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Full Width */}
      <div className="relative bg-gradient-to-br from-[#42D5AE]/10 via-[#42D5AE]/5 to-[#022639]/5 border-b-2 border-gray-100">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#42D5AE]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#42D5AE]/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#42D5AE]/5 rounded-full blur-3xl"></div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-6 sm:px-8 sm:py-8 lg:px-12">
          {/* Back Button */}
          <button
            onClick={() => {
              page == "explore" ? router("/explore") : router("/workspace");
            }}
            className="group flex items-center gap-2 text-gray-700 hover:text-[#42D5AE] transition-all duration-200 mb-4 font-semibold px-4 py-2 rounded-xl hover:bg-white/60 backdrop-blur-sm"
          >
            <GoArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back</span>
          </button>

          {/* System Badge */}
          <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#42D5AE]/15 to-[#42D5AE]/10 border border-[#42D5AE]/30 px-4 py-2.5 rounded-full mb-4 shadow-lg">
            <div className="w-2 h-2 bg-[#42D5AE] rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-[#022639]">
              {SessionData?.system.name}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#022639] mb-4 leading-tight text-balance max-w-4xl">
            {SessionData?.name}
          </h1>

          {/* Owner Info & CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => {
                router(`/explore/profile/${343}`);
              }}
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#42D5AE] via-[#3fc9a0] to-[#38b28d] flex items-center justify-center text-white text-base font-bold shadow-xl ring-4 ring-white/50 group-hover:ring-[#42D5AE]/30 transition-all duration-300 group-hover:scale-110">
                {getInitials(SessionData?.ownerFullName!)}
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium mb-0.5">
                  Created by
                </p>
                <p className="text-lg font-bold text-[#022639] group-hover:text-[#42D5AE] transition-colors">
                  {SessionData?.ownerFullName!}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            {page !== "workspace" && (
              <button
                onClick={() => setShowRequestModal(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-[#42D5AE] via-[#3fc9a0] to-[#38b28d] hover:from-[#38b28d] hover:via-[#3fc9a0] hover:to-[#42D5AE] text-white rounded-xl font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 whitespace-nowrap"
              >
                Request Session
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content - Full Width Sections */}
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8 sm:py-16 lg:px-12 space-y-16">
        {/* Fields & Technologies Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Fields */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1.5 w-12 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] rounded-full"></div>
              <h2 className="text-3xl font-bold text-[#022639]">Fields</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {fieldName?.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-[#022639] border-2 border-gray-200 hover:border-[#42D5AE] hover:bg-gradient-to-r hover:from-[#42D5AE]/10 hover:to-[#42D5AE]/5 hover:text-[#42D5AE] transition-all duration-200 cursor-default shadow-sm hover:shadow-md"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1.5 w-12 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] rounded-full"></div>
              <h2 className="text-3xl font-bold text-[#022639]">
                Technologies
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {TechNames?.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-[#022639] border-2 border-gray-200 hover:border-[#42D5AE] hover:bg-gradient-to-r hover:from-[#42D5AE]/10 hover:to-[#42D5AE]/5 hover:text-[#42D5AE] transition-all duration-200 cursor-default shadow-sm hover:shadow-md"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#42D5AE]/15 to-[#42D5AE]/10 border border-[#42D5AE]/30 flex items-center justify-center shadow-lg">
              <PiBookOpenTextLight className="w-7 h-7 text-[#42D5AE]" />
            </div>
            <h2 className="text-3xl font-bold text-[#022639]">Description</h2>
          </div>
          <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-8 sm:p-10 border-2 border-gray-200 shadow-lg">
            <p className="text-gray-700 leading-relaxed text-lg break-words">
              {SessionData?.description}
            </p>
          </div>
        </div>
      </div>
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border-2 border-gray-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#42D5AE] via-[#3fc9a0] to-[#38b28d] p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Request Session</h2>
              <button
                onClick={() => setShowRequestModal(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 text-white hover:scale-110 active:scale-95"
              >
                <BsX className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-6 bg-gradient-to-b from-white to-gray-50/50"
            >
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3 tracking-wide">
                  Select Technology Session{" "}
                  <span className="text-[#42D5AE]">*</span>
                </label>
                <select
                  {...register("requirementName", {
                    required: "Please select a field session",
                  })}
                  className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE]/30 focus:border-[#42D5AE] outline-none transition-all duration-200 hover:border-gray-300 shadow-sm"
                >
                  <option value="">Choose a field...</option>
                  {fieldName.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
                {errors.requirementName && (
                  <p className="text-red-500 text-sm mt-2 font-medium">
                    {errors.requirementName.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3 tracking-wide">
                  Tell us about yourself{" "}
                  <span className="text-[#42D5AE]">*</span>
                </label>
                <textarea
                  {...register("brief", {
                    required: "Please tell us about yourself",
                    minLength: {
                      value: 20,
                      message: "Please provide at least 20 characters",
                    },
                  })}
                  rows={8}
                  className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE]/30 focus:border-[#42D5AE] outline-none transition-all duration-200 resize-none hover:border-gray-300 shadow-sm leading-relaxed"
                  placeholder="Tell us about your background, experience, goals, and why you're interested in this session..."
                />
                {errors.brief && (
                  <p className="text-red-500 text-sm mt-2 font-medium">
                    {errors.brief.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-2 border-t-2 border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 px-6 py-3.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-[#42D5AE] via-[#3fc9a0] to-[#38b28d] hover:from-[#38b28d] hover:via-[#3fc9a0] hover:to-[#42D5AE] text-white rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
