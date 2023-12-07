import SignUpDropDown from "../SignUpDropDown";
import { UserContext, useUserContext } from "../../contexts/UserContext";

const LeftNav = ({user, token}) => {
    
    return (
        <>
        { token === "" ? 
         <div className="flex items-center space-x-4 md:order-2">
            <a href="/login"
            className="text-base font-medium text-black hover:underline"
            >
            Login
            </a>
            {/* <button type="button" class="px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button> */}
            {/* Signn up dropdown section */}
            <SignUpDropDown /> 
            {/* Drop down menu end */}
            {/* hamburger icon */}
            <button
                data-collapse-toggle="navbar-cta"
                type="button"
                className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-cta"
                aria-expanded="false"
            >
            <span className="sr-only">Open main menu</span>
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                >
                    <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                    />
                </svg>
            </button>
        </div>   :
        <div className="flex items-center md:order-2">
        {/* // notification 
        // profile dropdown  */}
            <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded="false"
            >
            <span className="sr-only">Open main menu</span>
            <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
            >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
            />
            </svg>
        </button>
        </div>
        }
        </>
        
    );
}

export default LeftNav; 