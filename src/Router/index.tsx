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
import KanbanBoard from "../components/Board/KanbanBoard";
import HorizontalLayout from "../components/Board/BorderLayout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LayoutHome />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="explore/:category" element={<Explore />} />
        <Route path="workspace" element={<ProjectsLayout />}>
          <Route index element={<WorkSpace />} />
          <Route path="session/new" element={<CreateSession />} />
          <Route path="session/:id/edit" element={<EditSession />} />
        </Route>

        {/* <Route path="/Requests/:id" element={<SessionRequests />} /> */}
        {/* <Route path="Profile" element={<Profile />} /> */}
      </Route>

      <Route path="auth" element={<LayoutLogin />}>
        <Route index element={<AuthPage />} />
      </Route>
      <Route path="SessionKanban" element={<HorizontalLayout />}>
        <Route index element={<KanbanBoard />} />
      </Route>
    </>
  )
);
