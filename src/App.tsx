import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./Router";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "./components/Sessions/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <ErrorBoundary>
        <AuthProvider>
          <Toaster />
          <AnimatePresence mode="wait">
            <RouterProvider router={router} />
          </AnimatePresence>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
