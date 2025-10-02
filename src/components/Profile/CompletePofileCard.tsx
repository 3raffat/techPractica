import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
interface IProps {
  route: string;
}
const CompleteProfileCard = ({ route }: IProps) => {
  const Navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center transform transition-all hover:scale-105">
          <div className="flex justify-center mb-6">
            <div className="bg-[#42D5AE]/20 text-[#42D5AE] p-5 rounded-full text-4xl inline-flex items-center justify-center">
              <FaUserAlt />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-[#022639]">
            Complete Your Profile
          </h1>
          <p className="text-[#022639]/80 mb-8 text-base">
            Your profile is not complete yet. Complete it now to unlock all
            features and make the most of our platform.
          </p>
          <button
            onClick={() => {
              Navigate(route);
            }}
            className="bg-[#42D5AE] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#36b797] hover:shadow-lg transition-all"
          >
            Complete Profile
          </button>
        </div>
      </div>
    </>
  );
};
export default CompleteProfileCard;
