import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../../imports";
import AnimatedLayout from "../../components/AnimatedLayout";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gray-100">
        <AnimatedLayout>
          <Outlet />
        </AnimatedLayout>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
