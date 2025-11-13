import { useState } from "react";
import { FaArrowLeft, FaUserPlus } from "react-icons/fa";
import { FiCheckCircle, FiUsers, FiXCircle } from "react-icons/fi";
import { LuClock4 } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import RequestCard from "../Cards/RequestCard";
import { useAuthQuery } from "../../imports";
import { getToken } from "../../helpers/helpers";
import { ApiError, RequestsResponse } from "../../interfaces";
import axiosInstance from "../../config/axios.config";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function SessionRequest() {
  const router = useNavigate();
  const token = getToken();
  const params = useParams();
  const queryClient = useQueryClient();

  const SessionId = params.id as string;
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const handleApprove = async (requestId: string) => {
    try {
      await axiosInstance.put(
        `/sessions/requests/approve/${SessionId}/${requestId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Request rejected successfully", { duration: 1000 });
      queryClient.invalidateQueries({ queryKey: [`session-request-${token}`] });
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      console.log(error.response?.data.message);
      toast.error(`${error.response?.data.message}`, {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await axiosInstance.put(
        `/sessions/requests/reject/${SessionId}/${requestId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Request rejected successfully", { duration: 1000 });
      queryClient.invalidateQueries({ queryKey: [`session-request-${token}`] });
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      console.log(error.response?.data.message);
      toast.error(`${error.response?.data.message}`, {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const RecSession = useAuthQuery<RequestsResponse>({
    queryKey: [`session-request-${token}`],
    url: `/sessions/requests/${SessionId}/`,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  }).data?.data;
  const getStatusCounts = () => {
    return {
      total: RecSession?.length,
      pending: RecSession?.filter((r) => r.state === "PENDING").length,
      approved: RecSession?.filter((r) => r.state === "APPROVE").length,
      rejected: RecSession?.filter((r) => r.state === "REJECTED").length,
    };
  };

  const statusCounts = getStatusCounts();
  //   const uniquePositions = [...new Set(requests.map((r) => r.appliedPosition))];
  console.log(RecSession);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Back button */}
              <button
                onClick={() => router("/workspace")}
                className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 transition"
                aria-label="Back to Project"
              >
                <FaArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to Project</span>
              </button>

              {/* Divider */}
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

              {/* Title + Subtitle */}
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                  Team Requests
                </h1>
                <p className="mt-0.5 text-sm text-gray-600">
                  Manage applications to join your project team
                </p>
              </div>
            </div>

            {/* <div className="flex items-center gap-3">
              <button
                onClick={() => router.push(`/projects/${projectId}/dashboard`)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {statusCounts.total}
                </p>
                <p className="text-sm text-gray-600">Total Requests</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <LuClock4 className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {statusCounts.pending}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {statusCounts.approved}
                </p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <FiXCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {statusCounts.rejected}
                </p>
                <p className="text-sm text-gray-600">Rejected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        {/* <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, position, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="interview">Interview</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all"
            >
              <option value="all">All Positions</option>
              {uniquePositions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="rating">Highest Rating</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
      </div> */}

        {/* Requests List */}
        <div className="space-y-6">
          {RecSession?.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
              <FaUserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No requests found
              </h3>
              <p className="text-gray-600">
                {searchTerm ||
                statusFilter !== "all" ||
                positionFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "No one has applied to join your project team yet."}
              </p>
            </div>
          ) : (
            RecSession?.map((request) => (
              <RequestCard
                key={request.requestId}
                request={request}
                SessionId={SessionId}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
