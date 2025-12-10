import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { Home, LayoutHome, LayoutLogin, ProjectsLayout } from "../imports";
import ProtectedRoute from "../pages/User/ProtectedRoute";
import AuthRoute from "../pages/User/AuthRoute";
import AdminRoute from "../pages/User/AdminRoute";

// Lazy load route components
const Explore = lazy(() => import("../pages/Home/Explore"));
const CreateSession = lazy(
  () => import("../components/Sessions/CreateSession")
);
const EditSession = lazy(() => import("../components/Sessions/EditSession"));
const AuthPage = lazy(() => import("../pages/User/Auth"));
const SessionDetails = lazy(
  () => import("../components/Sessions/SessionDetails")
);
const ProfilePage = lazy(() => import("../pages/Home/Profile"));
const ProfileLayout = lazy(() => import("../components/Profile/ProfileLayout"));
const UserProfileForm = lazy(
  () => import("../components/Profile/CompleteProfileForm")
);
const WorkSpace = lazy(() => import("../pages/Home/WorkSpace"));
const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const SessionRequest = lazy(
  () => import("../components/Sessions/SessionRequest")
);
const TasksPage = lazy(() => import("../components/TaskManager/TasksPage"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
    <div className="text-center">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#42D5AE] border-r-transparent"></div>
      <p className="mt-4 text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);

// Wrapper component for Suspense
const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LayoutHome />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<ProjectsLayout />}>
          <Route
            index
            element={
              <LazyWrapper>
                <Explore />
              </LazyWrapper>
            }
          />
          <Route
            path="session/:id"
            element={
              <LazyWrapper>
                <SessionDetails />
              </LazyWrapper>
            }
          />
          <Route
            path="profile/:id"
            element={
              <LazyWrapper>
                <ProfilePage />
              </LazyWrapper>
            }
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="workspace" element={<ProjectsLayout />}>
            <Route
              index
              element={
                <LazyWrapper>
                  <WorkSpace />
                </LazyWrapper>
              }
            />
            <Route
              path="session/new"
              element={
                <LazyWrapper>
                  <CreateSession />
                </LazyWrapper>
              }
            />
            <Route
              path="session/:id/edit"
              element={
                <LazyWrapper>
                  <EditSession />
                </LazyWrapper>
              }
            />
            <Route
              path="session/:id/requests"
              element={
                <LazyWrapper>
                  <SessionRequest />
                </LazyWrapper>
              }
            />
            <Route
              path="session/:id"
              element={
                <LazyWrapper>
                  <SessionDetails />
                </LazyWrapper>
              }
            />
            <Route
              path="session/:id/task-manager"
              element={
                <LazyWrapper>
                  <TasksPage />
                </LazyWrapper>
              }
            />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="profile"
            element={
              <LazyWrapper>
                <ProfileLayout />
              </LazyWrapper>
            }
          >
            <Route
              index
              element={
                <LazyWrapper>
                  <ProfilePage />
                </LazyWrapper>
              }
            />
            <Route
              path="complete"
              element={
                <LazyWrapper>
                  <UserProfileForm />
                </LazyWrapper>
              }
            />
          </Route>
        </Route>
      </Route>
      <Route element={<AuthRoute />}>
        <Route path="auth" element={<LayoutLogin />}>
          <Route
            index
            element={
              <LazyWrapper>
                <AuthPage />
              </LazyWrapper>
            }
          />
        </Route>
      </Route>
      <Route element={<AdminRoute />}>
        <Route
          path="admin"
          element={
            <LazyWrapper>
              <AdminDashboard />
            </LazyWrapper>
          }
        />
      </Route>
    </>
  )
);
