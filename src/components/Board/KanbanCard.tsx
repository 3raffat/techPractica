// "use client";

// import type React from "react";
// import { MessageCircle } from "lucide-react";

// // Mock interfaces - replace with your actual imports
// interface User {
//   id: string;
//   name: string;
//   avatar?: string;
// }

// interface Task {
//   id: string;
//   title: string;
//   content: string;
//   createdAt: string;
//   dueDate?: string;
//   tags?: string[];
//   comments?: number;
//   users?: User[];
// }

// interface KanbanCardProps {
//   task: Task;
// }

// // Mock user image - replace with your actual import
// const userImgg = "/placeholder.svg?height=24&width=24&text=U";

// const KanbanCard: React.FC<KanbanCardProps> = ({ task }) => {
//   let daysLeft = "";
//   let isOverdue = false;

//   if (task.dueDate) {
//     const due = new Date(task.dueDate);
//     const now = new Date();
//     const diff = Math.ceil(
//       (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
//     );

//     if (diff > 0) {
//       daysLeft = `${diff} days left`;
//     } else if (diff === 0) {
//       daysLeft = "Due today";
//     } else {
//       daysLeft = "Overdue";
//       isOverdue = true;
//     }
//   }

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 mb-4 cursor-grab active:cursor-grabbing hover:border-gray-300 group">
//       <div className="flex flex-col h-full">
//         {/* Header with dates */}
//         <div className="flex justify-between items-start text-xs text-gray-500 mb-3">
//           <span className="font-medium">Created {task.createdAt}</span>
//           {task.dueDate && (
//             <span
//               className={`font-semibold px-2 py-1 rounded-md ${
//                 isOverdue
//                   ? "text-red-600 bg-red-50"
//                   : "text-gray-600 bg-gray-100"
//               }`}
//             >
//               {daysLeft}
//             </span>
//           )}
//         </div>

//         {/* Tags */}
//         {task.tags && task.tags.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-4">
//             {task.tags.map((tag, idx) => (
//               <span
//                 key={idx}
//                 className="px-3 py-1.5 text-xs bg-[#42D5AE]/10 text-[#022639] border border-[#42D5AE] rounded-lg cursor-pointer hover:bg-[#42D5AE]/20 transition-colors duration-200 font-medium"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Content */}
//         <div className="flex-1 mb-4">
//           <h3 className="font-bold text-gray-900 text-base mb-3 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
//             {task.title}
//           </h3>
//           <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
//             {task.content}
//           </p>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-center pt-3 border-t border-gray-100">
//           {/* Comments */}
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors duration-200">
//               <MessageCircle className="w-4 h-4" />
//               <span className="text-sm font-semibold">
//                 {task.comments?.toString().padStart(2, "0") || "00"}
//               </span>
//             </div>
//           </div>

//           {/* User Avatars */}
//           <div className="flex items-center">
//             {task.users && task.users.length > 0 ? (
//               <div className="flex -space-x-2">
//                 {task.users.slice(0, 3).map((user, idx) => (
//                   <div
//                     key={user.id}
//                     className="relative group/avatar"
//                     style={{ zIndex: 10 - idx }}
//                   >
//                     <img
//                       src={user.avatar || userImgg}
//                       alt={user.name}
//                       className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform duration-200 cursor-pointer"
//                     />
//                     {/* Tooltip */}
//                     <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
//                       {user.name}
//                     </div>
//                   </div>
//                 ))}
//                 {task.users.length > 3 && (
//                   <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600 shadow-sm">
//                     +{task.users.length - 3}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
//                 <span className="text-gray-400 text-xs">?</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KanbanCard;
