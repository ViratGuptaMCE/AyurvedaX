'use client'
import React from "react";
import { ChevronDownIcon, CheckCircleIcon, CartIcon, UserIcon } from "./Icons";
import { DropDown } from "./Dropdown";
import { useState , useEffect } from "react";

export const NavigationItems = () => {
  const [name, setName] = useState(null);
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      const trimmedName = storedEmail.split("@")[0]; // Extracts part before '@'
      setName(trimmedName);
    }
  }, []);
  return (
    <nav className="flex gap-16 items-center max-md:gap-5 max-md:justify-between max-md:w-full max-sm:hidden">
      <div className="flex gap-1.5 items-center text-xl text-blue-950 cursor-pointer">
        <DropDown />
      </div>

      <a
        href="/Xverse"
        className="flex gap-1.5 items-center text-xl text-blue-950  cursor-pointer hover:bg-[#ffae8b] rounded-2xl p-3"
      >
        <span>X-Verse</span>
        <img src="./icons/3d.gif" alt="" className="w-[40px]" />
        {/* <CheckCircleIcon /> */}
      </a>

      <a
        href="/shop"
        className="flex gap-1.5 items-center text-xl text-blue-950 cursor-pointer hover:bg-[#ffc38b] rounded-2xl p-3"
      >
        <span>Shop</span>
        <CartIcon />
      </a>

      <a href="/login" className="flex gap-1.5 items-center text-xl text-blue-950 cursor-pointer hover:bg-[#fff98b]  rounded-2xl p-3">
        <span>{name ? name : "Login"}</span>
        <UserIcon />
      </a>
    </nav>
  );
};
