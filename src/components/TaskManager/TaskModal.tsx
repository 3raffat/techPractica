import { motion } from "framer-motion";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { BsSave, BsX } from "react-icons/bs";
import MultiSelectField from "../ui/muiltselect";
import { IUserSession } from "../../interfaces";
import { taskTypes } from "../../data/data";
import MultiSelectStringField from "../ui/mult";
import axiosInstance from "../../config/axios.config";
import { getToken } from "../../helpers/helpers";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionMember: IUserSession[];
  sessionId: string;
  field: string[];
  onCreate: () => void;
}
export interface TaskRequest {
  sessionId: string;
  title: string;
  description: string;
  type: string;
  dueDate: string;
  assignees: string[];
  tags: string[];
}

export function TaskModal({
  isOpen,
  onClose,
  onCreate,
  sessionId,
  sessionMember,
  field,
}: TaskModalProps) {
  const methods = useForm<TaskRequest>({});
  const token = getToken();
  const onSubmit = async (formData: TaskRequest) => {
    try {
      const isoDate = new Date(
        formData.dueDate + "T13:33:44.185"
      ).toISOString();

      const payload = {
        ...formData,
        sessionId,
        dueDate: isoDate,
      };
      console.log("Task created:", payload);

      const res = await axiosInstance.post("/sessions/tasks/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Notify parent
      onCreate();
    } catch (error) {
      console.error("Error creating task:", error);
    }

    onClose();
  };

  if (!isOpen) return null;

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
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Task
            </h2>
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
              </div>
              <div>
                <MultiSelectStringField
                  name="tags"
                  label="tags"
                  options={field}
                />
              </div>
            </div>
            {/* Assignee and task label */}
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
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BsSave className="w-4 h-4" />
                Create Task{" "}
              </button>
            </div>
          </form>
        </FormProvider>
      </motion.div>
    </div>
  );
}
