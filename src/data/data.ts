import { AxiosResponse } from "axios";
import { IconType } from "react-icons";
import {
  FaBookOpen,
  FaBullseye,
  FaUsers,
  FaTrophy,
  FaBolt,
  FaLink,
} from "react-icons/fa";
import {
  FaCode,
  FaShieldAlt,
  FaMobileAlt,
  FaTools,
  FaRobot,
  FaGamepad,
  FaBug,
  FaProjectDiagram,
} from "react-icons/fa";
import { Variants } from "framer-motion";
import { IFloatingShape, IGeometricShape, SocialPlatform } from "../interfaces";
import { LuMonitor } from "react-icons/lu";
export interface Feature {
  title: string;
  description: string;
  Icon: IconType;
  style: string;
}
/*-------------------------------------------------------------------------------------------------- */

export const features: Feature[] = [
  {
    title: "Real-world Projects",
    description:
      "Let students apply knowledge in hands-on scenarios that simulate real job challenges.",
    Icon: FaProjectDiagram,
    style: "text-blue-600 w-6 h-6",
  },
  {
    title: "Skill Evaluation",
    description:
      "Assess technical and soft skills effectively through tailored projects and tasks.",
    Icon: FaTools,
    style: "text-yellow-500 w-6 h-6",
  },

  {
    title: "Progress Tracking",
    description:
      "Monitor student development and project completion status with detailed analytics.",
    Icon: FaBug,
    style: "text-gray-700 w-6 h-6",
  },
];

/*-------------------------------------------------------------------------------------------------- */
export const floatingShapes: IFloatingShape[] = [
  {
    delay: 0,
    duration: 25,
    size: 250,
    color: "#42D5AE",
    opacity: 0.2,
    x: 10,
    y: 20,
  },
  {
    delay: 5,
    duration: 30,
    size: 180,
    color: "#022639",
    opacity: 0.15,
    x: 80,
    y: 10,
  },
  {
    delay: 10,
    duration: 20,
    size: 150,
    color: "#42D5AE",
    opacity: 0.18,
    x: 70,
    y: 70,
  },
  {
    delay: 15,
    duration: 35,
    size: 200,
    color: "#022639",
    opacity: 0.12,
    x: 20,
    y: 80,
  },
  {
    delay: 8,
    duration: 28,
    size: 120,
    color: "#42D5AE",
    opacity: 0.25,
    x: 90,
    y: 50,
  },
  {
    delay: 12,
    duration: 32,
    size: 160,
    color: "#38b28d",
    opacity: 0.15,
    x: 50,
    y: 30,
  },
];

export const geometricShapes: IGeometricShape[] = [
  {
    delay: 0,
    duration: 20,
    size: 100,
    rotation: 0,
    x: 15,
    y: 15,
  },
  {
    delay: 5,
    duration: 25,
    size: 80,
    rotation: 45,
    x: 85,
    y: 25,
  },
  {
    delay: 10,
    duration: 18,
    size: 90,
    rotation: 90,
    x: 75,
    y: 75,
  },
  {
    delay: 15,
    duration: 22,
    size: 70,
    rotation: 135,
    x: 25,
    y: 85,
  },
  {
    delay: 8,
    duration: 28,
    size: 60,
    rotation: 180,
    x: 60,
    y: 40,
  },
];

export const floatingShapesBackground: IFloatingShape[] = [
  {
    delay: 0,
    duration: 40,
    size: 350,
    color: "#42D5AE",
    opacity: 0.08,
    x: -10,
    y: 30,
  },
  {
    delay: 20,
    duration: 35,
    size: 280,
    color: "#022639",
    opacity: 0.06,
    x: 90,
    y: 60,
  },
];

export const geometricShapesBackground: IGeometricShape[] = [
  {
    delay: 10,
    duration: 30,
    size: 120,
    rotation: 0,
    x: 20,
    y: 20,
  },
  {
    delay: 25,
    duration: 35,
    size: 100,
    rotation: 45,
    x: 80,
    y: 80,
  },
];

export const floatingShapesFeatures: IFloatingShape[] = [
  {
    delay: 10,
    duration: 45,
    size: 450,
    color: "#42D5AE",
    opacity: 0.06,
    x: 70,
    y: 20,
  },
  {
    delay: 25,
    duration: 38,
    size: 250,
    color: "#022639",
    opacity: 0.08,
    x: 10,
    y: 70,
  },
];

export const geometricShapesFeatures: IGeometricShape[] = [
  {
    delay: 5,
    duration: 30,
    size: 120,
    rotation: 0,
    x: 80,
    y: 10,
  },
  {
    delay: 15,
    duration: 25,
    size: 100,
    rotation: 45,
    x: 20,
    y: 20,
  },
  {
    delay: 30,
    duration: 35,
    size: 80,
    rotation: 90,
    x: 50,
    y: 80,
  },
];

/*-------------------------------------------------------------------------------------------------- */
export const featuress = [
  {
    icon: FaBookOpen,
    title: "Hands-on Projects",
    description:
      "Build real-world applications with step-by-step guidance and industry best practices.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: FaBullseye,
    title: "Skill Assessment",
    description:
      "Track your progress with comprehensive assessments and personalized learning paths.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: FaUsers,
    title: "Community Support",
    description:
      "Connect with fellow learners and experienced mentors in our vibrant community.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: FaTrophy,
    title: "Certifications",
    description:
      "Earn recognized certificates to showcase your skills to potential employers.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    icon: FaBolt,
    title: "Interactive Learning",
    description:
      "Engage with interactive coding challenges and real-time feedback systems.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: FaCode,
    title: "Industry Tools",
    description:
      "Learn using the same tools and technologies used by top tech companies.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
];
/*-------------------------------------------------------------------------------------------------- */
export type CategoryType =
  | "Web Development"
  | "Cybersecurity"
  | "Game Development"
  | "Artificial Intelligence"
  | "Mobile Development";

interface ICategory {
  title: CategoryType;
  Icon: IconType;
  color: string;
  bgColor: string;
  hoverBg: string;
}

export const categoriess = [
  {
    title: "Web ",
    Icon: FaCode,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    hoverBg: "group-hover:bg-blue-100",
  },
  {
    title: "Cybersecurity",
    Icon: FaShieldAlt,
    color: "text-red-500",
    bgColor: "bg-red-50",
    hoverBg: "group-hover:bg-red-100",
  },
  {
    title: "Mobile ",
    Icon: FaMobileAlt,
    color: "text-green-500",
    bgColor: "bg-green-50",
    hoverBg: "group-hover:bg-green-100",
  },

  {
    title: "AI",
    Icon: FaRobot,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
    hoverBg: "group-teal:bg-teal-100",
  },

  {
    title: "Game ",
    Icon: FaGamepad,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    hoverBg: "group-purple:bg-purple-100",
  },
];
/*-------------------------------------------------------------------------------------------------- */

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "backOut",
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
/*-------------------------------------------------------------------------------------------------- */

// User
export interface User {
  id: string;
  name: string;
  email: string;
}

// Inner data
export interface LoginData {
  user: User;
  token: string;
}

// Backend response body
export interface LoginResponse {
  data: LoginData;
  status: number;
  message: string;
}
export type LoginAxiosResponse = AxiosResponse<LoginResponse>;
/*-------------------------------------------------------------------------------------------------- */
const colors = [
  "bg-red-100 text-red-700",
  "bg-red-200 text-red-800",
  "bg-red-300 text-red-900",
  "bg-pink-100 text-pink-700",
  "bg-pink-200 text-pink-800",
  "bg-pink-300 text-pink-900",
  "bg-rose-100 text-rose-700",
  "bg-rose-200 text-rose-800",
  "bg-rose-300 text-rose-900",
  "bg-yellow-100 text-yellow-700",
  "bg-yellow-200 text-yellow-800",
  "bg-yellow-300 text-yellow-900",
  "bg-amber-100 text-amber-700",
  "bg-amber-200 text-amber-800",
  "bg-amber-300 text-amber-900",
  "bg-orange-100 text-orange-700",
  "bg-orange-200 text-orange-800",
  "bg-orange-300 text-orange-900",
  "bg-lime-100 text-lime-700",
  "bg-lime-200 text-lime-800",
  "bg-lime-300 text-lime-900",
  "bg-green-100 text-green-700",
  "bg-green-200 text-green-800",
  "bg-green-300 text-green-900",
  "bg-emerald-100 text-emerald-700",
  "bg-emerald-200 text-emerald-800",
  "bg-emerald-300 text-emerald-900",
  "bg-teal-100 text-teal-700",
  "bg-teal-200 text-teal-800",
  "bg-teal-300 text-teal-900",
  "bg-cyan-100 text-cyan-700",
  "bg-cyan-200 text-cyan-800",
  "bg-cyan-300 text-cyan-900",
  "bg-sky-100 text-sky-700",
  "bg-sky-200 text-sky-800",
  "bg-sky-300 text-sky-900",
  "bg-blue-100 text-blue-700",
  "bg-blue-200 text-blue-800",
  "bg-blue-300 text-blue-900",
  "bg-indigo-100 text-indigo-700",
  "bg-indigo-200 text-indigo-800",
  "bg-indigo-300 text-indigo-900",
  "bg-violet-100 text-violet-700",
  "bg-violet-200 text-violet-800",
  "bg-violet-300 text-violet-900",
  "bg-purple-100 text-purple-700",
  "bg-purple-200 text-purple-800",
  "bg-purple-300 text-purple-900",
  "bg-fuchsia-100 text-fuchsia-700",
  "bg-fuchsia-200 text-fuchsia-800",
  "bg-fuchsia-300 text-fuchsia-900",
  "bg-pink-400 text-pink-900",
  "bg-rose-400 text-rose-900",
  "bg-red-400 text-red-900",
  "bg-orange-400 text-orange-900",
  "bg-amber-400 text-amber-900",
  "bg-yellow-400 text-yellow-900",
  "bg-lime-400 text-lime-900",
  "bg-green-400 text-green-900",
  "bg-emerald-400 text-emerald-900",
  "bg-teal-400 text-teal-900",
  "bg-cyan-400 text-cyan-900",
  "bg-sky-400 text-sky-900",
  "bg-blue-400 text-blue-900",
  "bg-indigo-400 text-indigo-900",
  "bg-violet-400 text-violet-900",
  "bg-purple-400 text-purple-900",
  "bg-fuchsia-400 text-fuchsia-900",
  "bg-pink-500 text-pink-50",
  "bg-rose-500 text-rose-50",
  "bg-red-500 text-red-50",
  "bg-orange-500 text-orange-50",
  "bg-amber-500 text-amber-50",
  "bg-yellow-500 text-yellow-50",
  "bg-lime-500 text-lime-50",
  "bg-green-500 text-green-50",
  "bg-emerald-500 text-emerald-50",
  "bg-teal-500 text-teal-50",
  "bg-cyan-500 text-cyan-50",
  "bg-sky-500 text-sky-50",
  "bg-blue-500 text-blue-50",
  "bg-indigo-500 text-indigo-50",
  "bg-violet-500 text-violet-50",
  "bg-purple-500 text-purple-50",
  "bg-fuchsia-500 text-fuchsia-50",
  "bg-pink-600 text-pink-50",
  "bg-rose-600 text-rose-50",
  "bg-red-600 text-red-50",
  "bg-orange-600 text-orange-50",
  "bg-amber-600 text-amber-50",
  "bg-yellow-600 text-yellow-50",
  "bg-lime-600 text-lime-50",
  "bg-green-600 text-green-50",
  "bg-emerald-600 text-emerald-50",
  "bg-teal-600 text-teal-50",
  "bg-cyan-600 text-cyan-50",
  "bg-sky-600 text-sky-50",
  "bg-blue-600 text-blue-50",
  "bg-indigo-600 text-indigo-50",
  "bg-violet-600 text-violet-50",
  "bg-purple-600 text-purple-50",
  "bg-fuchsia-600 text-fuchsia-50",
];

/*-------------------------------------------------------------------------------------------------- */
export function getInitials(name?: string): string {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
export function getUserColor(name?: string): string {
  if (!name || name.length === 0) {
    // fallback color if name is missing
    return colors[0];
  }

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
export const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return BsGithub;
    case "linkedin":
      return BsLinkedin;
    case "twitter":
      return BsTwitter;

    default:
      return FaLink;
  }
};
export const getSocialColor = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return "bg-gray-900 hover:bg-gray-800";
    case "linkedin":
      return "bg-blue-600 hover:bg-blue-700";
    case "twitter":
      return "bg-sky-500 hover:bg-sky-600";
    case "facebook":
      return "bg-blue-700 hover:bg-blue-800";
    case "instagram":
      return "bg-pink-600 hover:bg-pink-700";
    case "youtube":
      return "bg-red-600 hover:bg-red-700";
    default:
      return "bg-gray-600 hover:bg-gray-700";
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "WAITING":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "ACTIVE":
      return "bg-green-100 text-green-800 border-green-200";
    case "COMPLETED":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
import { HiOutlineServerStack } from "react-icons/hi2";
import { GoDatabase } from "react-icons/go";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
export const getFieldIcon = (field: string) => {
  switch (field.toLowerCase()) {
    case "front-end":
      return LuMonitor;
    case "back-end":
      return HiOutlineServerStack;
    case "db engineer":
      return GoDatabase;
    default:
      return FaCode;
  }
};
/*-------------------------------------------------------------------------------------------------- */
export const PLATFORM_OPTIONS: { value: SocialPlatform; label: string }[] = [
  { value: "LINKEDIN", label: "LinkedIn" },
  { value: "GITHUB", label: "GitHub" },
  { value: "X", label: "X (Twitter)" },
  { value: "FACEBOOK", label: "Facebook" },
];
