"use client";
import React from "react";
import ConsultationButton from "./ConsultationButton";
import FeatureIcon from "./FeatureIcon";

function HealthcareSection() {
  return (
    <section className="overflow-hidden relative mx-auto my-0 w-full bg-blue-950 h-[665px] max-w-[1720px] rounded-[45px] max-md:px-5 max-md:py-10 max-md:h-auto max-md:rounded-[30px] max-sm:p-5 max-sm:rounded-3xl">
      <h1 className="absolute font-bold tracking-tighter text-blue-200 capitalize left-[190px] text-[270px] top-[-26px] max-md:relative max-md:top-0 max-md:left-0 max-md:text-9xl max-md:text-center max-sm:text-7xl">
        AyurvedaX
      </h1>

      <div className="flex absolute bottom-4 max-md:flex-row justify-between items-center inset-x-[75px] max-md:inset-x-8 max-md:gap-8 max-md:items-start">
        <p className="text-xl text-white uppercase w-[403px] max-sm:w-full max-sm:text-base">
          The Ayurveda becomes magical with the help of technology and science.
        </p>
        <ConsultationButton />
      </div>

      <img
        src="./images/ayurBoy.png"
        className="absolute h-full right-[496px] top-[86px] w-[528px] max-md:block max-md:relative max-md:top-0 max-md:right-0 max-md:mx-auto max-md:my-10 max-md:w-full max-md:h-auto max-md:max-w-[400px]"
        alt="Doctor"
      />

      <div className="flex absolute justify-between left-[369px] top-[286px] w-[982px] max-md:relative max-md:left-0 max-md:flex-col max-md:gap-5 max-md:w-full">
        <div className="flex gap-4 items-center max-md:justify-start">
          <FeatureIcon variant="pink" />
          <p className="text-2xl tracking-tight text-[#ef0] capitalize max-sm:text-xl">
            No Side Effects
          </p>
        </div>
        <div className="flex gap-4 items-center max-md:justify-start">
          <FeatureIcon variant="green" />
          <p className="text-2xl tracking-tight text-blue-200 capitalize max-sm:text-xl">
            no more medications
          </p>
        </div>
      </div>
    </section>
  );
}

export default HealthcareSection;
