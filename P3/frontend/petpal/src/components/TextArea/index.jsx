import React from "react";

const TextArea = ({ title, rows, children, onChange, value }) => {
  return (
    <>
      <label
        htmlFor={`${title}_textarea`}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      />
      <textarea
        id={`${title}_textarea`}
        rows={rows}
        className="block p-2.5 w-full h-80 text- text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={`Enter ${title}`}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
      ></textarea>
    </>
  );
};

export default TextArea;
