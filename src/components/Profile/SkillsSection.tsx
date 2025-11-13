import { FiAward } from "react-icons/fi";
import { MdOutlineCode } from "react-icons/md";
import { ISkill } from "../../interfaces";
import { VscSymbolNamespace } from "react-icons/vsc";
import { motion } from "framer-motion";

interface IProps {
  skills: ISkill[];
}
const SkillsSection = ({ skills }: IProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-[#42D5AE] via-[#3fc9a0] to-[#38b28d] rounded-xl shadow-lg">
          <FiAward className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#022639]">Skills</h2>
      </div>

      {skills?.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <MdOutlineCode className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm font-medium">No skills added yet</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {skills?.map((skill, index) => (
            <motion.div
              key={skill.id ?? index}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-gradient-to-r from-[#42D5AE]/15 to-[#42D5AE]/10 border-2 border-[#42D5AE]/30 rounded-xl text-[#022639] text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <VscSymbolNamespace className="w-5 h-5 text-[#42D5AE]" />
              {skill.name}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SkillsSection;
