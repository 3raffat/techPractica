import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./Router";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <>
      <Toaster />
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </>
  );
}

export default App;
