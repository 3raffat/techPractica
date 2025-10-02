import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Home, LayoutHome, LayoutLogin, ProjectsLayout } from "../imports";
import Explore from "../pages/Home/Explore";
import WorkSpace from "../pages/Sessions/WorkSpace";
import CreateSession from "../pages/Sessions/CreateSession";
import EditSession from "../pages/Sessions/EditSession";
import AuthPage from "../pages/User/Auth";
import SessionDetails from "../pages/Sessions/SessionDetails";
import ProfilePage from "../pages/Home/Profile";
import ProfileLayout from "../components/Profile/ProfileLayout";
import UserProfileForm from "../components/Profile/CompleteProfile";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LayoutHome />}>
        <Route index element={<Home />} />

        <Route path="explore" element={<ProjectsLayout />}>
          <Route index element={<Explore />} />
          <Route path="session/:id" element={<SessionDetails />} />
        </Route>

        <Route path="workspace" element={<ProjectsLayout />}>
          <Route index element={<WorkSpace />} />
          <Route path="session/new" element={<CreateSession />} />
          <Route path="session/:id/edit" element={<EditSession />} />
          <Route path="session/:id/requests" element={"test"} />
          <Route path="session/:id" element={<SessionDetails />} />
        </Route>

        <Route path="profile" element={<ProfileLayout />}>
          <Route index element={<ProfilePage />} />
          <Route path="complete" element={<UserProfileForm />} />
        </Route>
      </Route>

      <Route path="auth" element={<LayoutLogin />}>
        <Route index element={<AuthPage />} />
      </Route>
      {/* <Route path="SessionKanban" element={<HorizontalLayout />}>
        <Route index element={<KanbanBoard />} />
      </Route> */}
    </>
  )
);
