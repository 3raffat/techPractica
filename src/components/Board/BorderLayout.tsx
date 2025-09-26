"use client";

import { useState } from "react";
import HorizontalNavigationBar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function HorizontalLayout() {
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Horizontal Navigation Bar */}
      <HorizontalNavigationBar
        isCollapsed={navbarCollapsed}
        onToggleCollapse={setNavbarCollapsed}
      />

      {/* Main Content Area */}
      <div className="min-h-screen">
        {/* Replace with <Outlet /> when using React Router */}
        <Outlet />
      </div>
    </div>
  );
}
