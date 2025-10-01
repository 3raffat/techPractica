import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white/95 backdrop-blur-xl border-t border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Logo Section - Exact match to navbar */}
          <motion.div
            className="flex items-center gap-4"
            whileHover={{ scale: 1.02 }}
          >
            <Link to="/" className="flex items-center group">
              <div className="ml-3">
                <span className="text-xl font-black bg-gradient-to-r from-[#022639] to-[#42D5AE] bg-clip-text text-transparent">
                  TechPractica
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>© 2025 TechPractica</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
