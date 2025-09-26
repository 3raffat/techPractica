import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex justify-center items-center gap-2 mt-12"
    >
      {/* Previous Button */}
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiChevronLeft className="h-4 w-4" />
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-[#42D5AE] text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <span key={page} className="px-2 text-gray-400">
                ...
              </span>
            );
          }
          return null;
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <FiChevronRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

export default Paginator;
