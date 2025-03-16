import React from "react";

function ArrowIcon() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      className="arrow-icon cursor-pointer bg-[#E7C2D4] rounded-[100%] hover:bg-[#f3bebebe]"
    >
      {/* <rect
        width="72"
        height="72"
        rx="36"
        fill="#E7C2D4"
        className="hover:bg-[#b05f5f]"
      /> */}
      <path
        d="M29 36H43"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 29L43 36L36 43"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowIcon;
