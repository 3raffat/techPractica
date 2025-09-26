import { CategoryType } from "../../data/data";
interface SessionUserType {
  sessionName: string;
  sessionDescription: string;
  technologies: string[];
  system: CategoryType;
  flag?: boolean;
  openModal: () => void;
  ownerName: string;
}
const SessionCard = ({
  system,
  openModal,
  sessionDescription,
  sessionName,
  technologies,
  flag = true,
  ownerName,
}: SessionUserType) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex flex-col h-full w-full border border-gray-200 hover:shadow-md transition-shadow duration-200 relative">
      {/* Header Section */}
      <div className="flex justify-between items-start gap-2 mb-3">
        <div className="flex-1">
          <h2 className="text-md font-semibold text-[#022639]">
            {sessionName}
          </h2>
          <p className="text-xs text-gray-500 mt-1">@{ownerName}</p>{" "}
          {/* Username added here */}
        </div>
        <span className="bg-[#42D5AE]/10 text-[#022639] border border-[#42D5AE] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap w-fit cursor-pointer">
          {system}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-gray-600 text-sm mb-4 sm:mb-6 line-clamp-2 break-words"
        dangerouslySetInnerHTML={{ __html: sessionDescription }}
      />

      {/* Technologies Section */}
      <div className="flex flex-wrap gap-2 mb-12 sm:mb-10 max-h-7">
        {technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs bg-[#42D5AE]/10 text-[#022639] border border-[#42D5AE] rounded-full cursor-pointer"
          >
            {tech}
          </span>
        ))}
        {technologies.length > 4 && (
          <span className="px-3 py-1 text-xs bg-[#42D5AE]/10 text-[#022639] border border-[#42D5AE] rounded-full cursor-pointer">
            +{technologies.length - 4}
          </span>
        )}
      </div>

      {/* Show More Button */}
      {flag && (
        <button
          onClick={() => {
            openModal();
          }}
          className="absolute bottom-4 right-4 flex items-center gap-1 text-sm font-medium text-[#022639] hover:text-[#022639] transition-colors group"
        >
          Show More
          <svg
            className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SessionCard;
