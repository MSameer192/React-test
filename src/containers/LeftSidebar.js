import routes from "../routes/sidebar";
import { NavLink, Link, useLocation } from "react-router-dom";
import SidebarSubmenu from "./SidebarSubmenu";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import logo from "../images/icons/logo.png";

function LeftSidebar() {
  const location = useLocation();



  const close = (e) => {
    document.getElementById("left-sidebar-drawer").click();
  };

  return (
    <div className="drawer-side  rounded-tr-3xl rounded-br-3xl">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu  pt-2 w-80 px-8  bg-[#015249] text-white">
        <button
          className="btn btn-ghost bg-[#043933] btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={() => close()}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>

        <li className="mb-5 font-semibold text-xl">
          <Link to={"/app/welcome"}>
            <img
              className="lg:w-[230px] lg:h-[50px] md:w-[180px] mx-auto"
              src={logo}
              alt="E-comerce Accounting Logo"
            />
          </Link>{" "}
        </li>
        {routes.map((route, k) => {
          return (
            <li className="bg-[#043933] my-2 rounded-md shadow-xl" key={k}>
              {route.submenu ? (
                <SidebarSubmenu {...route} />
              ) : (
                <NavLink
                  end
                  to={route.path}
                  className={({ isActive }) =>
                    `${isActive ? "font-semibold" : "font-normal"}`
                  }
                >
                  {route.icon} {route.name}
                  {location.pathname === route.path ? (
                    <span
                      className="absolute inset-y-0 left-0 w-1 rounded-tl-md rounded-bl-md bg-[#57BC90]"
                      aria-hidden="true"
                    ></span>
                  ) : null}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftSidebar;
