import React from "react";
import { SearchIcon } from "./Icons";

export const SearchBar = () => {
  return (
    <div className="flex relative items-center p-1 bg-white rounded-[300px] w-[362px] max-sm:w-full">
      <button aria-label="Search" className="flex items-center justify-center">
        <SearchIcon />
      </button>
      <input
        type="text"
        placeholder="Search Here.."
        className="ml-4 text-xs text-stone-300 bg-transparent outline-none w-full"
        aria-label="Search input"
      />
    </div>
  );
};
