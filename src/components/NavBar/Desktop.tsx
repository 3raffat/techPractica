import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { NavLinks } from "../../Router/route";
import { getToken } from "../../helpers/helpers";

interface IProps {
  pathname: string;
}
const Desktop = ({ pathname }: IProps) => {
  const token = getToken();

  return (
    <>
      <div className="hidden md:flex items-center gap-2">
        {NavLinks.slice(0, 4)
          .filter((x) => x.label !== "Workspace" || !!token)
          .map(({ label, path, icon: Icon }) => {
            const isActive = pathname === path;
            return (
              <motion.div
                key={label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={path}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-[#42D5AE] bg-gradient-to-r from-[#42D5AE]/10 to-[#42D5AE]/5"
                      : "text-gray-700 hover:text-[#42D5AE] hover:bg-gray-50/80"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-[#42D5AE]" : ""}`}
                  />
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#42D5AE]/10 to-[#42D5AE]/5 border-2 border-[#42D5AE]/30"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#42D5AE] rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
      </div>
    </>
  );
};
export default Desktop;
