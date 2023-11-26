import React from "react";

const StatusTag = ({ status }) => {
  let className = "text-sm font-medium mr-2 px-2.5 py-0.5 rounded ";
  switch (status) {
    case "Available":
      className += "bg-green-100 text-green-800";
      break;
    case "Adopted":
      className += "bg-blue-100 text-blue-800";
      break;
    case "Pending":
      className += "bg-yellow-100 text-yellow-800";
      break;
    case "Withdrawn":
      className += "bg-gray-400 text-gray-800";
      break;
    default:
      break;
  }
  return (
    <div className="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">
      <span className={className}> {status} </span>
    </div>
  );
};

export default StatusTag;
