import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { KanbanBoarde } from "../../interfaces";
import { FaPlus } from "react-icons/fa";
import KanbanCard from "../Board/KanbanCard";
import { initialData } from "../Board/kanbanData";

const KanbanBoard = () => {
  const [board, setBoard] = React.useState<KanbanBoarde>(initialData);

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const sourceColumn = board.columns[source.droppableId];
    const destColumn = board.columns[destination.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks =
      source.droppableId === destination.droppableId
        ? sourceTasks
        : [...destColumn.tasks];
    const [removed] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, removed);
    const newBoard = {
      ...board,
      columns: {
        ...board.columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destTasks,
        },
      },
    };
    setBoard(newBoard);
  };

  return (
    <div className="relative  min-h-[860px]  ml-5 ">
      {/* Kanban Columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row gap-4 min-h-[860px] overflow-x-auto pb-4 md:pb-0">
          {board.columnOrder.map((columnId) => {
            const column = board.columns[columnId];
            return (
              <div
                key={column.id}
                className="flex-shrink-0 w-[90vw] xs:w-[350px] sm:w-[320px] md:w-[340px] lg:w-[360px] max-w-full"
              >
                <div className="bg-white rounded-lg shadow p-2 xs:p-3 md:p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-semibold text-gray-700 text-base">
                      {column.title}
                      <span className="text-xs text-gray-400 font-normal">
                        - {column.tasks.length.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <button
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-semibold flex items-center gap-1"
                      onClick={() => {}}
                    >
                      <FaPlus className="text-xs" /> Add Task
                    </button>
                  </div>
                  <Droppable droppableId={column.id}>
                    {(provided: any, snapshot: any) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex-1 min-h-[200px] flex flex-col ${
                          snapshot.isDraggingOver ? "bg-gray-50" : ""
                        } ${
                          column.tasks.length === 0
                            ? "border-2 border-dashed border-gray-200 rounded-lg"
                            : ""
                        }`}
                      >
                        {column.tasks.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided: any) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <KanbanCard task={task} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        {column.tasks.length === 0 && (
                          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                            Drop tasks here
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
