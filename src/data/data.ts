import { AxiosResponse } from "axios";
import { IconType } from "react-icons";

export interface Category {
  title: CategoryType;
  Icon: IconType;
  style: string;
}

import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaVuejs,
  FaDocker,
  FaAws,
  FaDatabase,
  FaMobile,
  FaBrain,
  FaServer,
  FaCloud,
  FaBitcoin,
  FaBookOpen,
  FaBullseye,
  FaUsers,
  FaTrophy,
  FaBolt,
  FaGlobe,
  FaHome,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
export interface Feature {
  title: string;
  description: string;
  Icon: IconType;
  style: string;
}
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
import { FiCompass } from "react-icons/fi";
export const categories: Category[] = [
  {
    title: "Web Development",
    Icon: FaCode,
    style: "text-blue-600 w-6 h-6",
  },
  {
    title: "Cybersecurity",
    Icon: FaShieldAlt,
    style: "text-red-600 w-6 h-6",
  },
  {
    title: "Mobile Development",
    Icon: FaMobileAlt,
    style: "text-green-600 w-6 h-6",
  },

  {
    title: "Artificial Intelligence",
    Icon: FaRobot,
    style: "text-teal-600 w-6 h-6",
  },

  {
    title: "Game Development",
    Icon: FaGamepad,
    style: "text-purple-600 w-6 h-6",
  },
];
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

interface Itags {
  Mcolor: string;
  txt: string;
}
export const tags: Itags[] = [
  {
    Mcolor: "bg-red-200 text-red-800",
    txt: "Java",
  },
  {
    Mcolor: "bg-green-700",
    txt: "Spring Boot",
  },
  {
    Mcolor: "bg-cyan-500",
    txt: "React",
  },
  {
    Mcolor: "bg-blue-800",
    txt: "Type Script",
  },
  {
    Mcolor: "bg-gray-500",
    txt: "Figma",
  },
];

export type CategoryType =
  | "Web Development"
  | "Cybersecurity"
  | "Game Development"
  | "Artificial Intelligence"
  | "Mobile Development";
export const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "TypeScript",
  "Node.js",
];

interface Inav {
  path: string;
  label: string;
  icon: IconType;
}

export const NavLinks: Inav[] = [
  {
    label: "Home",
    path: "/",
    icon: FaHome,
  },
  {
    label: "Explore",
    path: "/Explore",
    icon: FiCompass,
  },
  {
    label: "Dashboard",
    path: "/Dashboard",
    icon: MdDashboard,
  },
];
import { SiFlutter, SiGraphql, SiKubernetes, SiSolidity } from "react-icons/si";

export const techIcons: {
  [key: string]: React.ComponentType<{ className?: string }>;
} = {
  React: FaReact,
  "Node.js": FaNodeJs,
  Python: FaPython,
  JavaScript: FaJs,
  HTML5: FaHtml5,
  CSS3: FaCss3Alt,
  "Vue.js": FaVuejs,
  Docker: FaDocker,
  AWS: FaAws,
  MongoDB: FaDatabase,
  Flutter: SiFlutter,
  GraphQL: SiGraphql,
  Kubernetes: SiKubernetes,
  Solidity: SiSolidity,
};

export const categoryIcons: {
  [key: string]: React.ComponentType<{ className?: string }>;
} = {
  Frontend: FaCode,
  Backend: FaServer,
  "Full Stack": FaReact,
  Mobile: FaMobile,
  "AI/ML": FaBrain,
  DevOps: FaDocker,
  Cloud: FaCloud,
  Blockchain: FaBitcoin,
};

export const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
export const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "rating", label: "Highest Rated" },
  { value: "participants", label: "Most Popular" },
  { value: "name", label: "Name A-Z" },
];

export const mockProjects = [
  {
    id: 1,
    sessionName: "Build a Full-Stack E-commerce App with React & Node.js",
    sessionDescription:
      "Learn to create a complete e-commerce platform with user authentication, payment integration, and admin dashboard. This comprehensive project covers both frontend and backend development with modern technologies.",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Stripe",
      "JWT",
      "Redux",
    ],
    system: "Full Stack",
    ownerName: "Sarah Johnson",
    createdAt: "2024-01-15",
    duration: "4-6 hours",
    difficulty: "Advanced" as const,
    rating: 4.9,
    participants: 156,
  },
  {
    id: 2,
    sessionName: "Machine Learning with Python: Beginner to Pro",
    sessionDescription:
      "Master machine learning fundamentals and build real-world ML models. Covers data preprocessing, model training, evaluation, and deployment strategies using popular Python libraries.",
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "TensorFlow",
    ],
    system: "AI/ML",
    ownerName: "Dr. Michael Chen",
    createdAt: "2024-01-12",
    duration: "3-4 hours",
    difficulty: "Intermediate" as const,
    rating: 4.7,
    participants: 89,
  },
  {
    id: 3,
    sessionName: "Mobile App Development with React Native",
    sessionDescription:
      "Create cross-platform mobile applications using React Native. Build apps for both iOS and Android with a single codebase, including navigation, state management, and API integration.",
    technologies: [
      "React Native",
      "JavaScript",
      "Expo",
      "Firebase",
      "AsyncStorage",
    ],
    system: "Mobile",
    ownerName: "Alex Rodriguez",
    createdAt: "2024-01-10",
    duration: "2-3 hours",
    difficulty: "Beginner" as const,
    rating: 4.6,
    participants: 67,
  },
  {
    id: 4,
    sessionName: "Advanced CSS Animations and Interactions",
    sessionDescription:
      "Master modern CSS techniques including animations, transitions, and interactive elements. Learn to create stunning user interfaces with pure CSS and modern layout systems.",
    technologies: ["CSS3", "HTML5", "SASS", "JavaScript", "Framer Motion"],
    system: "Frontend",
    ownerName: "Emma Wilson",
    createdAt: "2024-01-08",
    duration: "2-3 hours",
    difficulty: "Intermediate" as const,
    rating: 4.8,
    participants: 134,
  },
  {
    id: 5,
    sessionName: "RESTful API Development with Express.js",
    sessionDescription:
      "Build robust and scalable REST APIs using Express.js and Node.js. Learn about middleware, authentication, database integration, and API documentation best practices.",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Swagger",
      "Postman",
    ],
    system: "Backend",
    ownerName: "James Thompson",
    createdAt: "2024-01-05",
    duration: "3-4 hours",
    difficulty: "Intermediate" as const,
    rating: 4.5,
    participants: 92,
  },
  {
    id: 6,
    sessionName: "Vue.js 3 Composition API Deep Dive",
    sessionDescription:
      "Explore the latest Vue.js 3 features including the Composition API, Teleport, Fragments, and more. Build modern, reactive applications with improved performance and developer experience.",
    technologies: ["Vue.js", "JavaScript", "Vite", "Pinia", "Vue Router"],
    system: "Frontend",
    ownerName: "Lisa Chang",
    createdAt: "2024-01-03",
    duration: "3-4 hours",
    difficulty: "Advanced" as const,
    rating: 4.7,
    participants: 78,
  },
  {
    id: 7,
    sessionName: "Docker and Kubernetes for Developers",
    sessionDescription:
      "Learn containerization with Docker and orchestration with Kubernetes. Deploy scalable applications in the cloud with modern DevOps practices and container management.",
    technologies: ["Docker", "Kubernetes", "AWS", "Linux", "YAML", "Helm"],
    system: "DevOps",
    ownerName: "Robert Kim",
    createdAt: "2024-01-01",
    duration: "4-5 hours",
    difficulty: "Advanced" as const,
    rating: 4.6,
    participants: 45,
  },
  {
    id: 8,
    sessionName: "Flutter Mobile App Development",
    sessionDescription:
      "Create beautiful, natively compiled applications for mobile from a single codebase using Flutter and Dart. Learn widgets, state management, and platform-specific features.",
    technologies: ["Flutter", "Dart", "Firebase", "Provider", "SQLite"],
    system: "Mobile",
    ownerName: "Priya Patel",
    createdAt: "2023-12-28",
    duration: "3-4 hours",
    difficulty: "Beginner" as const,
    rating: 4.4,
    participants: 112,
  },
  {
    id: 9,
    sessionName: "GraphQL API with Apollo Server",
    sessionDescription:
      "Build modern GraphQL APIs with Apollo Server. Learn schema design, resolvers, subscriptions, and how to integrate with various databases and services.",
    technologies: ["GraphQL", "Apollo", "Node.js", "TypeScript", "Prisma"],
    system: "Backend",
    ownerName: "David Martinez",
    createdAt: "2023-12-25",
    duration: "3-4 hours",
    difficulty: "Advanced" as const,
    rating: 4.8,
    participants: 63,
  },
  {
    id: 10,
    sessionName: "Data Visualization with D3.js",
    sessionDescription:
      "Create interactive and dynamic data visualizations using D3.js. Learn to transform data into compelling visual stories with charts, graphs, and interactive elements.",
    technologies: ["D3.js", "JavaScript", "SVG", "HTML5", "CSS3"],
    system: "Frontend",
    ownerName: "Anna Kowalski",
    createdAt: "2023-12-22",
    duration: "2-3 hours",
    difficulty: "Intermediate" as const,
    rating: 4.5,
    participants: 87,
  },
  {
    id: 11,
    sessionName: "AWS Cloud Architecture Fundamentals",
    sessionDescription:
      "Learn cloud computing fundamentals with AWS. Explore EC2, S3, RDS, Lambda, and other core services. Design scalable and cost-effective cloud architectures.",
    technologies: ["AWS", "EC2", "S3", "Lambda", "RDS", "CloudFormation"],
    system: "Cloud",
    ownerName: "Mark Johnson",
    createdAt: "2023-12-20",
    duration: "4-5 hours",
    difficulty: "Intermediate" as const,
    rating: 4.6,
    participants: 156,
  },
  {
    id: 12,
    sessionName: "Blockchain Development with Solidity",
    sessionDescription:
      "Enter the world of blockchain development. Learn Solidity programming, smart contract development, and how to build decentralized applications (DApps) on Ethereum.",
    technologies: ["Solidity", "Ethereum", "Web3.js", "Truffle", "MetaMask"],
    system: "Blockchain",
    ownerName: "Chris Anderson",
    createdAt: "2023-12-18",
    duration: "4-6 hours",
    difficulty: "Advanced" as const,
    rating: 4.7,
    participants: 34,
  },
  {
    id: 13,
    sessionName: "Data Visualization with D3.js",
    sessionDescription:
      "Create interactive and dynamic data visualizations using D3.js. Learn to transform data into compelling visual stories with charts, graphs, and interactive elements.",
    technologies: ["D3.js", "JavaScript", "SVG", "HTML5", "CSS3"],
    system: "Frontend",
    ownerName: "Anna Kowalski",
    createdAt: "2023-12-22",
    duration: "2-3 hours",
    difficulty: "Intermediate" as const,
    rating: 4.5,
    participants: 87,
  },
  {
    id: 14,
    sessionName: "Data Visualization with D3.js",
    sessionDescription:
      "Create interactive and dynamic data visualizations using D3.js. Learn to transform data into compelling visual stories with charts, graphs, and interactive elements.",
    technologies: ["D3.js", "JavaScript", "SVG", "HTML5", "CSS3"],
    system: "Frontend",
    ownerName: "Anna Kowalski",
    createdAt: "2023-12-22",
    duration: "2-3 hours",
    difficulty: "Intermediate" as const,
    rating: 4.5,
    participants: 87,
  },
  {
    id: 15,
    sessionName: "Data Visualization with D3.js",
    sessionDescription:
      "Create interactive and dynamic data visualizations using D3.js. Learn to transform data into compelling visual stories with charts, graphs, and interactive elements.",
    technologies: ["D3.js", "JavaScript", "SVG", "HTML5", "CSS3"],
    system: "Frontend",
    ownerName: "Anna Kowalski",
    createdAt: "2023-12-22",
    duration: "2-3 hours",
    difficulty: "Intermediate" as const,
    rating: 4.5,
    participants: 87,
  },
  {
    id: 16,
    sessionName: "Data Visualization with D3.js",
    sessionDescription:
      "Create interactive and dynamic data visualizations using D3.js. Learn to transform data into compelling visual stories with charts, graphs, and interactive elements.",
    technologies: ["D3.js", "JavaScript", "SVG", "HTML5", "CSS3"],
    system: "Frontend",
    ownerName: "Anna Kowalski",
    createdAt: "2023-12-22",
    duration: "2-3 hours",
    difficulty: "Intermediate" as const,
    rating: 4.5,
    participants: 87,
  },
  {
    id: 17,
    sessionName: "Data Visualization with D3.js",
    sessionDescription:
      "Create interactive and dynamic data visualizations using D3.js. Learn to transform data into compelling visual stories with charts, graphs, and interactive elements.",
    technologies: ["D3.js", "JavaScript", "SVG", "HTML5", "CSS3"],
    system: "Frontend",
    ownerName: "Anna Kowalski",
    createdAt: "2023-12-22",
    duration: "2-3 hours",
    difficulty: "Intermediate" as const,
    rating: 4.5,
    participants: 87,
  },
];

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
export const categoriess = [
  {
    icon: FaCode,
    title: "Frontend",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    hoverBg: "group-hover:bg-blue-100",
  },
  {
    icon: FaDatabase,
    title: "Backend",
    color: "text-green-500",
    bgColor: "bg-green-50",
    hoverBg: "group-hover:bg-green-100",
  },
  {
    icon: FaGlobe,
    title: "Full Stack",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    hoverBg: "group-hover:bg-purple-100",
  },
  {
    icon: FaMobile,
    title: "Mobile",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    hoverBg: "group-hover:bg-orange-100",
  },
  {
    icon: FaBrain,
    title: "AI/ML",
    color: "text-red-500",
    bgColor: "bg-red-50",
    hoverBg: "group-hover:bg-red-100",
  },
];

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
import { Variants } from "framer-motion";
import { IFloatingShape, IGeometricShape } from "../interfaces";

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
      ease: [0.25, 0.46, 0.45, 0.94], // أو "easeOut"
    },
  },
};
