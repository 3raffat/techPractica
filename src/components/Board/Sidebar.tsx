"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  MessageCircle,
  Users,
  Plus,
  LayoutDashboard,
  Kanban,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

// Mock user image - replace with your actual import
const userImgg = "/placeholder.svg?height=32&width=32&text=U";

interface NavbarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

const HorizontalNavigationBar = ({
  isCollapsed = false,
  onToggleCollapse,
}: NavbarProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggle = () => {
    onToggleCollapse?.(!isCollapsed);
  };

  // Track mouse position for interactive effects
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        className="fixed top-4 left-4 right-4 h-20 bg-[#022639] text-gray-200 flex items-center z-50 shadow-xl border-2 border-[#0a344f] backdrop-blur-sm overflow-hidden rounded-3xl"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(66, 213, 174, 0.15), rgba(2, 38, 57, 0.1), transparent 40%)`,
        }}
      >
        {/* Enhanced animated border gradient */}
        <motion.div
          className="absolute inset-0 p-[1px] rounded-3xl"
          animate={{
            background: [
              "conic-gradient(from 0deg, rgba(66, 213, 174, 0.4), rgba(56, 178, 141, 0.2), rgba(2, 38, 57, 0.4), rgba(66, 213, 174, 0.4))",
              "conic-gradient(from 120deg, rgba(66, 213, 174, 0.4), rgba(56, 178, 141, 0.2), rgba(2, 38, 57, 0.4), rgba(66, 213, 174, 0.4))",
              "conic-gradient(from 240deg, rgba(66, 213, 174, 0.4), rgba(56, 178, 141, 0.2), rgba(2, 38, 57, 0.4), rgba(66, 213, 174, 0.4))",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="h-full w-full rounded-3xl bg-[#022639]/40 backdrop-blur-3xl" />
        </motion.div>

        {/* Enhanced floating orbs background */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] rounded-full opacity-30"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                x: [-5, 5, -5],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Interactive mouse glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-30"
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(66, 213, 174, 0.15), transparent 50%)`,
          }}
        />

        <div className="relative z-10 flex items-center justify-between w-full px-8">
          {/* Enhanced User Info Section */}
          <div className="flex items-center gap-4 shrink-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border-2 border-[#38b28d] shadow-lg group-hover:border-[#42D5AE] transition-colors duration-300"
            >
              <img
                src={userImgg || "/placeholder.svg"}
                alt="User profile"
                className="w-full h-full object-cover"
              />
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#42D5AE] rounded-full border-2 border-[#022639]" />

              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#42D5AE]/40 to-[#38b28d]/40 blur-lg"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <div className="hidden md:block">
              <div className="font-semibold leading-tight text-sm text-gray-100">
                Owner Username
              </div>
              <div className="text-xs text-gray-400 truncate max-w-[180px]">
                Session Name
              </div>
            </div>

            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block opacity-60 hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Enhanced Navigation Pills - Desktop */}
          <nav className="hidden lg:flex items-center flex-1 justify-center">
            <div className="bg-[#022639]/30 backdrop-blur-xl rounded-full p-2 border border-[#42D5AE]/30 shadow-lg shadow-[#42D5AE]/10">
              <div className="flex items-center space-x-2">
                {[
                  {
                    icon: <LayoutDashboard className="w-5 h-5" />,
                    label: "Dashboard",
                    isActive: false,
                    path: "/dashboard",
                  },
                  {
                    icon: <Kanban className="w-5 h-5" />,
                    label: "Kanban",
                    isActive: true,
                    path: "/kanban",
                  },
                  {
                    icon: <MessageCircle className="w-5 h-5" />,
                    label: "Chat",
                    isActive: false,
                    badge: 3,
                    path: "/chat",
                  },
                  {
                    icon: (
                      <div className="flex items-center">
                        <Users className="w-5 h-5" />
                        <Plus className="w-3 h-3 opacity-70 ml-1" />
                      </div>
                    ),
                    label: "Members",
                    isActive: false,
                    path: "/members",
                  },
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center gap-3 h-12 px-6 rounded-full transition-all duration-300 whitespace-nowrap text-sm font-semibold group ${
                      item.isActive
                        ? "text-white bg-gradient-to-r from-[#42D5AE] via-[#38b28d] to-[#42D5AE] shadow-lg shadow-[#42D5AE]/30"
                        : "text-gray-300 hover:text-white hover:bg-[#022639]/50"
                    }`}
                    onClick={() => {
                      console.log(`Navigate to ${item.path}`);
                    }}
                  >
                    <div className="relative shrink-0">
                      {item.icon}
                      {/* Badge for notifications */}
                      {item.badge && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-[#42D5AE] text-[#022639] text-xs font-bold rounded-full flex items-center justify-center"
                        >
                          {item.badge}
                        </motion.div>
                      )}
                    </div>

                    <span className="font-semibold">{item.label}</span>

                    {/* Enhanced active pill background */}
                    {item.isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-gradient-to-r from-[#42D5AE] via-[#38b28d] to-[#42D5AE] rounded-full"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Enhanced hover glow effect */}
                    {!item.isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#42D5AE]/20 to-[#38b28d]/20 opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    {/* Shimmer effect for active item */}
                    {item.isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    )}

                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </nav>

          {/* Enhanced Avatar Group */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <div className="flex items-center -space-x-2">
              {["AA", "MN", "M", "MA"].map((initials, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group/avatar"
                  style={{ zIndex: 10 - idx }}
                >
                  <div className="w-9 h-9 rounded-full bg-[#42D5AE] hover:bg-[#38b28d] text-xs font-bold flex items-center justify-center border-2 border-white shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl">
                    {initials}
                  </div>

                  {/* Enhanced tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/avatar:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                    User {initials}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add member button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(66, 213, 174, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full border-2 border-dashed border-[#42D5AE]/60 hover:border-[#42D5AE] flex items-center justify-center transition-all duration-200 group ml-2"
            >
              <Plus className="w-4 h-4 text-[#42D5AE] group-hover:rotate-90 transition-transform duration-200" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-3 bg-[#022639]/50 backdrop-blur-xl border border-[#42D5AE]/50 rounded-2xl hover:bg-[#022639]/70 transition-all duration-300 shadow-xl shadow-[#42D5AE]/20"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Enhanced gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#022639] via-[#022639]/80 to-transparent pointer-events-none rounded-r-3xl" />
      </motion.div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-28 left-4 right-4 z-40 bg-[#022639]/50 backdrop-blur-3xl border border-[#42D5AE]/40 rounded-3xl shadow-2xl overflow-hidden lg:hidden"
        >
          <div className="p-6 space-y-3">
            {[
              {
                icon: <LayoutDashboard className="w-5 h-5" />,
                label: "Dashboard",
                isActive: false,
              },
              {
                icon: <Kanban className="w-5 h-5" />,
                label: "Kanban",
                isActive: true,
              },
              {
                icon: <MessageCircle className="w-5 h-5" />,
                label: "Chat",
                isActive: false,
                badge: 3,
              },
              {
                icon: <Users className="w-5 h-5" />,
                label: "Members",
                isActive: false,
              },
            ].map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className={`w-full flex items-center gap-4 px-6 py-4 text-lg font-semibold transition-all duration-300 rounded-2xl ${
                  item.isActive
                    ? "text-white bg-gradient-to-r from-[#42D5AE] via-[#38b28d] to-[#42D5AE] shadow-xl shadow-[#42D5AE]/40"
                    : "text-gray-300 hover:text-white hover:bg-[#022639]/60"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="relative">
                  {item.icon}
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#42D5AE] text-[#022639] text-xs font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </div>
                  )}
                </div>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-28" />
    </>
  );
};

export default HorizontalNavigationBar;
