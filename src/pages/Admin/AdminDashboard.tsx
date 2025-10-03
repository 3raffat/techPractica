import { FaShieldAlt } from "react-icons/fa";
import { ModernContentManagement } from "../../components/Admin/ContentManagement";

// Modal Components with Modern Design

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Modern Admin Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-[#42D5AE] to-[#38b28d] rounded-xl">
                  <FaShieldAlt className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>
              <p className="text-gray-600 text-sm">Manage platform Content</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Only Content Management */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ModernContentManagement />
      </div>

      {/* Modals */}
    </div>
  );
}
