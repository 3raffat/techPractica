import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { CookiesService, Modal, useAuthQuery } from "../../imports";
import Paginator from "../../components/ui/Paginator";
import SessionCardDetails from "../../components/ui/SessionCardDetails";
import ApplySessionForm from "../../components/Sessions/ApplySessionForm";
import SearchFilter from "../../components/ui/SearchFilter";
import { ISessionRes } from "../../interfaces";
import { useSystems } from "../../api";
import { AnimatePresence, motion } from "framer-motion";
import SessionCard from "../../components/Sessions/SessionCard";
import { FiFilter } from "react-icons/fi";

const Learn = () => {
  const token = CookiesService.get("UserToken")
    ? CookiesService.get("UserToken")
    : null;
  const payloadBase64 = token == null ? "" : token.split(".")[1];
  const { username } = token == null ? "" : JSON.parse(atob(payloadBase64));
  const { category } = useParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(category || "all");
  const [filteredSessions, setFilteredSessions] = useState<ISessionRes[]>([]);
  const [selectedSession, setSelectedSession] = useState<ISessionRes>();
  const [selectedFields, setSelectedFields] = useState<{
    SessionId: number;
    categories: string[];
  }>();
  const [isShowMoreOpen, setShowMoreOpen] = useState(false);
  const [isApplyOpen, setApplyOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const { data: SystemData } = useSystems();
  const systemName: string[] =
    SystemData?.map((tech: { systemName: string }) => tech.systemName) || [];

  const sessionsPerPage = 12;
  const fetchPageSize = 9999;

  // const Url = category
  //   ? `/sessions/system?systemName=${category}&pageNumber=0&pageSize=${fetchPageSize}`
  //   : `/sessions/?pageSize=${fetchPageSize}&pageNumber=0`;
  const Url = `/sessions/?pageSize=${fetchPageSize}&pageNumber=0`;
  const { data: sessionData } = useAuthQuery({
    queryKey: ["SessionData-All"],
    url: Url,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setPage(1);
  };

  const openShowMore = (session: ISessionRes) => {
    setSelectedSession(session);
    setSelectedFields({
      categories: session.categories,
      SessionId: session.id,
    });
    setShowMoreOpen(true);
  };

  const closeShowMore = () => {
    setShowMoreOpen(false);
  };

  const openApply = () => {
    setShowMoreOpen(false);
    setApplyOpen(true);
  };

  const closeApply = () => {
    setApplyOpen(false);
  };

  const Data = useMemo(
    () =>
      filteredSessions.map((session) => (
        <SessionCard
          key={session.id}
          openModal={() => openShowMore(session)}
          {...session}
        />
      )),
    [filteredSessions]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#f9fafb]">
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

        <main className="container mx-auto px-4 pt-6 pb-12 flex-1 flex flex-col">
          {/* Projects Grid/List */}
          <AnimatePresence mode="wait">
            {Data.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                }
              >
                {Data}
                {Data}
                {Data}
                {Data}
                {Data}
                {Data}
                {Data}
                {Data}
                {Data}
                {Data}
                {Data}
                {Data}
                {Data}
                {Data}
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
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          {/* <div className="flex-1 flex flex-col justify-between">
            {Data.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {Data}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex-1 flex items-center justify-center"
              >
                <p className="text-gray-500 text-center">
                  No sessions found matching your criteria
                </p>
              </motion.div>
            )}

            {pageCount > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-10 flex justify-start"
              >
                <Paginator
                  page={page}
                  pageCount={pageCount}
                  onClickNext={() => setPage((p) => p + 1)}
                  onClickPrev={() => setPage((p) => Math.max(p - 1, 1))}
                />
              </motion.div>
            )}
          </div> */}
        </main>
      </div>

      <Modal
        isOpen={isShowMoreOpen}
        closeModal={closeShowMore}
        title={selectedSession?.sessionName}
      >
        <SessionCardDetails
          username={username}
          session={selectedSession!}
          openModal={openApply}
          closeModal={closeShowMore}
        />
      </Modal>

      <Modal isOpen={isApplyOpen} closeModal={closeApply} title="Apply">
        <ApplySessionForm closeModal={closeApply} SessionDet={selectedFields} />
      </Modal>
    </>
  );
};

export default Learn;
