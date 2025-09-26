import { useNavigate } from "react-router-dom";
import { CategoryType } from "../../data/data";

interface SessionUserType {
  sessionId: number;
  sessionName: string;
  sessionDescription: string;
  technologies: string[];
  system: CategoryType;
  openModal: () => void;
  openDeleteModal: () => void;
}
const SessionCardUser = ({
  sessionId,
  system,
  openModal,
  sessionDescription,
  sessionName,
  technologies,
  openDeleteModal,
}: SessionUserType) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex flex-col h-full w-full border border-gray-200 hover:shadow-md transition-shadow duration-200 relative">
      {/* Header Section */}
      <div className="flex justify-between items-start gap-2 mb-3">
        <h2 className="text-md font-semibold text-[#022639] flex-1">
          {sessionName}
        </h2>
        <span className="bg-[#42D5AE]/10 text-[#022639] border border-[#42D5AE] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap w-fit cursor-pointer">
          {system}
        </span>
      </div>

      {/* Description */}
      <div
        className="text-gray-600 text-sm mb-4 sm:mb-6 line-clamp-3 break-words"
        dangerouslySetInnerHTML={{ __html: sessionDescription }}
      />

      {/* Technologies Section */}
      <div className="flex flex-wrap gap-2 mb-12 sm:mb-10 max-h-7">
        {technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs bg-[#42D5AE]/10 text-[#022639] border border-[#42D5AE] whitespace-nowrap rounded-full  cursor-pointer"
          >
            {tech}
          </span>
        ))}
        {technologies.length > 4 && (
          <span className="px-3 py-1 text-xs bg-[#42D5AE]/10 text-[#022639] border border-[#42D5AE] rounded-full  cursor-pointer">
            +{technologies.length - 4}
          </span>
        )}
      </div>

      {/* Show More Button */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-4 sm:gap-6 justify-end">
        <button
          onClick={() => {
            openModal();
          }}
          className="text-sm font-medium text-gray-400 hover:text-[#38b28d]  transition-colors px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => {
            openDeleteModal();
          }}
          className="text-sm font-medium text-gray-400 hover:text-red-400 transition-colors px-2 py-1 rounded"
        >
          Delete
        </button>
        <button
          onClick={() => {
            navigate(`/Requests/${sessionId}`);
          }}
          className="text-sm font-medium text-gray-400 hover:text-[#38b28d]  transition-colors px-2 py-1 rounded"
        >
          Requests
        </button>
      </div>
    </div>
  );
};

export default SessionCardUser;
