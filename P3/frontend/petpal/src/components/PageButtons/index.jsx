const PageButtons = ({ page, setPage, disableRightButton }) => {
  return (
    <div className="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={
          "w-6 h-6 mr-2 " + (page === 1 ? "text-gray-300" : "cursor-pointer")
        }
        onClick={() => {
          if (page !== 1) {
            setPage(page - 1);
          }
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      Page {page}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={
          "w-6 h-6 ml-2 " +
          (disableRightButton ? "text-gray-300" : "cursor-pointer")
        }
        onClick={() => {
          if (!disableRightButton) {
            setPage(page + 1);
          }
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
};

export default PageButtons;
