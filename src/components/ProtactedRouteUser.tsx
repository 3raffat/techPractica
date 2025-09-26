import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  token: boolean;
  redirectPath: string;
  children: ReactNode;
}
const ProtactedRouteUser = ({ token, redirectPath, children }: IProps) => {
  if (token) return <Navigate to={redirectPath} />;
  return children;
};
export default ProtactedRouteUser;
