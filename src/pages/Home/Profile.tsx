import { useState } from "react";
import SkillsSection from "../../components/Profile/SkillsSection";
import SocialAccountsSection from "../../components/Profile/SocialAccountsSection";
import ProfileSessionCard from "../../components/Profile/ProfileSessionCard";
import { LuFolderCode } from "react-icons/lu";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import { useAuthQuery } from "../../imports";
import { IProfileResponse, ISessionResponseProfile } from "../../interfaces";
import CompleteProfileCard from "../../components/Profile/CompletePofileCard";
import NoSessions from "../../components/Sessions/NoSessions";
import { getToken } from "../../helpers/helpers";
import { AnimatePresence } from "framer-motion";
import EditProfileModal from "../../components/Profile/EditProfileModal";

const ProfilePage = () => {
  const token = getToken();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    data: Data,
    isSuccess,
    refetch,
  } = useAuthQuery<IProfileResponse>({
    queryKey: [`profile-data-${token}`],
    url: "/profile/",
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const userInfo = Data?.data?.user;
  const session = Data?.data?.sessions!;
  const fullName = [userInfo?.firstName, userInfo?.lastName]
    .filter(Boolean)
    .join(" ");

  console.log(fullName);
  return (
    <>
      {isSuccess ? (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
                <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-[#42D5AE] via-[#3fc9a0] to-[#38b28d] rounded-xl shadow-lg">
                      <LuFolderCode className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-[#022639]">
                        {session?.totalItems ?? 0}
                      </p>
                      <p className="text-sm text-gray-600 font-semibold">
                        Total Sessions
                      </p>
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
                  <h2 className="text-3xl font-bold text-[#022639] flex items-center gap-3">
                    <span className="h-1.5 w-12 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] rounded-full"></span>
                    My Sessions
                  </h2>
                </div>
                <div className="space-y-4">
                  {session.sessions.length === 0 ? (
                    <>
                      <NoSessions />
                    </>
                  ) : (
                    <>
                      {session?.sessions
                        .slice(0, 3)
                        .map(
                          (session: ISessionResponseProfile, index: number) => (
                            <ProfileSessionCard
                              key={session.id}
                              session={session}
                              index={index}
                              userFullName={fullName}
                            />
                          )
                        )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Edit Profile Modal */}
          <AnimatePresence>
            {isEditModalOpen && (
              <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={userInfo!}
                onUpdated={() => refetch()}
              />
            )}
          </AnimatePresence>
        </div>
      ) : (
        <CompleteProfileCard route="complete" />
      )}
    </>
  );
};
export default ProfilePage;
