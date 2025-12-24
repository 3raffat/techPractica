import { motion, AnimatePresence } from "framer-motion";
import { CiMenuBurger } from "react-icons/ci";
import { GoX } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getInitials } from "../../data/data";
import { useState } from "react";
import { INotificationsResponse } from "../../interfaces";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config/axios.config";

interface IProps {
  showUserMenu: boolean;
  setShowUserMenu: (showUserMenu: boolean) => void;
  handleLogout: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}
const RightSection = ({
  setShowUserMenu,
  showUserMenu,
  handleLogout,
  isSidebarOpen,
  setIsSidebarOpen,
}: IProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { token, isTokenValid, userName } = useAuth();

  const { data: notificationsData } = useQuery<INotificationsResponse>({
    queryKey: [`notifications-${token}`],
    queryFn: async () => {
      const lastSeen = new Date().toISOString();
      const { data } = await axiosInstance.get<INotificationsResponse>(
        `/notifications/?lastSeen=${encodeURIComponent(lastSeen)}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    enabled: isTokenValid,
    refetchInterval: 7000, // Refetch every 7 seconds
  });

  const notifications = notificationsData?.data.notifications || [];
  const unreadCount = notificationsData?.data.notifications?.length || 0;
  return (
    <>
      <div className="flex items-center gap-3">
        {/* Notifications */}
        {isTokenValid && (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="relative p-2.5 rounded-xl hover:bg-gray-50/80 transition-all duration-300 border border-transparent hover:border-gray-200"
            >
              <IoNotificationsOutline className="w-6 h-6 text-gray-700" />
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full ring-2 ring-white flex items-center justify-center px-1"
                >
                  <span className="text-[10px] font-bold text-white leading-none">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                </motion.div>
              )}
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-10"
                    onClick={() => setShowNotifications(false)}
                  />

                  {/* Notifications Dropdown */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-3 w-80 sm:w-96 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl z-20 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-[#42D5AE]/5 to-transparent">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <span className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white rounded-full">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center">
                          <IoNotificationsOutline className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-sm text-gray-500">
                            No notifications
                          </p>
                        </div>
                      ) : (
                        <div className="py-2">
                          {notifications.map((notification) => (
                            <motion.div
                              key={notification.notificationId}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer ${
                                !notification.title ? "bg-[#42D5AE]/5" : ""
                              }`}
                              // onClick={() => {
                              //   if (notification.link) {
                              //     navigate(notification.link);
                              //   }
                              //   setShowNotifications(false);
                              // }}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                    !notification.title
                                      ? "bg-gradient-to-r from-[#42D5AE] to-[#38b28d]"
                                      : "bg-gray-300"
                                  }`}
                                />
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`text-sm font-semibold ${
                                      !notification.title
                                        ? "text-gray-900"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    {notification.title}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                    {notification.content}
                                  </p>
                                  {/* <p className="text-xs text-gray-400 mt-1">
                                    {new Date(
                                      notification.createdAt
                                    ).toLocaleDateString()}
                                  </p> */}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
                        <button
                          className="text-xs font-semibold text-[#42D5AE] hover:text-[#38b28d] transition-colors"
                          onClick={() => setShowNotifications(false)}
                        >
                          Mark all as read
                        </button>
                      </div>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* User / Auth */}
        {isTokenValid ? (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#42D5AE] to-[#38b28d] flex items-center justify-center text-white font-bold text-sm hover:opacity-90 transition-opacity"
            >
              {userName ? (
                getInitials(userName)
              ) : (
                <LuUser className="w-5 h-5" />
              )}
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-2"
                  >
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <LuUser className="w-4 h-4" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <MdLogout className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/auth?mode=login"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#42D5AE] transition-colors"
            >
              Login
            </Link>
            <Link
              to="/auth?mode=register"
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white rounded-lg hover:opacity-90 transition-opacity"
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
