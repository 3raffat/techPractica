import { IconType } from "react-icons";
import { FiCompass, FiUsers } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { GrHomeRounded } from "react-icons/gr";
import { VscSettingsGear } from "react-icons/vsc";

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
interface IAdminNav {
  id: string;
  label: string;
  icon: IconType;
}

export const adminNav: IAdminNav[] = [
  { id: "users", label: "Users", icon: FiUsers },
  { id: "content", label: "Content", icon: VscSettingsGear },
];
