import { motion } from "framer-motion";
import { IData } from "../../interfaces";
import { FaEdit, FaTrash } from "react-icons/fa";
interface IProps {
  data: IData;
}
const ContentCard = ({ data }: IProps) => {
  return (
    <>
      <motion.div
        key={data.id}
        whileHover={{ y: -4, scale: 1.01 }}
        className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-[#42D5AE]/30 transition-all bg-gradient-to-br from-white to-gray-50/50"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h5 className="font-bold text-gray-900 text-lg">{data.name}</h5>
            {/* <span className="text-xs text-gray-500 font-medium">
              {tech.category}
            </span> */}
          </div>
          <div className="flex items-center gap-1">
            <button
              // onClick={() => onEditTechnology(tech)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <FaEdit className="w-4 h-4 text-gray-500" />
            </button>
            <button
              // onClick={() => onDeleteTechnology(tech.id)}
              className="p-2 rounded-xl hover:bg-red-50 transition-colors"
            >
              <FaTrash className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default ContentCard;
