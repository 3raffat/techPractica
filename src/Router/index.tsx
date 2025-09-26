import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {
  LayoutHome,
  LayoutLogin,
  Home,
  PageNotFound,
  Learn,
  Profile,
  ResetPass,
  ProjectsLayout,
  SessionRequests,
} from "../imports";
import BorderLayout from "../components/Board/BorderLayout";
import KanbanBoard from "../components/Board/KanbanBoard";
import AuthPage from "../pages/User/Auth";
// import Explore from "../pages/Home/Explore";
import Dashboard from "../pages/Projects/Dashboard";
import Explore from "../pages/Home/Explore";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LayoutHome />}>
        <Route index element={<Home />} />
        <Route path="Explore" element={<Explore />} />
        <Route path="Explore/:category" element={<Learn />} />
        <Route path="Dashboard" element={<ProjectsLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/Requests/:id" element={<SessionRequests />} />
        <Route path="Profile" element={<Profile />} />
      </Route>

      <Route path="auth" element={<LayoutLogin />}>
        <Route index element={<AuthPage />} />
        <Route path="ResetPassword" element={<ResetPass />} />
      </Route>
      <Route path="SessionKanban" element={<BorderLayout />}>
        <Route index element={<KanbanBoard />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);
