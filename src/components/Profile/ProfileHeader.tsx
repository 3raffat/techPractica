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
    <div className="relative bg-gradient-to-br from-[#42D5AE] via-[#3fc9a0] to-[#38b28d] rounded-3xl shadow-2xl p-8 sm:p-10 text-white overflow-hidden border-2 border-white/20">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-24 -mb-24"></div>

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center text-[#42D5AE] text-5xl font-bold shadow-2xl ring-4 ring-white/30">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <h1 className="text-4xl sm:text-5xl font-bold">{displayName}</h1>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl shadow-lg">
                <BsCheckCircle className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white">
                  Profile Complete
                </span>
              </div>
            </div>
            <p className="flex items-center gap-2 text-white/90 text-lg mb-2 font-medium">
              <LuUser className="w-5 h-5" />@{user.name}
            </p>
            <p className="flex items-center gap-2 text-white/90 text-lg font-medium">
              <CiMail className="w-5 h-5" />
              {user.email}
            </p>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-6 py-3.5 bg-white text-[#42D5AE] rounded-xl hover:bg-gray-50 transition-all duration-200 font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
        >
          <FiEdit3 className="w-5 h-5" />
          Edit Profile
        </button>
      </div>

      {user.brief && (
        <div className="relative mt-8 pt-6 border-t-2 border-white/20 text-white/95 text-lg break-words leading-relaxed">
          <p>{user.brief}</p>
        </div>
      )}
    </div>
  );
}
export default ProfileHeader;
