import { motion } from "framer-motion";

interface IProps {
  username: string;
  categoryName: string;
  brief: string;
}

const SessionCardReq = ({ username, categoryName, brief }: IProps) => {
  const cleaned = brief.replace(/^"(.*)"$/, "$1");

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
          },
        },
      }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.15 },
      }}
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 rounded-full bg-[#42D5AE] flex items-center justify-center">
            <span className="text-white font-semibold">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{username}</h3>
          </div>
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs bg-[#42D5AE]/10 text-[#022639] border border-[#42D5AE] rounded-full px-2 py-0.5 cursor-pointer"
        >
          {categoryName}
        </motion.span>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600"
      >
        <div
          className="text-gray-600 text-sm mb-4 sm:mb-6 [&_ol]:list-decimal [&_ol]:ml-5 [&_ul]:list-disc [&_ul]:ml-5 [&_li]:mb-1 break-words"
          dangerouslySetInnerHTML={{ __html: cleaned }}
        />
      </motion.p>
      <div className="flex justify-end gap-2 mt-4">
        <button className="px-3 py-1 text-sm text-white bg-[#42D5AE] rounded hover:bg-[#38b28d] ">
          Accept
        </button>
        <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100">
          Reject
        </button>
      </div>
    </motion.div>
  );
};

export default SessionCardReq;
