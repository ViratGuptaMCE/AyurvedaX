"use client";
import React from "react";

const ServiceCard = ({ title, description, bgColor, imageUrl, imageAlt , goto}) => {
  return (
    <article
      className={`overflow-hidden relative ${bgColor} rounded-3xl h-[478px] w-[415px] max-md:w-[calc(50%_-_10px)] max-sm:w-full max-sm:h-[400px]`}
    >
      <div className="px-10 py-12 h-full">
        <h2 className="mb-2.5 text-4xl font-bold tracking-tighter capitalize max-w-[262px] text-blue-950 max-sm:text-3xl">
          {title}
        </h2>
        <p className="text-base tracking-tight capitalize max-w-[262px] text-blue-950 max-sm:text-sm">
          {description}
        </p>
        <a href={goto}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-[42px] left-[41px]"
          >
            <rect width="60" height="60" rx="30" fill="#252B61" />
            <path
              d="M23 30H37"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M30 23L37 30L30 37"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <img
          src={imageUrl}
          alt={imageAlt}
          className="absolute right-0 bottom-0 opacity-50 mix-blend-multiply h-[280px] w-[280px] max-sm:h-[220px] max-sm:w-[220px]"
        />
      </div>
    </article>
  );
};

export default ServiceCard;
