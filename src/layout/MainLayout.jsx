import { Outlet } from "react-router-dom";
import Navber from "../components/Navber";

const MainLayout = () => {
  return (
    <>
      <header className="sticky top-0 dark:border-b-neutral/60 dark:bg-base-100/60   backdrop-blur-2xl  backdrop-filter z-50 bg-base-100/60">
        <Navber />
      </header>
      <main className="max-w-screen-2xl mx-auto w-11/12 min-h-[calc(100vh-522px)] mb-20">
        <Outlet />
      </main>
      <footer>
        <div className="bg-base-100 dark:bg-base-900 p-5 text-center">
          <p>© 2021 ReadSphere</p>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
