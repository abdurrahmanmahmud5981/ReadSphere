import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <header>
        <nav>
            nav 
        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </>
  );
};

export default MainLayout;
