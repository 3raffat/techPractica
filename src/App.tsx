import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./Router";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "./components/Sessions/ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary>
        {" "}
        <Toaster />
        <AnimatePresence mode="wait">
          <RouterProvider router={router} />
        </AnimatePresence>
      </ErrorBoundary>
    </>
  );
}

export default App;
