import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlus } from "react-icons/hi";
import { IErrorResponse, ISessionsResponse, ISystem } from "../../interfaces";
import { useSystems } from "../../api";
import { useAuthQuery } from "../../imports";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { AiOutlineSearch } from "react-icons/ai";
import { LuFolderOpen } from "react-icons/lu";
import { IoFilterOutline } from "react-icons/io5";
import { WorkSpaceSessionCard } from "../../components/Cards/WorkSpaceSessionCard";
import Pagination from "../../components/Pagination";
import { getToken } from "../../helpers/helpers";
import DeleteModel from "../../components/DeleteSessionModel";
import EditSessionModal from "../../components/Sessions/EditSessionModal";
import { statuses, visibilities } from "../../data/data";

const ITEMS_PER_PAGE = 6;

// Helper to know when we're on desktop
function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= breakpoint);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);
  return isDesktop;
}

export default function WorkSpace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedVisibility, setSelectedVisibility] = useState("All");
  const [sortBy, setSortBy] = useState("updated");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [SessionId, setSessionId] = useState<string>();
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [EditSessionId, setEditSessionId] = useState<string | undefined>();
  const isDesktop = useIsDesktop();

  /*-----------Handlers--------------------------------------------------------------------*/
  const queryClient = useQueryClient();
  const router = useNavigate();

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSelectedVisibility("All");
    setSortBy("updated");
    setCurrentPage(1);
  };

  // Check if any filter is active
  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedStatus !== "All" ||
    selectedVisibility !== "All";

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedCategory,
    selectedStatus,
    selectedVisibility,
    sortBy,
  ]);
  const openDeleteModal = (id: string) => {
    setSessionId(id);
    setOpenDeleteModal(true);
  };
  const closeDeleteModal = () => setOpenDeleteModal(false);
  const onSubmitRemoveSession = async () => {
    try {
      await axiosInstance.delete(`/sessions/${SessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Invalidate all session queries to ensure data is refreshed
      queryClient.invalidateQueries({
        queryKey: ["SessionData"],
      });
      setOpenDeleteModal(false);
      toast.success("Session removed successfully", { position: "top-right" });
      queryClient.invalidateQueries({
        queryKey: [`SessionData-${hasActiveFilters ? "all" : currentPage}`],
      });
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>;
      toast.error(`${err.response?.data.message}`, {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const openEditModal = (id: string) => {
    setEditSessionId(id);
    setOpenEditModal(true);
  };
  const closeEditModal = () => {
    setOpenEditModal(false);
    setEditSessionId(undefined);
  };

  /*-----------Data--------------------------------------------------------------------*/
  const token = getToken();
  const System = useSystems();
  const Systems = System.data?.data.systems;

  // Fetch all sessions when filters are active, otherwise use pagination
  // Using a large size (10000) to ensure we get all sessions when filtering
  const useWorkSpaceSession = useAuthQuery<ISessionsResponse>({
    queryKey: [`SessionData-${hasActiveFilters ? "all" : currentPage}`],
    url: hasActiveFilters
      ? `/sessions/by-user?size=10000&page=0`
      : `/sessions/by-user?size=${ITEMS_PER_PAGE}&page=${currentPage - 1}`,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const usersession = useWorkSpaceSession;
  const allSessions = usersession.data?.data.sessions ?? [];
  console.log("All Sessions:", allSessions);
  // Filter and sort sessions
  const filteredAndSortedSessions = useMemo(() => {
    let filtered = [...allSessions];

    // Search filter - filter by session name only
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((session) =>
        session.name.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (session) => session.system.name === selectedCategory
      );
    }

    // Status filter
    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (session) =>
          session.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    // Visibility filter
    if (selectedVisibility !== "All") {
      const isPrivate = selectedVisibility === "private";
      filtered = filtered.filter((session) => session.private === isPrivate);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "created":
          // Fallback to name if no date field
          return a.name.localeCompare(b.name);
        case "updated":
          // Fallback to name if no date field
          return a.name.localeCompare(b.name);
        case "views":
          // Fallback to name if no views field
          return a.name.localeCompare(b.name);
        case "commits":
          // Fallback to name if no commits field
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    allSessions,
    searchTerm,
    selectedCategory,
    selectedStatus,
    selectedVisibility,
    sortBy,
  ]);

  // Pagination for filtered results
  const totalFilteredPages = Math.ceil(
    filteredAndSortedSessions.length / ITEMS_PER_PAGE
  );

  // When filters are active, use client-side pagination on filtered results
  // When no filters, use server-side pagination directly (no client-side pagination needed)
  const paginatedSessions = useMemo(() => {
    if (hasActiveFilters) {
      // Client-side pagination for filtered results
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      return filteredAndSortedSessions.slice(startIndex, endIndex);
    } else {
      // No filters: use sessions directly from server (already paginated)
      return filteredAndSortedSessions;
    }
  }, [filteredAndSortedSessions, currentPage, hasActiveFilters]);

  const Sessionlength = paginatedSessions.length;
  const SessionData = paginatedSessions;

  // Calculate total pages: use filtered pages when filters are active, otherwise use server pagination
  const totalPages = hasActiveFilters
    ? totalFilteredPages
    : usersession.data?.data.totalPages ?? 0;

  // Ensure currentPage doesn't exceed totalPages and is at least 1
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);
  /*-------------------------------------------------------------------------------*/

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#42D5AE] to-[#022639] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Workspace{" "}
              </h1>
              <p className="text-xl text-[#42D5AE]/80 max-w-2xl">
                Your personal space for managing Sessions
              </p>
            </div>
            <Link
              to="session/new"
              className="bg-white text-[#022639] hover:bg-gray-50 px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 shadow-lg"
            >
              <HiOutlinePlus className="w-5 h-5" />
              New Session
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by session name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <IoFilterOutline className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {(showFilters || isDesktop) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center"
              >
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-700 mr-2">
                    Category:
                  </span>
                  {Systems?.map(({ id, name }: ISystem) => (
                    <button
                      key={id}
                      onClick={() => setSelectedCategory(name)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                        selectedCategory === name
                          ? "bg-[#42D5AE] text-white border-[#42D5AE]"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-[#42D5AE]/10 hover:border-[#42D5AE]/30"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>

                {/* Status Filter */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-700 mr-2">
                    Status:
                  </span>
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                        selectedStatus === status
                          ? "bg-[#42D5AE] text-white border-[#42D5AE]"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-[#42D5AE]/10 hover:border-[#42D5AE]/30"
                      }`}
                    >
                      {status.toLowerCase()}
                    </button>
                  ))}
                </div>

                {/* Visibility Filter */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-700 mr-2">
                    Visibility:
                  </span>
                  {visibilities.map((visibility) => (
                    <button
                      key={visibility}
                      onClick={() => setSelectedVisibility(visibility)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                        selectedVisibility === visibility
                          ? "bg-[#42D5AE] text-white border-[#42D5AE]"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-[#42D5AE]/10 hover:border-[#42D5AE]/30"
                      }`}
                    >
                      {visibility}
                    </button>
                  ))}
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear All
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            {filteredAndSortedSessions.length > 0 ? (
              Sessionlength > 0 ? (
                <motion.div
                  key={`${currentPage}-${searchTerm}-${selectedCategory}-${selectedStatus}-${selectedVisibility}-${sortBy}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {SessionData.map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <WorkSpaceSessionCard
                        session={session}
                        onDelete={() => openDeleteModal(session.id)}
                        onClick={() =>
                          router(
                            `/workspace/session/${session.id}/task-manager`
                          )
                        }
                        onEdit={openEditModal}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-gray-400 mb-4">
                    <LuFolderOpen className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No more sessions on this page
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try going to the previous page or adjusting your filters.
                  </p>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Go to First Page
                  </button>
                </motion.div>
              )
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 mb-4">
                  <LuFolderOpen className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Sessions found
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ||
                  selectedCategory !== "All" ||
                  selectedStatus !== "All" ||
                  selectedVisibility !== "All"
                    ? "Try adjusting your search criteria or filters."
                    : "Create your first session to get started."}
                </p>
                <div className="flex gap-4 justify-center">
                  {(searchTerm ||
                    selectedCategory !== "All" ||
                    selectedStatus !== "All" ||
                    selectedVisibility !== "All") && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                  <Link
                    to="session/new"
                    className="px-4 py-2 bg-[#42D5AE] text-white rounded-lg hover:bg-[#38b28d] transition-colors flex items-center gap-2"
                  >
                    <HiOutlinePlus className="w-4 h-4" />
                    New Session
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </section>
      <DeleteModel
        OpenDeleteModal={OpenDeleteModal}
        closeDeleteModal={closeDeleteModal}
        onSubmitRemove={onSubmitRemoveSession}
        title="Remove Session"
        description="Are you sure you want to remove this session? This action cannot be undone."
      />
      <EditSessionModal
        open={OpenEditModal}
        onClose={closeEditModal}
        sessionId={EditSessionId}
      />
    </div>
  );
}
