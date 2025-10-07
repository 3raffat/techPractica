import { motion } from "framer-motion";
import { container, item } from "../../data/data";
import { useAuthQuery } from "../../imports";
import { ISessionsResponse } from "../../interfaces";
import ExploreProjectCard from "../Cards/ExploreSessionCard";
import { useNavigate } from "react-router-dom";

export default function SessionGrid() {
  const router = useNavigate();

  const useExploreSessionx = () =>
    useAuthQuery<ISessionsResponse>({
      queryKey: [`SessionData-0`],
      url: `/sessions/?size=3&page=0`,
    });
  const Session = useExploreSessionx();
  const SessionData = Session.data?.data.sessions ?? [];
  const Sessionlength = Session.data?.data.sessions.length ?? 0;
  return (
    <>
      {Sessionlength >= 3 ? (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl md:text-6xl  font-bold text-gray-900 mb-8">
                Featured
                <span className="bg-gradient-to-r from-[#42D5AE] to-[#022639] bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover hands-on projects created by our community of learners
                and experts
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {SessionData.map((session, index) => (
                <motion.div key={index} variants={item}>
                  <ExploreProjectCard
                    project={session}
                    key={index}
                    onClick={() => router(`/projects/${session.id}`)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}
