import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { LayoutHome, LayoutLogin, Home, ProjectsLayout } from "../imports";
import BorderLayout from "../components/Board/BorderLayout";
import KanbanBoard from "../components/Board/KanbanBoard";
import AuthPage from "../pages/User/Auth";
import Dashboard from "../pages/Projects/WorkSpace";
import Explore from "../pages/Home/Explore";
import CreateProject from "../pages/Projects/CreateProject";
import EditProject from "../pages/Projects/EditProject";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LayoutHome />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="explore/:category" element={<Explore />} />
        <Route path="workspace" element={<ProjectsLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="session/new" element={<CreateProject />} />
          <Route path="session/:id/edit" element={<EditProject />} />
        </Route>

        {/* <Route path="/Requests/:id" element={<SessionRequests />} /> */}
        {/* <Route path="Profile" element={<Profile />} /> */}
      </Route>

      <Route path="auth" element={<LayoutLogin />}>
        <Route index element={<AuthPage />} />
      </Route>
      <Route path="SessionKanban" element={<BorderLayout />}>
        <Route index element={<KanbanBoard />} />
      </Route>
    </>
  )
);
