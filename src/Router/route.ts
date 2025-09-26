interface Inav {
  path: string;
  label: string;
}
export const NavLinks: Inav[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Learn",
    path: "/Learn",
  },
  {
    label: "Sessions",
    path: "/Sessions",
  },
  {
    label: "Profile",
    path: "/Profile",
  },
  {
    label: "Login",
    path: "/User",
  },
  {
    label: "Join",
    path: "User/Register",
  },
];
