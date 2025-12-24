import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  DndContext,
  type DragStartEvent,
  type DragEndEvent,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { BsPlus, BsSearch, BsTrash2, BsX, BsCalendar } from "react-icons/bs";
import { TaskModal } from "./TaskModal";
import { EditTaskModal } from "./EditTaskModal";
import { FiEdit3 } from "react-icons/fi";
import { columns, taskTypes, getInitials } from "../../data/data";
import { IUserSession } from "../../interfaces";
import { DroppableColumn } from "./DroppableColumn";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getToken } from "../../helpers/helpers";
import { useQueryClient } from "@tanstack/react-query";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [viewingTask, setViewingTask] = useState<any>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [deletingTask, setDeletingTask] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const Navigate = useNavigate();
  const { session } = useLocation().state || {};
  const sessionMember = session?.users;
  const field = session?.requirements.map((req: any) => req.field);
  const { id } = useParams();
  const token = getToken();
  const queryClient = useQueryClient();

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      if (!id) {
        setError("Session ID is missing");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:8080/api/v1/sessions/tasks/`,
          {
            params: { sessionId: id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Assuming the response structure is { data: { tasks: [...] } }
        const fetchedTasks =
          response.data?.data?.tasks || response.data?.tasks || [];
        setTasks(fetchedTasks);
      } catch (err: any) {
        console.error("Error fetching tasks:", err);
        setError(err.response?.data?.message || "Failed to fetch tasks");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [id]);

  // Map API status to column IDs
  const mapStatusToColumnId = (status: string): string => {
    const statusMap: Record<string, string> = {
      TO_DO: "todo",
      IN_PROGRESS: "in-progress",
      REVIEWED: "review",
      DONE: "done",
      DELETED: "deleted",
    };
    return statusMap[status] || "todo";
  };

  // Map column IDs to API status
  const mapColumnIdToStatus = (columnId: string): string => {
    const columnMap: Record<string, string> = {
      todo: "TO_DO",
      "in-progress": "IN_PROGRESS",
      review: "REVIEWED",
      done: "DONE",
      deleted: "DELETED",
    };
    return columnMap[columnId] || "TO_DO";
  };

  // Filter tasks based on search and filters (exclude deleted tasks)
  const filteredTasks = tasks.filter((task) => {
    // Exclude deleted tasks from the board
    if (task.status === "DELETED") return false;

    // Search filter
    const matchesSearch =
      !searchTerm ||
      task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags?.some((tag: string) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Assignee filter
    const matchesAssignee =
      !selectedAssignee || task.assignees?.includes(selectedAssignee);

    // Type filter (case-insensitive)
    const matchesType =
      !selectedType || task.type?.toUpperCase() === selectedType.toUpperCase();

    return matchesSearch && matchesAssignee && matchesType;
  });

  // Group tasks by status
  const tasksByStatus = columns.reduce((acc, column) => {
    acc[column.id] = filteredTasks.filter(
      (task) => mapStatusToColumnId(task.status) === column.id
    );
    return acc;
  }, {} as Record<string, any[]>);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsCreateModalOpen(true);
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleViewTask = (task: any) => {
    setViewingTask(task);
  };

  const handleCreateTaskSubmit = () => {
    setIsCreateModalOpen(false);
    // Refetch tasks after creating a new one
    const fetchTasks = async () => {
      if (!id) return;
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/sessions/tasks/`,
          {
            params: { sessionId: id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedTasks =
          response.data?.data?.tasks || response.data?.tasks || [];
        setTasks(fetchedTasks);
      } catch (err) {
        console.error("Error refetching tasks:", err);
      }
    };
    fetchTasks();
  };

  const handleUpdateTask = () => {
    setIsEditModalOpen(false);
    setEditingTask(null);
    // Refetch tasks after updating
    const fetchTasks = async () => {
      if (!id) return;
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/sessions/tasks/`,
          {
            params: { sessionId: id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedTasks =
          response.data?.data?.tasks || response.data?.tasks || [];
        setTasks(fetchedTasks);
      } catch (err) {
        console.error("Error refetching tasks:", err);
      }
    };
    fetchTasks();
  };

  const handleDeleteTask = async (taskOrId: any) => {
    if (!id) {
      console.error("Session ID is missing");
      return;
    }

    // Extract taskId from task object or use it directly if it's a string
    const taskId = typeof taskOrId === "string" ? taskOrId : taskOrId?.id;

    if (!taskId) {
      console.error("Task ID is missing");
      return;
    }

    // If called from card, open confirmation modal
    if (typeof taskOrId === "object" && taskOrId.id) {
      setDeletingTask(taskOrId);
      return;
    }

    // If called from modal, proceed with deletion
    try {
      await axios.delete(`http://localhost:8080/api/v1/sessions/tasks/`, {
        data: {
          sessionId: id,
          taskId: taskId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Close modals
      setDeletingTask(null);
      setViewingTask(null);

      // Refetch tasks after deletion
      const fetchTasks = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/v1/sessions/tasks/`,
            {
              params: { sessionId: id },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const fetchedTasks =
            response.data?.data?.tasks || response.data?.tasks || [];
          setTasks(fetchedTasks);
        } catch (err) {
          console.error("Error refetching tasks:", err);
        }
      };
      fetchTasks();
    } catch (err: any) {
      console.error("Error deleting task:", err);
      alert(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((task) => task.id === activeId);
    if (!activeTask) return;

    // Determine the target column
    const targetColumn = columns.find((col) => col.id === overId);
    if (!targetColumn) {
      // If over is not a column, it might be another task - find its column
      const overTask = tasks.find((task) => task.id === overId);
      if (overTask) {
        const overColumnId = mapStatusToColumnId(overTask.status);
        const targetCol = columns.find((col) => col.id === overColumnId);
        if (targetCol) {
          await updateTaskStatus(activeId, targetCol.id);
        }
      }
      return;
    }

    // Check if the task is being moved to a different column
    const currentColumnId = mapStatusToColumnId(activeTask.status);
    if (targetColumn.id !== currentColumnId) {
      await updateTaskStatus(activeId, targetColumn.id);
    }
  };

  const updateTaskStatus = async (taskId: string, columnId: string) => {
    const newStatus = mapColumnIdToStatus(columnId);

    // Optimistically update the UI
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );

    // Update via API
    try {
      await axios.put(
        `http://localhost:8080/api/v1/sessions/tasks/${taskId}/update-status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refetch tasks to ensure consistency
      const response = await axios.get(
        `http://localhost:8080/api/v1/sessions/tasks/`,
        {
          params: { sessionId: id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchedTasks =
        response.data?.data?.tasks || response.data?.tasks || [];
      setTasks(fetchedTasks);
    } catch (err: any) {
      console.error("Error updating task status:", err);
      // Revert optimistic update on error
      const fetchTasks = async () => {
        if (!id) return;
        try {
          const response = await axios.get(
            `http://localhost:8080/api/v1/sessions/tasks/`,
            {
              params: { sessionId: id },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const fetchedTasks =
            response.data?.data?.tasks || response.data?.tasks || [];
          setTasks(fetchedTasks);
        } catch (error) {
          console.error("Error refetching tasks:", error);
        }
      };
      fetchTasks();
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedAssignee(null);
    setSelectedType(null);
  };

  // const activeTask = activeId
  //   ? tasks.find((task) => task.id === activeId)
  //   : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-4">
              {" "}
              <button
                onClick={() => Navigate("/workspace")}
                className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 transition"
                aria-label="Back to Project"
              >
                <FaArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to Workspace</span>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Task Management
                </h1>
                <p className="text-gray-600 mt-1">
                  Drag and drop tasks between columns to update their status
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateTask}
                className="bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <BsPlus className="w-4 h-4" />
                Create Task
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="relative flex-1 max-w-md">
              <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="flex gap-4 items-center flex-wrap">
              <select
                value={selectedAssignee || ""}
                onChange={(e) => setSelectedAssignee(e.target.value || null)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none bg-white text-sm min-w-[150px]"
              >
                <option value="">All Assignees</option>
                {sessionMember && sessionMember.length > 0 ? (
                  sessionMember.map((user: IUserSession) => (
                    <option key={user.id} value={user.id}>
                      {user.fullName}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No assignees available
                  </option>
                )}
              </select>

              <select
                value={selectedType || ""}
                onChange={(e) => setSelectedType(e.target.value || null)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none bg-white text-sm min-w-[150px]"
              >
                <option value="">All Types</option>
                {taskTypes.map((type) => (
                  <option key={type.id} value={type.id.toUpperCase()}>
                    {type.name}
                  </option>
                ))}
              </select>

              {(searchTerm || selectedAssignee || selectedType) && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors font-medium border border-gray-300"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#42D5AE]"></div>
              <p className="mt-4 text-gray-600">Loading tasks...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
              <h3 className="text-red-800 font-semibold mb-2">
                Error Loading Tasks
              </h3>
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Kanban Board - Only show when not loading and no error */}
        {!isLoading && !error && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {columns.map((column) => (
                <DroppableColumn
                  key={column.id}
                  column={column}
                  tasks={tasksByStatus[column.id] || []}
                  onEdit={handleEditTask}
                  onView={handleViewTask}
                  onDelete={handleDeleteTask}
                  sessionMember={sessionMember}
                />
              ))}
            </div>

            {/* <DragOverlay>
              {activeTask ? (
                <div className="bg-white rounded-xl border-2 border-[#42D5AE] p-4 shadow-2xl rotate-3 scale-105 opacity-90">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BsGripVertical className="w-4 h-4 text-[#42D5AE]" />
                      <div className="flex items-center gap-1">
                        {(() => {
                          const taskType = taskTypes.find(
                            (t) => t.id === activeTask.type
                          );
                          if (!taskType) return null;
                          const Icon = taskType.icon;
                          return (
                            <Icon
                              className="w-4 h-4"
                              style={{ color: taskType.color }}
                            />
                          );
                        })()}
                        <span className="text-xs font-medium text-gray-500">
                          {activeTask.id}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {activeTask.title}
                  </h3>
                </div>
              ) : null}
            </DragOverlay> */}
          </DndContext>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setDeletingTask(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <BsTrash2 className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Delete Task
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Are you sure you want to delete "
                    <strong>{deletingTask.title}</strong>"? This action cannot
                    be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDeleteTask(deletingTask.id)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Delete Task
                    </button>
                    <button
                      onClick={() => setDeletingTask(null)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Task Create Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <TaskModal
            isOpen={isCreateModalOpen}
            field={field}
            sessionId={id!}
            sessionMember={sessionMember}
            onClose={() => setIsCreateModalOpen(false)}
            onCreate={handleCreateTaskSubmit}
          />
        )}
      </AnimatePresence>

      {/* Task Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && editingTask && (
          <EditTaskModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingTask(null);
            }}
            task={editingTask}
            sessionId={id!}
            sessionMember={sessionMember}
            field={field}
            onUpdate={handleUpdateTask}
          />
        )}
      </AnimatePresence>

      {/* Task View Modal */}
      <AnimatePresence>
        {viewingTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setViewingTask(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {viewingTask.id?.slice(0, 8)}
                    </span>
                    {(() => {
                      const taskType = taskTypes.find(
                        (type) =>
                          type.id.toUpperCase() ===
                          viewingTask.type?.toUpperCase()
                      );
                      const TaskTypeIcon = taskType?.icon;
                      return (
                        <span
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 capitalize"
                          style={{
                            backgroundColor: taskType
                              ? `${taskType.color}15`
                              : "#E5E7EB",
                            color: taskType?.color || "#6B7280",
                          }}
                        >
                          {TaskTypeIcon && (
                            <TaskTypeIcon className="w-3.5 h-3.5" />
                          )}
                          {viewingTask.type || "Task"}
                        </span>
                      );
                    })()}
                    {(() => {
                      const statusMap: Record<
                        string,
                        { color: string; bg: string }
                      > = {
                        TO_DO: { color: "#6B7280", bg: "#F3F4F6" },
                        IN_PROGRESS: { color: "#3B82F6", bg: "#DBEAFE" },
                        REVIEWED: { color: "#F59E0B", bg: "#FEF3C7" },
                        DONE: { color: "#10B981", bg: "#D1FAE5" },
                      };
                      const statusStyle =
                        statusMap[viewingTask.status] || statusMap.TO_DO;
                      return (
                        <span
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg capitalize"
                          style={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                          }}
                        >
                          {viewingTask.status?.replace("_", " ") || "To Do"}
                        </span>
                      );
                    })()}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        handleEditTask(viewingTask);
                        setViewingTask(null);
                      }}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Edit task"
                    >
                      <FiEdit3 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setViewingTask(null)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <BsX className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content - Two Column Layout */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Side - Title, Description, Tags */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {viewingTask.title}
                      </h2>
                    </div>

                    {/* Description */}
                    {viewingTask.description && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-[#42D5AE] rounded-full"></span>
                          Description
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200 wrap-break-word">
                          {viewingTask.description ||
                            "No description provided."}
                        </p>
                      </div>
                    )}

                    {/* Tags */}
                    {viewingTask.tags && viewingTask.tags.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-[#42D5AE] rounded-full"></span>
                          Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {viewingTask.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 text-xs font-medium bg-[#42D5AE]/10 text-[#38b28d] rounded-lg border border-[#42D5AE]/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Side - Task Details */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-1 h-4 bg-[#42D5AE] rounded-full"></span>
                      Task Details
                    </h3>
                    <div className="space-y-4">
                      {/* Status */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="text-xs font-medium text-gray-500 block mb-2">
                          Status
                        </span>
                        {(() => {
                          const statusMap: Record<
                            string,
                            { color: string; bg: string }
                          > = {
                            TO_DO: { color: "#6B7280", bg: "#F3F4F6" },
                            IN_PROGRESS: { color: "#3B82F6", bg: "#DBEAFE" },
                            REVIEWED: { color: "#F59E0B", bg: "#FEF3C7" },
                            DONE: { color: "#10B981", bg: "#D1FAE5" },
                          };
                          const statusStyle =
                            statusMap[viewingTask.status] || statusMap.TO_DO;
                          return (
                            <span
                              className="inline-block px-3 py-1.5 text-sm font-semibold rounded-lg capitalize"
                              style={{
                                backgroundColor: statusStyle.bg,
                                color: statusStyle.color,
                              }}
                            >
                              {viewingTask.status?.replace("_", " ") || "To Do"}
                            </span>
                          );
                        })()}
                      </div>

                      {/* Type */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="text-xs font-medium text-gray-500 block mb-1">
                          Type
                        </span>
                        {(() => {
                          const taskType = taskTypes.find(
                            (type) =>
                              type.id.toUpperCase() ===
                              viewingTask.type?.toUpperCase()
                          );
                          const TaskTypeIcon = taskType?.icon;
                          return (
                            <span
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg capitalize"
                              style={{
                                backgroundColor: taskType
                                  ? `${taskType.color}15`
                                  : "#F3F4F6",
                                color: taskType?.color || "#6B7280",
                              }}
                            >
                              {TaskTypeIcon && (
                                <TaskTypeIcon className="w-4 h-4" />
                              )}
                              {viewingTask.type || "Task"}
                            </span>
                          );
                        })()}
                      </div>

                      {/* Due Date */}
                      {viewingTask.dueDate && (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <span className="text-xs font-medium text-gray-500 block mb-2">
                            Due Date
                          </span>
                          <div className="flex items-center gap-2">
                            <BsCalendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">
                              {new Date(viewingTask.dueDate).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          {(() => {
                            const due = new Date(viewingTask.dueDate);
                            const today = new Date();
                            const diffTime = due.getTime() - today.getTime();
                            const diffDays = Math.ceil(
                              diffTime / (1000 * 60 * 60 * 24)
                            );
                            if (diffDays < 0) {
                              return (
                                <span className="text-xs text-red-600 font-medium mt-2 block">
                                  Overdue by {Math.abs(diffDays)} day
                                  {Math.abs(diffDays) !== 1 ? "s" : ""}
                                </span>
                              );
                            } else if (diffDays <= 3) {
                              return (
                                <span className="text-xs text-orange-600 font-medium mt-2 block">
                                  Due in {diffDays} day
                                  {diffDays !== 1 ? "s" : ""}
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      )}

                      {/* Assignees */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="text-xs font-medium text-gray-500 block mb-2">
                          Assignees
                        </span>
                        {(() => {
                          const getAssigneeNames = (assigneeIds: string[]) => {
                            if (!sessionMember || !assigneeIds) return [];
                            return assigneeIds
                              .map((id) =>
                                sessionMember.find(
                                  (member: IUserSession) => member.id === id
                                )
                              )
                              .filter(Boolean)
                              .map((member: IUserSession) => member.fullName);
                          };
                          const assigneeNames = getAssigneeNames(
                            viewingTask.assignees || []
                          );
                          if (assigneeNames.length === 0) {
                            return (
                              <span className="text-sm text-gray-500 italic">
                                Unassigned
                              </span>
                            );
                          }
                          return (
                            <div className="flex flex-col gap-2">
                              {assigneeNames.map(
                                (name: string, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200"
                                  >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#42D5AE] to-[#38b28d] flex items-center justify-center text-white text-xs font-semibold">
                                      {getInitials(name)}
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                      {name}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
