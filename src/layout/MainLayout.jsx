import { Outlet } from "react-router-dom";
import Navber from "../components/Navber";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      <div className="  backdrop-blur-2xl  bg-gradient-to-r from-white/60 via-purple-200/80 to-white/60 ">
        <header className="sticky top-0     backdrop-blur-2xl  backdrop-filter z-50 bg-gradient-to-r from-white/60 via-purple-200/80 to-white/60">
          <Navber />
        </header>
        <main className="max-w-screen-2xl mx-auto w-11/12 min-h-[calc(100vh-470px)] mb-20 mt-8">
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
        <Toaster />
     
    </div>
  );
};

export default MainLayout;
