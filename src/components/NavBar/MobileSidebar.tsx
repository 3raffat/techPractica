import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { NavLinks } from "../../Router/route";
import { MdLogout } from "react-icons/md";
import { GoX } from "react-icons/go";

interface IProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  handleLogout: () => void;
  pathname: string;
  token: string | null;
}
const MobileSidebar = ({
  handleLogout,
  isSidebarOpen,
  pathname,
  setIsSidebarOpen,
  token,
}: IProps) => {
  return (
    <>
      {" "}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-black bg-gradient-to-r from-[#022639] to-[#42D5AE] bg-clip-text text-transparent">
                    TechPractica
                  </span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <GoX className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-2 px-6">
                  {NavLinks.filter(
                    (x) => x.label !== "Workspace" || !!token
                  ).map(({ label, path, icon: Icon }, index) => {
                    const isActive = pathname === path;
                    return (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Link
                          to={path}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                            isActive
                              ? "text-[#42D5AE] bg-[#42D5AE]/10 border border-[#42D5AE]/20"
                              : "text-gray-700 hover:text-[#42D5AE] hover:bg-gray-50"
                          }`}
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          <Icon className="w-5 h-5" />
                          {label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Auth / Logout */}
                {!token && (
                  <div className="mt-8 px-6 space-y-3">
                    <Link
                      to="/auth?mode=login"
                      className="block w-full text-center px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth?mode=register"
                      className="block w-full text-center px-4 py-3 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}

                {token && (
                  <div className="mt-8 px-6">
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsSidebarOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                    >
                      <MdLogout className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default MobileSidebar;
