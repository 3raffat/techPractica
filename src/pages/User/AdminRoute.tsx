import { Navigate, Outlet } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../../helpers/helpers";

interface Props {
  redirectTo?: string; // الصفحة التي يذهب إليها غير الـAdmin
}

export default function AdminRoute({ redirectTo = "/" }: Props) {
  if (!isAuthenticated()) return <Navigate to="/auth" replace />;

  if (!isAdmin()) return <Navigate to={redirectTo} replace />;

  return <Outlet />;
}
