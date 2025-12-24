import { motion } from "framer-motion";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { BsSave, BsX } from "react-icons/bs";
import MultiSelectField from "../ui/muiltselect";
import { IUserSession } from "../../interfaces";
import { taskTypes } from "../../data/data";
import MultiSelectStringField from "../ui/mult";
import axiosInstance from "../../config/axios.config";
import { getToken } from "../../helpers/helpers";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: any | null;
  sessionId: string;
  sessionMember: IUserSession[];
  field: string[];
  onUpdate: () => void;
}

export interface TaskUpdateRequest {
  sessionId: string;
  taskId: string;
  title: string;
  description: string;
  type: string;
  dueDate: string;
  assignees: string[];
  tags: string[];
}

export function EditTaskModal({
  isOpen,
  onClose,
  task,
  sessionId,
  sessionMember,
  field,
  onUpdate,
}: EditTaskModalProps) {
  const methods = useForm<TaskUpdateRequest>({});
  const token = getToken();

  useEffect(() => {
    if (task && isOpen) {
      // Format dueDate from ISO string to date input format (YYYY-MM-DD)
      const dueDate = task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "";

      methods.reset({
        sessionId: sessionId,
        taskId: task.id,
        title: task.title || "",
        description: task.description || "",
        type: task.type?.toLowerCase() || "feature",
        dueDate: dueDate,
        assignees: task.assignees || [],
        tags: task.tags || [],
      });
    }
  }, [task, isOpen, sessionId, methods]);

  const onSubmit = async (formData: TaskUpdateRequest) => {
    if (!task) return;

    try {
      // Convert date to ISO string
      const isoDate = formData.dueDate
        ? new Date(formData.dueDate + "T13:33:44.185").toISOString()
        : "";

      const payload = {
        sessionId: sessionId,
        taskId: task.id,
        title: formData.title,
        description: formData.description,
        type: formData.type.toUpperCase(),
        dueDate: isoDate,
        assignees: formData.assignees,
        tags: formData.tags,
      };

      await axiosInstance.put("/sessions/tasks/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Notify parent to refetch tasks
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Edit Task</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <BsX className="w-5 h-5" />
            </button>
          </div>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="p-6 space-y-6"
          >
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <Controller
                name="title"
                control={methods.control}
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all"
                    placeholder="Enter task title"
                  />
                )}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <Controller
                name="description"
                control={methods.control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Describe the task"
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {sessionMember?.length! > 0 && (
                  <MultiSelectField<IUserSession>
                    options={sessionMember!}
                    label="Assignees"
                    name="assignees"
                    getLabel={(x) => x.fullName}
                    getValue={(x) => x.id}
                  />
                )}
              </div>
              <div>
                <MultiSelectStringField
                  name="tags"
                  label="tags"
                  options={field}
                />
              </div>
            </div>

            {/* Type and Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type
                </label>
                <Controller
                  name="type"
                  rules={{ required: "Type is required" }}
                  control={methods.control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all"
                    >
                      {taskTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Due Date
                </label>
                <Controller
                  name="dueDate"
                  control={methods.control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all"
                    />
                  )}
                />
              </div>
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
                disabled={methods.formState.isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BsSave className="w-4 h-4" />
                {methods.formState.isSubmitting ? "Saving..." : "Update Task"}
              </button>
            </div>
          </form>
        </FormProvider>
      </motion.div>
    </div>
  );
}
