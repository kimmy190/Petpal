const ErrorModal = ({ errorObj, show, setShow }) => {
  return (
    <>
      <div
        className={
          "pointer-events-none fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none " +
          (show ? "block" : "opacity-0 visibility-0")
        }
        tabindex="-1"
      >
        <div
          className={
            "pointer-events-none relative w-auto translate-y-[-50px] transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] " +
            (show ? "transform-none opacity-100" : "opacity-0")
          }
        >
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10 text-red-500 border-round bg-red-100 rounded-3xl p-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>

              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                {errorObj.title}
              </h5>
              <button
                type="button"
                onClick={() => {
                  setShow(false);
                }}
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="relative flex-auto p-4" data-te-modal-body-ref>
              {errorObj.body}
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          "pointer-events-none undefined transition-all duration-300 ease-in-out fixed top-0 left-0 z-[1040] bg-black w-screen h-screen " +
          (show ? "opacity-50 pointer-events-auto" : "opacity-0 visibility-0")
        }
      ></div>
    </>
  );
};

export default ErrorModal;
