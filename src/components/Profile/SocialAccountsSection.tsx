import { CiGlobe } from "react-icons/ci";
import { getSocialColor, getSocialIcon } from "../../data/data";
import { ISocialAccount } from "../../interfaces";
import { motion } from "framer-motion";

interface IProps {
  socialAccounts: ISocialAccount[];
}

const SocialAccountsSection = ({ socialAccounts }: IProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-[#42D5AE] via-[#3fc9a0] to-[#38b28d] rounded-xl shadow-lg">
          <CiGlobe className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#022639]">Social Accounts</h2>
      </div>

      {socialAccounts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <CiGlobe className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm font-medium">No social accounts added yet</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {socialAccounts.map((account: ISocialAccount, index: number) => {
            const Icon = getSocialIcon(account.platform);
            const colorClass = getSocialColor(account.platform);

            return (
              <motion.a
                key={index}
                href={account.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 px-5 py-2.5 ${colorClass} text-white rounded-xl transition-all shadow-lg hover:shadow-xl text-sm font-semibold`}
              >
                <Icon className="w-4 h-4" />
                <span className="capitalize">{account.platform}</span>
              </motion.a>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default SocialAccountsSection;
