import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../helpers/helpers";

export default function ProtectedRoute({ redirectTo = "/auth" }) {
  return isAuthenticated() ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
