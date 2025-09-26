import { motion } from "framer-motion";
import Paginator from "./ui/Paginator";

const SessionPagination = ({
  page,
  pageCount,
  onClickNext,
  onClickPrev,
}: {
  page: number;
  pageCount: number;
  onClickNext: () => void;
  onClickPrev: () => void;
}) => {
  if (pageCount <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-10 flex justify-start"
    >
      <Paginator
        page={page}
        pageCount={pageCount}
        onClickNext={onClickNext}
        onClickPrev={onClickPrev}
      />
    </motion.div>
  );
};

export default SessionPagination;
