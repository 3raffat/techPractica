import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../helpers/helpers";

export default function AuthRoute({ redirectTo = "/" }) {
  const token = getToken();

  return !token ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
