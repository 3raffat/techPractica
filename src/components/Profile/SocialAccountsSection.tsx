import { CiGlobe } from "react-icons/ci";
import { getSocialColor, getSocialIcon } from "../../data/data";
import { ISocialAccount } from "../../interfaces";
interface IProps {
  socialAccounts: ISocialAccount[];
}
const SocialAccountsSection = ({ socialAccounts }: IProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] rounded-lg">
          <CiGlobe className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Social Accounts</h2>
      </div>

      {socialAccounts.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <CiGlobe className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No social accounts added yet</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {socialAccounts.map((account: ISocialAccount, index: number) => {
            const Icon = getSocialIcon(account.platform);
            const colorClass = getSocialColor(account.platform);

            return (
              <a
                key={index}
                href={account.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 ${colorClass} text-white rounded-lg transition-all shadow-sm hover:shadow-md text-sm`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium capitalize">
                  {account.platform}
                </span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default SocialAccountsSection;
