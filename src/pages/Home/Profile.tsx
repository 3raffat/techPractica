import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SkillsSection from "../../components/Profile/SkillsSection";
import SocialAccountsSection from "../../components/Profile/SocialAccountsSection";
import ProfileSessionCard from "../../components/Profile/ProfileSessionCard";
import EditProfileModal from "../../components/Profile/EditProfileModal";
import { LuFolderCode } from "react-icons/lu";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import { useAuthQuery } from "../../imports";
import { IProfileResponse, ISession, ISessionsData } from "../../interfaces";
import { useSessionStorage } from "usehooks-ts";

const ProfilePage = () => {
  const [token] = useSessionStorage("token", "");
  const { data: Data } = useAuthQuery<IProfileResponse>({
    queryKey: ["profile-data"],
    url: "/profile/",
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const userInfo = Data?.data?.user;
  const session = Data?.data?.sessions!;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
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
            <SocialAccountsSection socialAccounts={userInfo?.socialAccounts} />
          </div>

          {/* Right Content - Sessions */}
          <div className="lg:col-span-2">
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
  );
};
export default ProfilePage;
