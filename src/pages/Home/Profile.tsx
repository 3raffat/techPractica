import { useState } from "react";
import SkillsSection from "../../components/Profile/SkillsSection";
import SocialAccountsSection from "../../components/Profile/SocialAccountsSection";
import ProfileSessionCard from "../../components/Profile/ProfileSessionCard";
import EditProfileModal from "../../components/Profile/EditProfileModal";
import { LuFolderCode } from "react-icons/lu";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import { useAuthQuery } from "../../imports";
import { IProfileResponse, ISession, IUser } from "../../interfaces";
import { useSessionStorage } from "usehooks-ts";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const Navigate = useNavigate();
  const [token] = useSessionStorage("token", "");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    data: Data,
    isLoading,
    isSuccess,
  } = useAuthQuery<IProfileResponse>({
    queryKey: ["profile-data", token],
    url: "/profile/",
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const userInfo = Data?.data?.user;
  const session = Data?.data?.sessions!;

  console.log(isSuccess);

  return (
    <>
      {isSuccess ? (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Profile Header */}
            <ProfileHeader
              user={userInfo!}
              onEdit={() => setIsEditModalOpen(true)}
            />

            {/* Main Content - Two Column Layout */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Sidebar */}
              <div className="space-y-6">
                {/* Total Sessions Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] rounded-xl">
                      <LuFolderCode className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900">
                        {session?.totalItems ?? 0}
                      </p>
                      <p className="text-sm text-gray-600">Total Sessions</p>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <SkillsSection skills={userInfo?.skills!} />

                {/* Social Accounts Section */}
                <SocialAccountsSection
                  socialAccounts={userInfo?.socialAccounts!}
                />
              </div>

              {/* Right Content - Sessions */}

              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    My Sessions
                  </h2>
                </div>
                <div className="space-y-4">
                  {session?.sessions.map((session: ISession, index: number) => (
                    <ProfileSessionCard
                      key={session.id}
                      session={session}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Edit Profile Modal
      <AnimatePresence>
        {isEditModalOpen && (
          <EditProfileModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            user={user}
            onSave={handleSave}
          />
        )}
      </AnimatePresence> */}
        </div>
      ) : (
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
                Navigate("complete");
              }}
              className="bg-[#42D5AE] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#36b797] hover:shadow-lg transition-all"
            >
              Complete Profile
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default ProfilePage;
