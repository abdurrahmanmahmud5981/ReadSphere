import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../provider/AuthContext";
import toast from "react-hot-toast";
import logo from "../assets/logo.gif";
import ThemeToggle from "./ThemeToggle";

const Navber = () => {
  const { user, logOut } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allBooks">All Books</NavLink>
      </li>
      {user?.email && (
        <>
          <li>
            <NavLink to="/addBook">Add Book</NavLink>
          </li>
          <li>
            <NavLink to="/borrowedBooks">Borrowed Books</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/aboutUs">About Us</NavLink>
      </li>
    </>
  );

  return (
    <div className=" navbar px-0 max-w-screen-2xl mx-auto w-11/12 text-base-content transition-colors duration-300">
      {/* Navbar Start */}
      <div className="navbar-start gap-3">
        {/* Mobile Menu */}
        <div className="dropdown z-50">
          <div
            tabIndex={0}
            role="button"
            className="btn h-full w-full min-h-full flex justify-start items-center px-0 sm:px-3 mr-0 btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-semibold space-y-2 border"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <div className="text-sm sm:text-xl font-bold flex items-center gap-2 dark:gap-3">
          <img className="w-12 hidden sm:block dark:rounded" src={logo} alt="logo" />
          <span>ReadSphere</span>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex ml-12">
        <ul className="menu menu-horizontal px-1 gap-1 font-semibold">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-3">
        <ThemeToggle /> {/* Always visible */}

        {user ? (
          <div className="dropdown dropdown-hover dropdown-end z-50 ring ring-primary rounded-full">
            <div tabIndex={0} role="button">
              {user?.photoURL && (
                <img
                  src={user?.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a>{user?.displayName}</a>
              </li>
              <li>
                <button
                  onClick={() => {
                    logOut();
                    toast.success("You have been logged out successfully");
                  }}
                  className="btn btn-neutral min-h-full h-full py-2"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "btn min-h-full h-full py-3 btn-neutral"
                  : "btn min-h-full h-full py-3"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "btn min-h-full h-full py-3 btn-neutral"
                  : "btn min-h-full h-full py-3"
              }
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navber;
