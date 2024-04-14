import React from "react";
import { MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";

const Navbar = () => {
  return (
    <>
      <nav className="sticky shadow-sm top-0 left-0 z-50 bg-white flex overflow-hidden sm:px-5">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-gray-500 sm:text-2xl md:text-3xl">Weather</h2>
            <MdWbSunny className="sm:text-2xl md:text-3xl text-yellow-300" />
          </div>
          <SearchBox />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
