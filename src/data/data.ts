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
    title: "Security",
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
