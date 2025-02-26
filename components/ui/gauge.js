import React from "react";

const Gauge = ({ value, max, unit }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 50">
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="10"
          />
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="#ff5733"
            strokeWidth="10"
            strokeDasharray={`${percentage}, 100`}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
          {value} {unit}
        </div>
      </div>
    </div>
  );
};

export default Gauge;
