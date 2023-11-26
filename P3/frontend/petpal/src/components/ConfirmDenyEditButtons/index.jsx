import React from "react";
import { Link } from "react-router-dom/dist";

const ConfrimDenyButton = ({ onConfirm, onDeny }) => {
  return (
    <>
      <div className="fixed hidden md:block md:inline-block right-8 top-24 lg:right-18 xl:right-24 z-50">
        <div className="relative bg-white rounded-full border border-gray-300 w-16 h-16 mb-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-center">
          <a onClick={onConfirm} className="cursor-pointer">
            <svg
              className="p-1 text-gray-900 hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </a>
        </div>
        <div className="relative bg-white rounded-full border border-gray-300 w-16 h-16  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-center">
          <a onClick={onDeny} className="cursor-pointer">
            <svg
              className="p-1 hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="fixed md:hidden bottom-0 right-0 z-50 p-3">
        <div className="relative bg-white rounded-full border border-gray-300 w-16 h-16 lg:w-14 lg:h-14 mb-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-center">
          <a onClick={onConfirm} className="cursor-pointer">
            <svg
              className="w-full p-1 text-gray-900 hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </a>
        </div>
        <div className="relative bg-white rounded-full border border-gray-300 w-16 h-16 lg:w-14 lg:h-14 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-center">
          <a onClick={onDeny} className="cursor-pointer">
            <svg
              className="w-full p-1 hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default ConfrimDenyButton;
