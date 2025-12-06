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
  userName: string;
  userEmail: string;
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
              className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#42D5AE] to-[#38b28d] flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(userName)}
              </div>
              <FaChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform ${
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
                    className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl z-20 py-2"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{userName}</p>
                      <p className="text-sm text-gray-600">{userEmail}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <LuUser className="w-4 h-4" />
                        Profile
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <MdLogout className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-2">
            <Link
              to="/auth?mode=login"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#42D5AE] transition-colors"
            >
              Login
            </Link>
            <Link
              to="/auth?mode=register"
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white rounded-xl hover:shadow-lg transition-all duration-300"
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
