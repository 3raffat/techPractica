import { useNavigate, useParams } from "react-router-dom";
import { CookiesService, useAuthQuery } from "../../imports";
import { SessionResponse } from "../../interfaces";
import { ArrowLeft, BookOpen, Users } from "lucide-react";

export default function ProjectDetailPage() {
  /* ------------------ Fetch Data ------------------ */
  const token = CookiesService.get("UserToken");
  const { id } = useParams();
  const UserSession = useAuthQuery<SessionResponse>({
    queryKey: [`UserSession`],
    url: `/sessions/by-id/${id}`,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const session = UserSession ?? [];
  const SessionData = session?.data?.data;
  const fieldName = SessionData?.requirements.map((x) => x.field);
  const TechNames = SessionData?.requirements.map((x) => x.technologies).flat();
  console.log(TechNames);
  const router = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-10 space-y-10 relative overflow-hidden">
        {/* Decorative Gradient */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#42D5AE]/10 rounded-full blur-3xl -z-10"></div>

        {/* Back Button */}
        <button
          onClick={() => router("/explore")}
          className="group flex items-center gap-2 text-gray-600 hover:text-[#42D5AE] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>

        {/* Header */}
        <div>
          <div className="inline-block bg-[#42D5AE]/10 px-4 py-1.5 rounded-full mb-4">
            <span className="text-sm font-semibold text-[#42D5AE]">
              {SessionData?.system.name}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-snug">
            {SessionData?.name}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Users className="w-5 h-5 text-gray-500" />
            <span>{fieldName?.length} Fields</span>
          </div>
        </div>

        {/* Fields & Technologies */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Fields</h2>
            <div className="flex flex-wrap gap-3">
              {fieldName?.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#42D5AE]/10 text-gray-700 hover:bg-[#42D5AE]/20 hover:text-[#42D5AE] transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-5">
              Technologies
            </h2>
            <div className="flex flex-wrap gap-3">
              {TechNames?.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#42D5AE]/10 text-gray-700 hover:bg-[#42D5AE]/20 hover:text-[#42D5AE] transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Description Full */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#42D5AE]" />
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed break-words">
            {SessionData?.description}
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="mb-5 text-sm text-gray-600">
            🚀 Seats are limited – join now!
          </p>
          <button className="w-full py-4 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
