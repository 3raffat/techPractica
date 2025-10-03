import { Navigate, Outlet } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../../helpers/helpers";

interface Props {
  redirectTo?: string; // الصفحة التي يذهب إليها غير الـAdmin
}

export default function AdminRoute({ redirectTo = "/" }: Props) {
  // إذا المستخدم غير مسجل دخول → أعد توجيهه لصفحة تسجيل الدخول
  if (!isAuthenticated()) return <Navigate to="/auth" replace />;

  // إذا المستخدم مسجل دخول لكنه ليس Admin → أعد توجيهه للصفحة الافتراضية
  if (!isAdmin()) return <Navigate to={redirectTo} replace />;

  // المستخدم مسجل دخول و Admin → أعرض محتوى الصفحة (Outlet)
  return <Outlet />;
}
