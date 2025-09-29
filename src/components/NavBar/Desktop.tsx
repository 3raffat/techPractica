import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CookiesService } from "../../imports";
import { NavLinks } from "../../Router/route";

interface IProps {
  pathname: string;
}
const Desktop = ({ pathname }: IProps) => {
  const token = CookiesService.get("UserToken");
  return (
    <>
      <div className="hidden md:flex items-center space-x-1">
        {NavLinks.slice(0, 4)
          .filter((x) => x.label !== "Workspace" || !!token)
          .map(({ label, path, icon: Icon }) => {
            const isActive = pathname === path;
            return (
              <motion.div
                key={label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={path}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#42D5AE]"
                      : "text-gray-600 hover:text-[#42D5AE] hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl border border-[#42D5AE]/20"
                      initial={false}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
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
