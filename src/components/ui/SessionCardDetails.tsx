import { FaUser } from "react-icons/fa";
import { ISessionRes } from "../../interfaces.ts";
import { Button, CookiesService } from "../../imports.ts";
import { useNavigate } from "react-router-dom";
interface IProps {
  username: string | null;

  session: ISessionRes;
  closeModal: () => void;
  openModal: () => void;
}

const SessionCardDetails = ({
  session,
  closeModal,
  openModal,
  username,
}: IProps) => {
  const cleaned = session.sessionDescription.replace(/^"(.*)"$/, "$1");
  const navigation = useNavigate();
  const token = CookiesService.get("UserToken");

  return (
    <>
      {/* Role and Time */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <FaUser />
          <div className="flex  flex-wrap gap-2 mb-12 sm:mb-0 max-h-7 ">
            {session.categories.map((categories) => (
              <span
                key={categories}
                className=" text-[#022639] text-xs font-medium  py-1 cursor-pointer"
              >
                {categories}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-1">Description</h3>
        <div
          className="text-gray-600 text-sm mb-4 sm:mb-6 [&_ol]:list-decimal [&_ol]:ml-5 [&_ul]:list-disc [&_ul]:ml-5 [&_li]:mb-1 break-words"
          dangerouslySetInnerHTML={{ __html: cleaned }}
        />
      </div>
      {/* Tags */}
      <h4 className="font-semibold text-gray-800 mb-3">Tags</h4>
      <div className="flex flex-wrap gap-2 mb-12 sm:mb-0">
        {session.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs bg-[#42D5AE]/10 text-[#022639] border border-[#42D5AE] rounded-full cursor-pointer whitespace-nowrap"
          >
            {tech}
          </span>
        ))}
      </div>
      {/* Buttons */}
      <div className="flex mt-6 gap-4">
        <Button
          className="bg-[#42D5AE] hover:bg-[#38b28d] text-white font-medium transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
          width="w-full"
          disabled={username === session.ownerName}
          onClick={() => {
            token ? openModal() : navigation("/User");
          }}
        >
          {username === session.ownerName
            ? "You own this session"
            : "Apply now"}
        </Button>
        <Button
          className="bg-white border border-gray-300 !text-[#022639] hover:bg-gray-50 font-medium transition-colors duration-200 cursor-pointer"
          width="w-full"
          type="button"
          onClick={() => {
            closeModal();
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default SessionCardDetails;
