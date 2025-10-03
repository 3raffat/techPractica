import { CiMail } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { IUser } from "../../interfaces";
import { BsCheckCircle } from "react-icons/bs";
interface IProps {
  user: IUser;
  onEdit: () => void;
}
function ProfileHeader({ user, onEdit }: IProps) {
  const displayName = user
    ? user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.name || "User"
    : "User";

  const initials = user
    ? user.firstName && user.lastName
      ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
      : user.name?.charAt(0).toUpperCase() || "U"
    : "U";

  return (
    <div className="bg-gradient-to-r from-[#42D5AE] to-[#38b28d] rounded-2xl shadow-lg p-8 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center text-[#42D5AE] text-4xl font-bold shadow-lg">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">{displayName}</h1>
              <div className="flex items-center gap-2 px-1 py-1 bg-green-100 border border-green-300 rounded-full">
                <BsCheckCircle className="w-5 h-5 text-green-600" />
              </div>{" "}
            </div>
            <p className="flex items-center gap-2 text-white/90 text-lg mb-1">
              <LuUser className="w-5 h-5" />@{user.name}
            </p>
            <p className="flex items-center gap-2 text-white/90 text-lg">
              <CiMail className="w-5 h-5" />
              {user.email}
            </p>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-6 py-3 bg-white text-[#42D5AE] rounded-lg hover:bg-gray-100 transition-colors font-semibold"
        >
          <FiEdit3 className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {user.brief && (
        <div className="mt-6 text-white/90 text-lg break-words">
          <p>{user.brief}</p>
        </div>
      )}
    </div>
  );
}
export default ProfileHeader;
