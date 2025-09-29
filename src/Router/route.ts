import { IconType } from "react-icons";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FiCompass } from "react-icons/fi";

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
    path: "/explore",
    icon: FiCompass,
  },
  {
    label: "Workspace",
    path: "/workspace",
    icon: BsPersonWorkspace,
  },
];
