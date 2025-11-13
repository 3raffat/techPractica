"use client"

import { Link } from "react-router-dom"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Link to="/" className="group">
            <span className="text-2xl font-black bg-gradient-to-r from-[#022639] to-[#42D5AE] bg-clip-text text-transparent transition-opacity group-hover:opacity-80">
              TechPractica
            </span>
          </Link>

        
          {/* Copyright */}
          <p className="text-sm text-gray-500">© 2025 TechPractica</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;