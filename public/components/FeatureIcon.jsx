import React from "react";

function FeatureIcon({ variant }) {
  if (variant === "pink") {
    return (
      <svg
        width="47"
        height="47"
        viewBox="0 0 47 47"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="feature-icon pink"
      >
        <rect width="47" height="47" rx="23.5" fill="#E7C2D4" />
        <path
          d="M34 24H30L27 33L21 15L18 24H14"
          stroke="#252B61"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="feature-icon green"
    >
      <rect width="47" height="47" rx="23.5" fill="#A3DAC2" />
      <path
        d="M26.9866 24.3701V31.3331"
        stroke="#252B61"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.0236 24.3701V31.3331"
        stroke="#252B61"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.5051 26.1108V33.0738"
        stroke="#252B61"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.4681 27.486C31.383 27.0853 32.1323 26.382 32.5901 25.4942C33.0479 24.6064 33.1863 23.5882 32.9822 22.6104C32.7781 21.6326 32.2438 20.7548 31.469 20.1243C30.6943 19.4938 29.7262 19.1491 28.7273 19.1479H27.6307C27.3548 18.0795 26.8289 17.092 26.0965 16.2668C25.364 15.4415 24.4459 14.8022 23.4179 14.4014C22.3898 14.0007 21.2812 13.8499 20.1835 13.9617C19.0858 14.0735 18.0303 14.4446 17.1041 15.0443C16.178 15.6441 15.4076 16.4554 14.8565 17.4113C14.3054 18.3672 13.9894 19.4405 13.9345 20.5425C13.8796 21.6446 14.0874 22.7439 14.5408 23.7498C14.9942 24.7558 15.6801 25.6396 16.5421 26.3284"
        stroke="#252B61"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default FeatureIcon;
