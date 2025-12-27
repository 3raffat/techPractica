import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiSliders,
  FiCode,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSystems } from "../../api";
import ExploreProjectCard from "../../components/Cards/ExploreSessionCard";
import Pagination from "../../components/Pagination";
import { ISession, ISystem, ISessionsResponse } from "../../interfaces";
import { useAuthQuery } from "../../imports";
import { getToken } from "../../helpers/helpers";

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

const ITEMS_PER_PAGE = 6;

export default function Explore() {
  const router = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const token = getToken();
  const System = useSystems();
  const Systems = System.data?.data.systems ?? [];

  // Session code validation pattern: ^[A-Za-z0-9\-_.~]{16}$
  const sessionCodePattern = /^[A-Za-z0-9\-_.~]{16}$/;

  // Detect if search term is a session code (exactly 16 characters matching pattern)
  const isSessionCode =
    searchTerm.trim() !== "" && sessionCodePattern.test(searchTerm.trim());
  const isSessionName = searchTerm.trim() !== "" && !isSessionCode;

  // Check if any filter is active
  const hasActiveFilters =
    searchTerm.trim() !== "" || selectedCategory !== "All";

  // Check if we should use the search endpoint
  const useSearchEndpoint = searchTerm.trim() !== "";

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Fetch all sessions to get accurate count (backend totalItems is incorrect)
  // This is used for calculating totalPages when no filters are active
  const { data: allSessionsCountData } = useAuthQuery<ISessionsResponse>({
    queryKey: [`SessionData-all-count`],
    url: `/sessions/?size=10000&page=0`,
    ...(token
      ? {
          config: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      : {}),
  });

  // Build search endpoint URL with query parameters
  const buildSearchUrl = () => {
    const params = new URLSearchParams();
    if (isSessionCode) {
      // If input matches session code pattern, use it as sessionCode
      params.append("sessionCode", searchTerm.trim());
    } else if (isSessionName) {
      // Otherwise, use it as sessionName
      params.append("sessionName", searchTerm.trim());
    }
    params.append("page", String(currentPage - 1));
    params.append("size", String(ITEMS_PER_PAGE));
    return `/sessions/spec?${params.toString()}`;
  };

  // Fetch sessions using search endpoint when searching
  const shouldUseSearchEndpoint = useSearchEndpoint;

  const useExploreSessionx = useAuthQuery<ISessionsResponse>({
    queryKey: [
      `SessionData-${
        shouldUseSearchEndpoint
          ? "search"
          : hasActiveFilters
          ? "all"
          : currentPage
      }-${searchTerm}-${currentPage}`,
    ],
    url: shouldUseSearchEndpoint
      ? buildSearchUrl()
      : hasActiveFilters
      ? `/sessions/?size=10000&page=0`
      : `/sessions/?size=${ITEMS_PER_PAGE}&page=${currentPage - 1}`,
    ...(token
      ? {
          config: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      : {}),
  });

  const Session = useExploreSessionx;
  const allSessions = Session.data?.data.sessions ?? [];

  // Filter sessions client-side when filters are active (only for category when using search endpoint)
  const filteredAndSortedSessions = useMemo(() => {
    let filtered = [...allSessions];

    // If using search endpoint, server already filtered by name/code, so only filter by category
    // If not using search endpoint, filter by name and category client-side
    if (!shouldUseSearchEndpoint) {
      // Search filter - filter by session name only (client-side)
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase().trim();
        filtered = filtered.filter((session) =>
          session.name.toLowerCase().includes(searchLower)
        );
      }
    }

    // Category filter (always client-side)
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (session) => session.system.name === selectedCategory
      );
    }

    return filtered;
  }, [allSessions, searchTerm, selectedCategory, shouldUseSearchEndpoint]);

  // Pagination for filtered results
  const totalFilteredPages = Math.ceil(
    filteredAndSortedSessions.length / ITEMS_PER_PAGE
  );

  // When using search endpoint, server handles pagination
  // When filters are active but not using search, use client-side pagination
  // When no filters, use server-side pagination directly
  const paginatedSessions = useMemo(() => {
    if (shouldUseSearchEndpoint) {
      // Search endpoint already paginated on server
      return filteredAndSortedSessions;
    } else if (hasActiveFilters) {
      // Client-side pagination for filtered results
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      return filteredAndSortedSessions.slice(startIndex, endIndex);
    } else {
      // No filters: use sessions directly from server (already paginated)
      return filteredAndSortedSessions;
    }
  }, [
    filteredAndSortedSessions,
    currentPage,
    hasActiveFilters,
    shouldUseSearchEndpoint,
  ]);

  const SessionData = paginatedSessions;
  const Sessionlength = SessionData.length;

  // Calculate total pages
  const totalItemsCount = allSessionsCountData?.data?.sessions?.length ?? 0;
  const totalPages = shouldUseSearchEndpoint
    ? Session.data?.data.totalPages ?? 0 // Use server pagination from search endpoint
    : hasActiveFilters
    ? totalFilteredPages // Client-side pagination for category filter
    : totalItemsCount > 0
    ? Math.ceil(totalItemsCount / ITEMS_PER_PAGE)
    : 0;

  // Ensure currentPage doesn't exceed totalPages and is at least 1
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const isDesktop = useIsDesktop();

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#42D5AE] to-[#022639] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Next Challenge Awaits
            </h1>
            <p className="text-xl text-[#42D5AE]/80 max-w-2xl mx-auto">
              Join a session, form a team, and bring real projects to life
              together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              {isSessionCode ? (
                <FiCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#42D5AE] h-4 w-4" />
              ) : (
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              )}
              <input
                type="text"
                placeholder="Search by session name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all ${
                  isSessionCode ? "font-mono text-sm" : ""
                }`}
              />
              {isSessionCode && searchTerm.trim() !== "" && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-[#42D5AE] font-medium">
                  Code
                </span>
              )}
            </div>

            {/* Filter Toggle (Mobile) */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FiSliders className="h-4 w-4" />
                Filters
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`h-8 w-8 p-0 rounded flex items-center justify-center transition-colors ${
                    viewMode === "grid"
                      ? "bg-[#42D5AE] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FiGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`h-8 w-8 p-0 rounded flex items-center justify-center transition-colors ${
                    viewMode === "list"
                      ? "bg-[#42D5AE] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FiList className="h-4 w-4" />
                </button>
              </div>
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
                  {/* Optional "All" chip */}
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors flex items-center gap-1 ${
                      selectedCategory === "All"
                        ? "bg-[#42D5AE] text-white border-[#42D5AE]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-[#42D5AE]/10 hover:border-[#42D5AE]/30"
                    }`}
                  >
                    All
                  </button>
                  {Systems.map(({ id, name }: ISystem) => (
                    <button
                      key={id}
                      onClick={() => setSelectedCategory(name)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors flex items-center gap-1 ${
                        selectedCategory === name
                          ? "bg-[#42D5AE] text-white border-[#42D5AE]"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-[#42D5AE]/10 hover:border-[#42D5AE]/30"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>

                {/* Clear Filters */}
                {(searchTerm || selectedCategory !== "All") && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors underline"
                  >
                    Clear All
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}

          {/* Projects Grid/List */}
          <AnimatePresence mode="wait">
            {filteredAndSortedSessions.length > 0 ? (
              Sessionlength > 0 ? (
                <motion.div
                  key={`${viewMode}-${currentPage}-${searchTerm}-${selectedCategory}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                      : "space-y-6"
                  }
                >
                  {SessionData?.map((Session: ISession, index: number) => (
                    <motion.div
                      key={Session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ExploreProjectCard
                        project={Session}
                        onClick={() =>
                          router(`/explore/session/${Session.id}`, {
                            state: { session: Session },
                          })
                        }
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
                    <FiFilter className="h-12 w-12 mx-auto" />
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
                  <FiFilter className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Sessions found
                </h3>
                <p className="text-gray-600 mb-4">
                  {hasActiveFilters
                    ? "Try adjusting your search criteria or filters to find more Sessions."
                    : "No Sessions available at the moment."}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
