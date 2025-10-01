import { IconType } from "react-icons";
import { FiCompass } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { GrHomeRounded } from "react-icons/gr";

interface Inav {
  path: string;
  label: string;
  icon: IconType;
}

export const NavLinks: Inav[] = [
  {
    label: "Home",
    path: "/",
    icon: GrHomeRounded,
  },
  {
    label: "Explore",
    path: "/explore",
    icon: FiCompass,
  },
  {
    label: "Workspace",
    path: "/workspace",
    icon: LuUser,
  },
];
