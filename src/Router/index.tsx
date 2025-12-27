import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Home, LayoutHome, LayoutLogin, ProjectsLayout } from "../imports";
import ProtectedRoute from "../pages/User/ProtectedRoute";
import AuthRoute from "../pages/User/AuthRoute";
import AdminRoute from "../pages/User/AdminRoute";
import Explore from "../pages/Home/Explore";
import CreateSession from "../components/Sessions/CreateSession";
import EditSession from "../components/Sessions/EditSession";
import AuthPage from "../pages/User/Auth";
import SessionDetails from "../components/Sessions/SessionDetails";
import ProfilePage from "../pages/Home/Profile";
import ProfileLayout from "../components/Profile/ProfileLayout";
import UserProfileForm from "../components/Profile/CompleteProfileForm";
import WorkSpace from "../pages/Home/WorkSpace";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import SessionRequest from "../components/Sessions/SessionRequest";
import TasksPage from "../components/TaskManager/TasksPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LayoutHome />}>
        <Route index element={<Home />} />

        <Route path="explore" element={<ProjectsLayout />}>
          <Route index element={<Explore />} />
          <Route path="session/:id" element={<SessionDetails />} />
          <Route path="profile/:id" element={<ProfilePage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="workspace" element={<ProjectsLayout />}>
            <Route index element={<WorkSpace />} />
            <Route path="session/new" element={<CreateSession />} />
            <Route path="session/:id/edit" element={<EditSession />} />
            <Route path="session/:id/requests" element={<SessionRequest />} />
            <Route path="session/:id" element={<SessionDetails />} />
            <Route path="session/:id/task-manager" element={<TasksPage />} />
            <Route path="profile/:id" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path="complete" element={<UserProfileForm />} />
          </Route>
        </Route>
      </Route>

      <Route element={<AuthRoute />}>
        <Route path="auth" element={<LayoutLogin />}>
          <Route index element={<AuthPage />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
    </>
  )
);
