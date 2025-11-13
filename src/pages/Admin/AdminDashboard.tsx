import { ModernContentManagement } from "../../components/Admin/ContentManagement";
import { useState } from "react";
import { adminNav } from "../../Router/route";
import { BsShield } from "react-icons/bs";
import { ModernUserManagement } from "../../components/Admin/UserManagement";
import { MdLogout } from "react-icons/md";
import { clearRole, clearToken } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";

// Modal Components with Modern Design

export default function AdminDashboard() {
  const router = useNavigate();
  const [activeSection, setActiveSection] = useState("users");
  const handleLogout = () => {
    clearToken();
    clearRole();
    router("/");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Modern Admin Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-[#42D5AE] to-[#38b28d] rounded-xl">
                    <BsShield className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                </div>
                <p className="text-gray-600 text-sm">
                  Manage your platform content and users
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#42D5AE]/25 transition-all flex items-center gap-2 font-medium"
              >
                <MdLogout className="w-4 h-4" />
                Logout{" "}
              </button>
            </div>

            {/* Modern Navigation Tabs */}
            <div className="flex gap-2 pb-4">
              {adminNav.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all text-sm ${
                    activeSection === id
                      ? "bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white shadow-lg shadow-[#42D5AE]/25"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {activeSection === "content" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ModernContentManagement />
          </div>
        )}
        {activeSection === "users" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ModernUserManagement />
          </div>
        )}
      </div>
    </>
  );
}
