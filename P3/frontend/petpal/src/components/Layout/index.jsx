import { Outlet, Link } from "react-router-dom";
// import { Dropdown, Button } from 'flowbite-react';
import LeftNav from "../LeftNav";
import React, { useEffect } from "react";
import { useUserContext, usePrevUser, UserContext} from "../../contexts/UserContext";

const Layout = () => {
    return (<>
    <nav className="border-gray-200">
    <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <Link to="/main" className="flex items-center">
            <span className="self-center text-3xl font-bold whitespace-nowrap">
              Pet Pal
            </span>
          </Link>

          {/* this will be replaced when log in  */}
          <LeftNav />
          {/* <LeftNav /> */}

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col p-4 mt-4 font-medium border rounded-lg md:p-0 border-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <Link
                  to="/main"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:bg-transparent md:bg-gray-100 md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:hover:bg-transparent md:p-0"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:hover:bg-transparent md:p-0"
                >
                  Adopt
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:hover:bg-transparent md:p-0"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />

      <footer className="bg-gray-200 rounded-lg shadow">
        <div className="w-full max-w-screen-xl p-4 py-8 mx-auto lg:py-12 lg:pb-16">
          <div className="mt-4 sm:flex sm:items-center sm:justify-between">
            <a href="./main.html" className="flex items-center mb-4 sm:mb-0">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" /> */}
              <span className="self-center text-2xl font-semibold text-gray-600 whitespace-nowrap">
                Pet Pal
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-6" />
          <div className="mb-4 sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center">
              © 2023{" "}
              <a href="./main.html" className="hover:underline">
                PetPal™
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
