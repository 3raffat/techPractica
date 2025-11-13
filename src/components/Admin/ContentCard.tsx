import { motion } from "framer-motion";
import { IData } from "../../interfaces";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
interface IProps {
  data: IData;
  onEdit?: (data: IData) => void;
  onDelete: (id: string) => void;
}
const ContentCard = ({ data, onDelete, onEdit }: IProps) => {
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
              onClick={() => onEdit?.(data)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <FiEdit3 className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={() => onDelete(data.id)}
              className="p-2 rounded-xl hover:bg-red-50 transition-colors"
            >
              <FiTrash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default ContentCard;
