import { motion } from "framer-motion";
import { FiAward, FiUser } from "react-icons/fi";

const EditProfileModal = ({ isOpen, onClose, user, onSave }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiUser className="w-5 h-5 text-[#42D5AE]" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={editData.firstName || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, firstName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={editData.lastName || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none"
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brief
              </label>
              <textarea
                value={editData.brief || ""}
                onChange={(e) =>
                  setEditData({ ...editData, brief: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiAward className="w-5 h-5 text-[#42D5AE]" />
              Skills
            </h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
                placeholder="Add a skill..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none"
              />
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-[#42D5AE] text-white rounded-lg hover:bg-[#38b28d] transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editData.skills.map((skill: string, index: number) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-gradient-to-r from-[#42D5AE]/10 to-[#38b28d]/10 border border-[#42D5AE]/30 rounded-lg text-gray-800 text-sm font-medium flex items-center gap-2 group"
                >
                  <Code className="w-4 h-4 text-[#42D5AE]" />
                  {skill}
                  <button
                    onClick={() => removeSkill(index)}
                    className="hover:bg-red-100 rounded-full p-1 transition-colors"
                  >
                    <X className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              ))}
              {editData.skills.length === 0 && (
                <p className="text-gray-500 text-sm">
                  No skills added yet. Add your first skill above.
                </p>
              )}
            </div>
          </div>

          {/* Social Accounts Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#42D5AE]" />
              Social Accounts
            </h3>
            <div className="space-y-2 mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  placeholder="Platform (e.g., github, linkedin)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none"
                />
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="URL"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none"
                />
                <button
                  onClick={addSocialAccount}
                  className="px-4 py-2 bg-[#42D5AE] text-white rounded-lg hover:bg-[#38b28d] transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {editData.socialAccounts.map((account: any, index: number) => {
                const Icon = getSocialIcon(account.platform);
                const colorClass = getSocialColor(account.platform);

                return (
                  <div key={index} className="relative group">
                    <div
                      className={`flex items-center justify-between gap-3 px-4 py-3 ${colorClass} text-white rounded-lg`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium capitalize">
                          {account.platform}
                        </span>
                      </div>
                      <button
                        onClick={() => removeSocialAccount(index)}
                        className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
              {editData.socialAccounts.length === 0 && (
                <p className="text-gray-500 text-sm col-span-2">
                  No social accounts added yet. Add your first account above.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t border-gray-200">
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default EditProfileModal;
