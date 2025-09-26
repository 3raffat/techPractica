import { FaGithub, FaLinkedin, FaCode, FaPaperPlane } from "react-icons/fa";
import { skills } from "../../data/data";
import { CookiesService, useAuthQuery } from "../../imports";
import { ISessionRes } from "../../interfaces";
import SessionCard from "../../components/ui/SessionCard";
import user from "../../assets/user.png";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const token = CookiesService.get("UserToken");

  const socialLinks = [
    { icon: <FaGithub size={18} />, url: "" },
    { icon: <FaLinkedin size={18} />, url: "" },
  ];
  const { data: sessionData } = useAuthQuery({
    queryKey: [`SessionData-1`],
    url: `/sessions/users?pageSize=12&pageNumber=0`,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const Data = sessionData?.sessions.map(
    ({
      system,
      sessionDescription,
      sessionName,
      technologies,
      id,
      ownerName,
    }: ISessionRes) => (
      <SessionCard
        ownerName={ownerName}
        flag={false}
        openModal={() => {}}
        system={system}
        sessionDescription={sessionDescription}
        sessionName={sessionName}
        technologies={technologies}
        key={id}
      />
    )
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-screen flex items-center justify-center bg-gradient-to-br from-[#38b28d] to-[#42D5AE]"
        >
          <div className="absolute inset-0 bg-black/20"></div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mx-auto w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden mb-6"
            >
              <img
                src={user}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-3"
            >
              Mohammad Arafat
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-white/90 mb-8"
            >
              Full Stack Developer & JavaScript Expert
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-4 mb-10"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all"
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-[#022639] rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2 mx-auto"
            >
              <FaPaperPlane /> Contact Me
            </motion.button>
          </motion.div>
        </motion.div>

        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20 px-4 max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#022639] mb-8 text-center"
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-gray-600 leading-relaxed mb-6">
                I'm a passionate developer with expertise in modern JavaScript
                frameworks and cloud technologies. I specialize in building
                scalable, performant web applications with clean, maintainable
                code.
              </p>
              <p className="text-gray-600 leading-relaxed">
                My approach combines technical excellence with user-focused
                design, creating solutions that are both powerful and intuitive.
                I thrive in collaborative environments and enjoy solving complex
                problems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-[#022639] mb-4 flex items-center gap-2">
                <FaCode className="text-[#42D5AE]" /> Technical Skills
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-[#42D5AE]/10 text-[#022639] rounded-full font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Showcase */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20 bg-gray-100"
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-[#022639] mb-12 text-center"
            >
              My Projects
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {Data}
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default ProfilePage;
