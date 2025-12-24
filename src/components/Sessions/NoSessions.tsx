import { motion } from "framer-motion";
import { BsFolder, BsGlobe, BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

const NoSessions = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-12 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-6 bg-gray-100 rounded-full">
            <BsFolder className="w-16 h-16 text-gray-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Sessions Yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              You haven't joined or created any sessions yet. Start exploring
              available Sessions or create your own to get started!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/explore"
              className="px-6 py-3 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <BsGlobe className="w-5 h-5" />
              Explore Sessions
            </Link>
            <Link
              to="/workspace/session/new"
              className="px-6 py-3 border-2 border-[#42D5AE] text-[#42D5AE] hover:bg-[#42D5AE] hover:text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <BsPlus className="w-5 h-5" />
              Create New Session
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default NoSessions;
