import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CiCircleAlert } from "react-icons/ci";
import { useDroppable } from "@dnd-kit/core";
import { SortableTaskCard } from "./SortableTaskCard";

export function DroppableColumn({
  column,
  tasks,
  onEdit,
  onView,
  onDelete,
  sessionMember,
  isSessionEnded,
}: any) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const taskIds = tasks.map((task: any) => task.id);

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-50 rounded-xl p-4 min-h-[600px] transition-all duration-200 ${
        isOver ? "bg-[#42D5AE]/10 ring-2 ring-[#42D5AE] ring-offset-2" : ""
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: column.color }}
          />
          <h3 className="font-semibold text-gray-900">{column.title}</h3>
          <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Tasks */}
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {tasks.map((task: any) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onView={onView}
              onDelete={onDelete}
              sessionMember={sessionMember}
              isSessionEnded={isSessionEnded}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <CiCircleAlert className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">Drop tasks here</p>
              <p className="text-xs mt-1">Drag and drop to move tasks</p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}
