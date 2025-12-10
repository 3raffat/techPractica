import { FaArrowLeft } from "react-icons/fa";
import { FiCheckCircle, FiUsers, FiXCircle } from "react-icons/fi";
import { LuClock4 } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import RequestCard from "../Cards/RequestCard";
import { useAuthQuery } from "../../imports";
import { getToken } from "../../helpers/helpers";
import { ApiError, RequestsResponse, SessionResponse } from "../../interfaces";
import axiosInstance from "../../config/axios.config";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { VscDebugStart } from "react-icons/vsc";
import { useState, useEffect } from "react";

export default function SessionRequest() {
  const router = useNavigate();
  const token = getToken();
  const params = useParams();
  const queryClient = useQueryClient();
  const [sessionStatus, setSessionStatus] = useState<string>("");

  const SessionId = params.id as string;

  // Fetch session data to get initial status
  const sessionQuery = useAuthQuery<SessionResponse>({
    queryKey: [`session-${SessionId}`],
    url: `/sessions/by-id/${SessionId}`,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  // Update session status from fetched data
  useEffect(() => {
    const sessionData = sessionQuery.data?.data;
    if (sessionData?.status) {
      setSessionStatus(sessionData.status);
    }
  }, [sessionQuery.data]);

  const handleApprove = async (requestId: string) => {
    try {
      const res = await axiosInstance.put(
        `/sessions/requests/approve/${SessionId}/${requestId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      toast.success("Request rejected successfully", { duration: 1000 });
      queryClient.invalidateQueries({ queryKey: [`session-request-${token}`] });
    } catch (err) {
      const error = err as AxiosError<ApiError>;
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
      toast.error(`${error.response?.data.message}`, {
        position: "top-right",
        duration: 2000,
      });
    }
  };
  const handleStartSession = async () => {
    // Check if session is already running
    if (sessionStatus === "RUNNING") {
      toast.error("Session is already running", {
        position: "top-right",
        duration: 2000,
      });
      return;
    }

    try {
      const res = await axiosInstance.put(
        `/sessions/start/${SessionId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);

      // Update session status from response
      // Check different possible response structures
      const responseData = res.data as any;
      const responseStatus =
        responseData?.data?.status ||
        responseData?.data?.data?.status ||
        responseData?.status;

      if (responseStatus) {
        setSessionStatus(responseStatus);
      } else {
        // If status not in response, set to RUNNING as default after successful start
        setSessionStatus("RUNNING");
      }

      toast.success("Session started successfully", { duration: 1000 });
      queryClient.invalidateQueries({ queryKey: [`session-request-${token}`] });
      queryClient.invalidateQueries({ queryKey: [`session-${SessionId}`] });
    } catch (err) {
      const error = err as AxiosError<ApiError>;
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
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router("/workspace")}
                className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 transition"
                aria-label="Back to Project"
              >
                <FaArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to Workspace</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Team Requests
                </h1>
                <p className="text-gray-600">
                  Manage applications to join your project team
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleStartSession}
                disabled={sessionStatus === "RUNNING"}
                className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
              >
                <VscDebugStart className="w-4 h-4" />
                {sessionStatus === "RUNNING"
                  ? "Session Running"
                  : "Start Session"}
              </button>
            </div>
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
        {RecSession?.map((request) => (
          <RequestCard
            key={request.requestId}
            request={request}
            SessionId={SessionId}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </div>
    </div>
  );
}
