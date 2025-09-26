import { useParams } from "react-router-dom";
import { CookiesService, useAuthQuery } from "../../imports";
import SessionCardReq from "../../components/ui/SessionCardReq";
import { motion } from "framer-motion";

interface IProps {}

const SessionRequests = ({}: IProps) => {
  const token = CookiesService.get("UserToken");

  const { id } = useParams();
  const { data } = useAuthQuery({
    queryKey: ["RrqData"],
    url: `/sessions/${id}/request`,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const SessionReqRendar = data?.map(
    ({
      brief,
      categoryName,
      username,
    }: {
      username: string;
      categoryName: string;
      brief: string;
    }) => (
      <SessionCardReq
        brief={brief}
        categoryName={categoryName}
        username={username}
        key={username}
      />
    )
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-[#022639] mb-5"
          >
            Session Requests
          </motion.h1>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {SessionReqRendar}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default SessionRequests;
