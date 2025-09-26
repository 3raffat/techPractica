import { motion } from "framer-motion";
import SessionCard from "./SessionCard";
import { ISessionRes } from "../../interfaces";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const SessionList = ({
  sessions,
  onOpen,
}: {
  sessions: ISessionRes[];
  onOpen: (session: ISessionRes) => void;
}) => {
  if (!sessions.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-1 flex items-center justify-center"
      >
        <p className="text-gray-500 text-center">
          No sessions found matching your criteria
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          openModal={() => onOpen(session)}
          {...session}
        />
      ))}
    </motion.div>
  );
};

export default SessionList;
