import React from "react";
import ArrowIcon from "./ArrowIcon";

function ConsultationButton() {
  return (
    <div className="flex gap-2 items-center">
      <button className="px-14 py-4 text-xl font-semibold text-black capitalize bg-stone-300 rounded-[128px] max-sm:px-8 max-sm:py-4 max-sm:w-full max-sm:text-lg max-sm:text-center cursor-pointer hover:bg-[#fffcbcce]">
        Book Consultation
      </button>
      <ArrowIcon />
    </div>
  );
}

export default ConsultationButton;
