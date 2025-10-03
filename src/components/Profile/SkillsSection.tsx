import { FiAward } from "react-icons/fi";
import { MdOutlineCode } from "react-icons/md";
import { ISkill } from "../../interfaces";
import { FaCode } from "react-icons/fa";
import { VscSymbolNamespace } from "react-icons/vsc";

interface IProps {
  skills: ISkill[];
}
const SkillsSection = ({ skills }: IProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] rounded-lg">
          <FiAward className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Skills</h2>
      </div>

      {skills?.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <MdOutlineCode className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No skills added yet</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills?.map((skill, index) => (
            <div
              key={skill.id ?? index}
              className="px-3 py-1.5 bg-gradient-to-r from-[#42D5AE]/10 to-[#38b28d]/10 border border-[#42D5AE]/30 rounded-lg text-gray-800 text-sm font-medium flex items-center gap-2"
            >
              <VscSymbolNamespace className="w-5 h-5 text-[#42D5AE]" />
              {skill.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SkillsSection;
