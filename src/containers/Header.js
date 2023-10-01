import { themeChange } from "theme-change";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";

function Header() {
  const { pageTitle } = useSelector((state) => state.header);
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme")
  );

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
    // 👆 false parameter is required for react project
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="navbar py-5 flex justify-between bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn bg-[#015249] drawer-button lg:hidden"
          >
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-5">
            {pageTitle.toUpperCase()}
          </h1>
        </div>
      </div>
    </>
  );
}

export default Header;
