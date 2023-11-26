import React from "react";

const SideBySide = ({ children }) => {
  const childArr = React.Children.toArray(children);

  return (
    <div className="flex flex-col border bg-white border-gray-300 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] md:flex-row md:max w-full">
      {childArr[0]}
      {childArr[1]}
    </div>
  );
};

export default SideBySide;
