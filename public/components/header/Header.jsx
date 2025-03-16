"use client";
import React from "react";
import { SearchBar } from "./SearchBar";
import { NavigationItems } from "./NavigationItems";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 pr-14 pl-12 mx-auto my-3 w-full rounded-3xl bg-neutral-200 bg-opacity-80 max-w-[1720px] max-md:flex-col max-md:gap-5 max-md:p-5 max-sm:p-4">
      <div className="flex gap-11 items-center max-md:w-full max-sm:flex-col max-sm:gap-4">
        <h1 className="text-4xl font-bold text-blue-950 max-sm:text-2xl">
          TacX
        </h1>
        <div className="w-0.5 bg-stone-300 h-[29.5px]" />
        <SearchBar />
      </div>
      <NavigationItems />
    </header>
  );
};

export default Header;
