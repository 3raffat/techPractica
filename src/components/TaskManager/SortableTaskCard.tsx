import { useSortable } from "@dnd-kit/sortable";
import { BsCalendar, BsGripVertical, BsTrash2 } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { taskTypes, getInitials } from "../../data/data";
import { IUserSession } from "../../interfaces";

export function SortableTaskCard({
  task,
  onEdit,
  onView,
  onDelete,
  sessionMember,
}: any) {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: task.id,
  });

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDue = getDaysUntilDue(task.dueDate);
  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;

  // Get task type info
  const taskType = taskTypes.find(
    (type) => type.id.toUpperCase() === task.type?.toUpperCase()
  );
  const TaskTypeIcon = taskType?.icon;

  // Map assignee IDs to user names
  const getAssigneeNames = (assigneeIds: string[]) => {
    if (!sessionMember || !assigneeIds) return [];
    return assigneeIds
      .map((id) =>
        sessionMember.find((member: IUserSession) => member.id === id)
      )
      .filter(Boolean)
      .map((member: IUserSession) => member.fullName);
  };

  const assigneeNames = getAssigneeNames(task.assignees || []);

  return (
    <div
      ref={setNodeRef}
      className={`bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm hover:shadow-lg transition-all duration-200 cursor-move group ${
        isDragging
          ? "opacity-50 rotate-2 scale-105 shadow-2xl z-50 border-[#42D5AE]"
          : ""
      }`}
      onClick={() => onView(task)}
      {...attributes}
      {...listeners}
    >
      {/* Drag Handle */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BsGripVertical className="w-4 h-4 text-gray-400 group-hover:text-[#42D5AE] transition-colors" />
          <span className="text-xs font-medium text-gray-500">
            {task.id?.slice(0, 6)}
          </span>
          {taskType && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-md capitalize"
              style={{
                backgroundColor: `${taskType.color}15`,
                color: taskType.color,
              }}
            >
              {TaskTypeIcon && <TaskTypeIcon className="w-3 h-3" />}
              {taskType.name}
            </span>
          )}
        </div>
        {/* Added delete button with dropdown menu */}
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-all">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            title="Edit task"
          >
            <FiMoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task); // Call onDelete with the task object
            }}
            className="p-1 rounded hover:bg-red-50 transition-colors"
            title="Delete task"
          >
            <BsTrash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
        {task.title}
      </h3>

      {/* Description preview */}
      {task.description && (
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-[#42D5AE]/10 text-[#38b28d] rounded-md font-medium border border-[#42D5AE]/20"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-md font-medium">
              +{task.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* Assignees */}
          {assigneeNames.length > 0 && (
            <div className="flex items-center gap-1.5 -space-x-2">
              {assigneeNames.slice(0, 3).map((name: string, index: number) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-[#42D5AE] to-[#38b28d] flex items-center justify-center text-white text-xs font-semibold border-2 border-white shadow-sm"
                  title={name}
                >
                  {getInitials(name)}
                </div>
              ))}
              {assigneeNames.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-semibold border-2 border-white shadow-sm">
                  +{assigneeNames.length - 3}
                </div>
              )}
            </div>
          )}

          {/* Due Date */}
          {task.dueDate && (
            <div className="flex items-center gap-1 ml-auto">
              <BsCalendar className="w-3 h-3 text-gray-400" />
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  isOverdue
                    ? "text-red-600"
                    : isDueSoon
                    ? "text-orange-600"
                    : "text-gray-500"
                }`}
              >
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
