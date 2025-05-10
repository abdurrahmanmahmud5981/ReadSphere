import { Outlet } from "react-router-dom";
import Navber from "../components/Navber";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div data-theme="light" className="dark:data-theme-dark transition-colors duration-300">
      {/* Background wrapper with theme-aware styles */}
      <div className="min-h-screen bg-gradient-to-r from-white via-purple-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
        
        {/* Sticky Navbar */}
        <header className="sticky top-0 z-50 backdrop-blur-2xl backdrop-filter bg-gradient-to-r from-white/80 via-purple-200/60 to-white/80 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all">
          <Navber />
        </header>

        {/* Main content */}
        <main className="max-w-screen-2xl mx-auto w-11/12 min-h-[calc(100vh-470px)] mb-20 mt-8 text-black dark:text-white">
          <Outlet />
        </main>

        {/* Footer */}
        <footer>
          <Footer />
        </footer>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </div>
  );
};

export default MainLayout;
