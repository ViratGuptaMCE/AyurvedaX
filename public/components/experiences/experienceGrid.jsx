'use client'
import React, { useState } from "react";
import { experiences } from "@/public/dataConsts";

const ExperienceGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % experiences.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? experiences.length - 1 : prevIndex - 1
    );
  };

  const currentExperience = experiences[currentIndex];

  return (
    <div className="w-full p-4 text-center">
      <div className="textzone text-6xl font-extrabold m-10 text-[#0c0c57]">
        Experiences
      </div>
      <div className="content-area p-8 bg-[#f4ace3] rounded-4xl">
        <div className="grid grid-cols-[.6fr_1fr] gap-4">
          <div className="relative h-full overflow-hidden rounded-l-2xl">
            <video
              key={currentExperience.video}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={currentExperience.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="content gap-4 grid grid-rows-[1fr_0.1fr]">
            <div className="descrip overflow-hidden rounded-tr-2xl p-4 pt-8 pb-2 bg-[#ffffff4c]">
              <div className="Identity flex w-full items-center">
                <div className="w-full name text-5xl max-md:text-3xl text-left font-bold font-serif text-blue-800">
                  {currentExperience.name}
                </div>
                <div className="w-full name text-xl text-right font-semibold font-serif text-green-700">
                  {currentExperience.date}
                </div>
              </div>
              <div className="name text-3xl max-md:text-2xl text-[#393737] text-left font-semibold font-mono">
                {currentExperience.problem}
              </div>
              <div className="name text-2xl max-md:text-xl text-left font-serif">
                {currentExperience.from}
              </div>
              <div className="name text-left mx-2 my-8">
                {currentExperience.description}
              </div>
            </div>
            <div className="arrows flex w-full justify-center items-center">
              <div className="flex w-[30%] justify-around">
                <button
                  onClick={handlePrev}
                  className="bg-white max-h-[50px] max-w-[40%] p-2 rounded-full hover:bg-[#ffffff36] hover:border-white hover:text-white hover:invert hover:border-2"
                >
                  <img src="./icons/prev.png" alt="" className="max-h-[40px]" />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white max-h-[50px] max-w-[40%] p-2 rounded-full hover:bg-[#ffffff36] hover:border-white hover:text-white hover:invert hover:border-2"
                >
                  <img src="./icons/next.png" alt="" className="max-h-[40px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceGrid;
