import { motion, AnimatePresence } from "framer-motion";
import { CiMenuBurger } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { GoX } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { getInitials } from "../../data/data";

interface IProps {
  showUserMenu: boolean;
  setShowUserMenu: (showUserMenu: boolean) => void;
  token: string | null;
  handleLogout: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  userName?: string;
  userEmail?: string;
}
const RightSection = ({
  setShowUserMenu,
  showUserMenu,
  token,
  handleLogout,
  isSidebarOpen,
  setIsSidebarOpen,
  userName,
  userEmail,
}: IProps) => {
  return (
    <>
      <div className="flex items-center gap-3">
        {/* User / Auth */}
        {token ? (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50/80 transition-all duration-300 border border-transparent hover:border-gray-200"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#42D5AE] to-[#38b28d] flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-[#42D5AE]/20">
                {userName ? (
                  getInitials(userName)
                ) : (
                  <LuUser className="w-5 h-5" />
                )}
              </div>
              {userName || userEmail ? (
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {userName || "User"}
                  </p>
                  {userEmail && (
                    <p className="text-xs text-gray-500 truncate max-w-[120px]">
                      {userEmail}
                    </p>
                  )}
                </div>
              ) : (
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">Account</p>
                </div>
              )}
              <FaChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                  showUserMenu ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />

                  {/* Menu */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-3 w-64 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl z-20 py-2 overflow-hidden"
                  >
                    <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-[#42D5AE]/5 to-transparent">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#42D5AE] to-[#38b28d] flex items-center justify-center text-white font-bold shadow-lg">
                          {userName ? (
                            getInitials(userName)
                          ) : (
                            <LuUser className="w-6 h-6" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 truncate">
                            {userName || "User Account"}
                          </p>
                          {userEmail ? (
                            <p className="text-xs text-gray-600 truncate max-w-[180px]">
                              {userEmail}
                            </p>
                          ) : (
                            <p className="text-xs text-gray-500 italic">
                              No email provided
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-[#42D5AE]/10 hover:to-[#42D5AE]/5 hover:text-[#42D5AE] transition-all duration-200 mx-2 rounded-xl"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <LuUser className="w-5 h-5" />
                        Profile
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 w-full text-left mx-2 rounded-xl"
                      >
                        <MdLogout className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/auth?mode=login"
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#42D5AE] transition-colors rounded-xl hover:bg-gray-50/80"
            >
              Login
            </Link>
            <Link
              to="/auth?mode=register"
              className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white rounded-xl hover:shadow-lg hover:shadow-[#42D5AE]/25 transition-all duration-300 hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <AnimatePresence>
            {isSidebarOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <GoX className="w-5 h-5 text-gray-600" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CiMenuBurger className="w-5 h-5 text-gray-600" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
};
export default RightSection;
