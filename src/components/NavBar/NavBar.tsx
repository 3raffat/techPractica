import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Desktop from "./Desktop";
import RightSection from "./RightSection";
import MobileSidebar from "./MobileSidebar";
import { clearRole, clearToken, getToken } from "../../helpers/helpers";
import { useAuthQuery } from "../../imports";
import { IProfileResponse } from "../../interfaces";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = useLocation().pathname;
  const token = getToken();
  const handleLogout = () => {
    clearToken();
    clearRole();
    setShowUserMenu(false);
  };

  const { data: Data } = useAuthQuery<IProfileResponse>({
    queryKey: [`profile-data-${token}`],
    url: "/profile/",
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const userInfo = Data?.data?.user;
  const userName = userInfo?.name;
  const handleClick = () => {
    if (location.pathname === "/" || location.pathname === "/home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };
  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white "
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 cursor-pointer"
              onClick={handleClick}
            >
              <span className="ml-3 text-xl font-black bg-gradient-to-r from-[#022639] to-[#42D5AE] bg-clip-text text-transparent">
                TechPractica
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <Desktop pathname={pathname} />
            {/* Right Section */}
            <RightSection
              setShowUserMenu={setShowUserMenu}
              showUserMenu={showUserMenu}
              handleLogout={handleLogout}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              token={token}
              userName={userName!}
              userEmail={userInfo?.email!}
            />
          </div>
        </div>
      </motion.nav>
      {/* Mobile Sidebar */}
      <MobileSidebar
        handleLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        pathname={pathname}
        setIsSidebarOpen={setIsSidebarOpen}
        token={token}
      />
      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
