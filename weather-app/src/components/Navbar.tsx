import React from "react";
import { MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import SearchBox from "./SearchBox";

const Navbar = () => {
  return (
    <>
      <nav className="sticky shadow-sm top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <div className="flex items-center justify-center gap-2  ">
            <h2 className="text-gray-500 text-3xl">Weather</h2>
            <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
          </div>
          <section className="flex gap-5 items-center">
            <SearchBox />
            <MdMyLocation
              title="Your Current Location"
              className="text-2xl  text-gray-400 hover:opacity-70 cursor-pointer"
            />
            <MdOutlineLocationOn className="text-3xl" />
          </section>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
