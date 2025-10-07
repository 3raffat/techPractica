
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAuthQuery } from "../../imports"
import type { SessionResponse } from "../../interfaces"
import { getInitials } from "../../data/data"
import { GoArrowLeft } from "react-icons/go"
import { PiBookOpenTextLight } from "react-icons/pi"
import { getToken } from "../../helpers/helpers"

export default function ProjectDetailPage() {
  /* ------------------ Fetch Data ------------------ */
  const token = getToken()
  const { id } = useParams()
  const location = useLocation()
  const page = location.pathname.split("/")[1] ?? ""
  const UserSession = useAuthQuery<SessionResponse>({
    queryKey: [`UserSession`],
    url: `/sessions/by-id/${id}`,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
  const session = UserSession ?? []
  const SessionData = session?.data?.data
  const fieldName = SessionData?.requirements.map((x) => x.field)
  const TechNames = SessionData?.requirements.flatMap((x) => x.technologies)
  const router = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Width */}
      <div className="relative bg-gradient-to-br from-[#42D5AE]/5 via-[#42D5AE]/10 to-[#42D5AE]/5 border-b border-gray-100">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#42D5AE]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#42D5AE]/5 rounded-full blur-2xl"></div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 sm:px-8 sm:py-12 lg:px-12">
          {/* Back Button */}
          <button
            onClick={() => {
              page == "explore" ? router("/explore") : router("/workspace")
            }}
            className="group flex items-center gap-2 text-gray-600 hover:text-[#42D5AE] transition-all duration-200 mb-8 font-medium"
          >
            <GoArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back</span>
          </button>

          {/* System Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#42D5AE]/20 px-4 py-2 rounded-full mb-6 shadow-sm">
            <div className="w-2 h-2 bg-[#42D5AE] rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-[#42D5AE]">{SessionData?.system.name}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight text-balance max-w-4xl">
            {SessionData?.name}
          </h1>

          {/* Owner Info */}
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#42D5AE] to-[#38b28d] flex items-center justify-center text-white text-base font-bold shadow-md ring-4 ring-white">
              {getInitials(SessionData?.ownerFullName!)}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Created by</p>
              <p className="text-xl font-semibold text-gray-900">{SessionData?.ownerFullName!}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width Sections */}
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8 sm:py-16 lg:px-12 space-y-16">
        {/* Fields & Technologies Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Fields */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-1 w-10 bg-[#42D5AE] rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">Fields</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {fieldName?.map((tech) => (
                <span
                  key={tech}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 border border-gray-200 hover:border-[#42D5AE] hover:bg-[#42D5AE]/5 hover:text-[#42D5AE] transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-1 w-10 bg-[#42D5AE] rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">Technologies</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {TechNames?.map((tech) => (
                <span
                  key={tech}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 border border-gray-200 hover:border-[#42D5AE] hover:bg-[#42D5AE]/5 hover:text-[#42D5AE] transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-[#42D5AE]/10 flex items-center justify-center">
              <PiBookOpenTextLight className="w-6 h-6 text-[#42D5AE]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Description</h2>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
            <p className="text-gray-700 leading-relaxed text-lg break-words">{SessionData?.description}</p>
          </div>
        </div>

        {/* Enroll Section */}
        {page !== "workspace" && (
          <div className="bg-gradient-to-br from-[#42D5AE]/5 to-[#42D5AE]/10 rounded-2xl p-8 sm:p-10 border border-[#42D5AE]/20">
            <div className="flex items-center justify-between gap-8 flex-col sm:flex-row">
              <div className="text-center sm:text-left">
                <p className="text-xl font-semibold text-gray-900 mb-2">Ready to get started?</p>
                <p className="text-base text-gray-600">🚀 Seats are limited – join now and start learning!</p>
              </div>
              <button className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 whitespace-nowrap">
                Enroll Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
