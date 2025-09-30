import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiFilter, FiGrid, FiList, FiSliders } from "react-icons/fi";

import { Outlet, useNavigate } from "react-router-dom";
import { useSystems } from "../../api";
import ExploreProjectCard from "../../components/Cards/ExploreSessionCard";
import Pagination from "../../components/Pagination";
import { ISession, ISystem, ISessionsResponse } from "../../interfaces";
import { useAuthQuery } from "../../imports";

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

export default function Explore() {
  /* ----------------States-------------------------------------- */

  const router = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const ITEMS_PER_PAGE = 6;
  /* ----------------Data-------------------------------------- */
  const useExploreSessionx = useAuthQuery<ISessionsResponse>({
    queryKey: [`SessionData-${currentPage}`],
    url: `/sessions/?size=${ITEMS_PER_PAGE}&page=${currentPage - 1}`,
  });

  const System = useSystems();
  const Systems = System.data?.data.systems;
  const Session = useExploreSessionx;
  const SessionData = Session.data?.data.sessions ?? [];
  const Sessionlength = Session.data?.data.sessions.length ?? 0;
  const totalPages = Session.data?.data.totalPages ?? 0;
  const isDesktop = useIsDesktop();
  // Reset page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("newest");
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
              Discover Amazing Projects
            </h1>
            <p className="text-xl text-[#42D5AE]/80 max-w-2xl mx-auto">
              Explore hands-on projects created by our community. Learn by
              building real-world applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchTerm}
                // onChange={(e) => {
                //   setSearchTerm(e.target.value);
                //   handleFilterChange();
                // }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <div className="flex items-center gap-4">
              <button
                //   onClick={() => setShowFilters(!showFilters)}
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
                  {Systems?.map(({ id, name }: ISystem) => {
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          setSelectedCategory(name);
                          handleFilterChange();
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors flex items-center gap-1 ${
                          selectedCategory === name
                            ? "bg-[#42D5AE] text-white border-[#42D5AE]"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-[#42D5AE]/10 hover:border-[#42D5AE]/30"
                        }`}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>

                {/* Sort */}
                {/* <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none bg-white"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div> */}

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
          {/* Results Count
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {startIndex + 1}-
              {Math.min(
                startIndex + ITEMS_PER_PAGE,
                filteredAndSortedProjects.length
              )}{" "}
              of {filteredAndSortedProjects.length} projects
            </p>
          </div> */}

          {/* Projects Grid/List */}
          <AnimatePresence mode="wait">
            {Sessionlength > 0 ? (
              <motion.div
                key={`${viewMode}-${currentPage}`}
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
                {SessionData?.map((Session: ISession, index: any) => (
                  <motion.div
                    key={index}
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
                  No projects found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters to find more
                  projects.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </section>
    </div>
  );
}
