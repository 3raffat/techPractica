import { motion } from "framer-motion";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";

export function ProjectModal({
  isOpen,
  onClose,
  project,
}: {
  isOpen: boolean;
  onClose: () => void;
  project?: any;
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Frontend",
    technologies: [] as string[],
    visibility: "public",
    status: "draft",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        category: project.category,
        technologies: [...project.technologies],
        visibility: project.visibility,
        status: project.status,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        category: "Frontend",
        technologies: [],
        visibility: "public",
        status: "draft",
      });
    }
  }, [project, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    onClose();
  };

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
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#022639]">
              {project ? "Edit Project" : "Create New Project"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all"
              placeholder="Enter project name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all resize-none"
              placeholder="Describe your project"
            />
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              {"System Select"}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              {"Fields Select"}
            </div>
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Visibility
            </label>
            <div className="flex gap-4">{"Visibility radio buttom"}</div>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Technologies
            </label>
            <div className="flex gap-2 mb-3">{"Tech Select"}</div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white rounded-xl transition-all duration-300 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {project ? "Update Project" : "Create Project"}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
