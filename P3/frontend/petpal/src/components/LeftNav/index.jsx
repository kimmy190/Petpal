import SignUpDropDown from "../SignUpDropDown";
import React, { useEffect } from 'react';
import { useState } from 'react';
// import { UserContext, useUserContext } from "../../contexts/UserContext";
import Cookies from 'universal-cookie';
import { useNavigate, Link } from 'react-router-dom';
import Notification from "../Notification";
import ProfileDropdown from "../ProfileDropdown";

import { useUserContext } from "../../contexts/UserContext";


const LeftNav = () => {
    const cookies = new Cookies();
    const { user, loading } = useUserContext();

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [dropDownClick, setDropDownClick] = useState(false);

    
    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const closeMenu = () => {
        setIsMenuVisible(false);
    };

    const token = cookies.get('access_token')
    console.log(dropDownClick);
    return (
        <>
        {/* <h1>{user.username}</h1> */}
        { token === undefined ? 
        
        <div className="flex md:order-2 items-center space-x-4">
        <a
            href="./login.html"
            className="text-black text-base hover:underline font-medium"
        >
            Login
        </a>

        <button
            id="dropdownNavbarLink"
            // data-dropdown-toggle="dropdownNavbar"
            data-dropdown-toggle="dropdownNavbar"
            data-dropdown-offset-distance={35}
            data-dropdown-offset-skidding={0}
            className="flex items-center justify-between text-white bg-gray-800 hover:bg-gray-300 hover:text-black focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0"
            onClick={() => {setDropDownClick(!dropDownClick)}}
        >
            Sign Up
        </button>
        {/* Dropdown menu */}
        {dropDownClick ? (
            <div
            id="dropdownNavbar"
            className="z-10 top-16 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute"
            aria-orientation="vertical"
            tabIndex={-1}
            style={{
                
            }}
            // style={{
            //     position: "absolute", 
            //     top: "calc(100% + 20)", // Adjust the top position as needed
            //     right: "0", // Adjust the left position as needed
            // }}
            // aria-labelledby="dropdownDefault"
            // style={{
            //     position: "absolute",
            //     inset: "0px auto auto 0px",
            //     margin: 0,
            //     transform: "translate3d(1200px, 62px, 0px)"
            //     // transform: "translate3d(1369.5px, 62px, 0px)"
            // }}
            // data-popper-placement="bottom"
        >
            <div className="py-1">
            <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDefault"

            // aria-labelledby="dropdownLargeButton"
            >
            <li>
                <Link to="signup/seeker"
                className="block px-4 py-2 hover:bg-gray-100"
                >
                Seeker
                </Link>
            </li>
            <li>
                <Link to="signup/shelter"
                className="block px-4 py-2 hover:bg-gray-100"
                >
                Shelter
                </Link>
            </li>
            </ul>
            </div>
        </div>
        ) : <></>}
        
        {/* hamburger icon */}
            <button
                data-collapse-toggle="navbar-cta"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
        </div>
        :
        <div className="flex items-center md:order-2">
            <Notification/>
            <ProfileDropdown />
            {/* hamburger */}
            <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            onClick={toggleMenu}
            aria-expanded={isMenuVisible}

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