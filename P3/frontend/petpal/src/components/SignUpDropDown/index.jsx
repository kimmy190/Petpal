'use client';
import React from 'react';
import { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';
import { Dropdown, DropdownItem } from 'flowbite-react';
import { Link } from 'react-router-dom';

const customTheme = {
    "arrowIcon": "ml-2 h-4 w-4",
    "content": "py-1 focus:outline-none",
    "floating": {
    "animation": "transition-opacity",
    "arrow": {
        // "base": "absolute z-10 h-2 w-2 rotate-45",
        "style": {
            // "dark": "bg-gray-900 dark:bg-gray-700",
            // "light": "bg-white",
            // "auto": "bg-white dark:bg-gray-700",
            "display":"none"
        },
        // "placement": "-4px"
    },
    "base": "z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none",
    "content": "py-1 text-sm text-gray-700",
    "divider": "my-1 h-px bg-gray-100 ",
    "header": "block py-2 px-4 text-sm text-gray-700 ",
    "hidden": "invisible opacity-0",
    "item": {
        "container": "",
        "base": "flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
        "icon": "mr-2 h-4 w-4"
    },
    "style": {
        // "dark": "bg-gray-900 text-white dark:bg-gray-700",
        "dark": "none",
        "light": "border border-gray-200 bg-white text-gray-900",
        "auto": "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white"
    },
    "target": "w-fit"
    },
    "inlineWrapper": "flex items-center"
}; 


function SignUpDropDown() {
  return (
    // <Flowbite theme={{ theme: customTheme }}>
    // <Dropdown label="Sign Up" theme={{ theme: customTheme }}>
    //     <Dropdown.Item >Seeker</Dropdown.Item>
    //     <Dropdown.Item>Shelter</Dropdown.Item>
    // </Dropdown>
    // </Flowbite>
    <>
    <button
        type="button"
        // className="group flex items-center justify-center p-0.5 text-center font-medium relative text-white bg-gray-800 hover:text-black hover:bg-gray-300 focus:ring-blue-100 rounded-lg"
        className="flex items-center justify-center p-0.5 mr-3 text-sm font-medium text-center text-white bg-gray-800 rounded-lg group hover:bg-gray-300 hover:text-black focus:ring-blue-100 md:mr-0 transition-all duration-0"
        color="bg-gray-800"
        data-testid="flowbite-dropdown-target"
        aria-expanded="false"
        aria-haspopup="menu"
        id=":r3:"
    >
        <span className="flex items-center px-4 py-2 text-sm transition-all duration-200 rounded-md">
        Sign Up
        </span>
    </button>

    <div
        data-testid="flowbite-dropdown"
        aria-expanded="true"
        tabIndex={-1}
        className="z-10 text-gray-900 transition-opacity duration-100 bg-white border border-gray-200 divide-y divide-gray-100 rounded shadow w-fit focus:outline-none dark:border-none dark:bg-gray-700 dark:text-white"
        id=":r2:"
        role="menu"
        aria-labelledby=":r3:"
        aria-orientation="vertical"
        style={{
        position: "absolute",
        left: 0,
        top: 0,
        minWidth: 110,
        transform: "translate(311.5px, 192px)",
        willChange: "transform"
        }}
    >
        <ul className="py-1 focus:outline-none" tabIndex={-1}>
        <li role="menuitem" className="">
            <Link to="/signup/seeker"
            type="button"
            className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white"
            tabIndex={-1}
            >
            Seeker
            </Link>
        </li>
        <li role="menuitem" className="">
            <button
            type="button"
            className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white"
            tabIndex={-1}
            href="#/seeker/signup"
            >
            Shelter
            </button>
        </li>
        </ul>
    </div>
</>

    
    
  );
}

export default SignUpDropDown;


{/* <button type="button" class="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2 w-fit" data-testid="flowbite-dropdown-target" aria-expanded="false" aria-haspopup="menu" id=":r3:">
        <span class="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
            Sign Up
        </span>
    </button>

    <div data-testid="flowbite-dropdown" aria-expanded="true" tabindex="-1" class="z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none transition-opacity duration-100 border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white" id=":r2:" role="menu" aria-labelledby=":r3:" aria-orientation="vertical" style="position: absolute; left: 0px; top: 0px; min-width: 110px; transform: translate(311.5px, 192px); will-change: transform;">
        <ul class="py-1 focus:outline-none" tabindex="-1">
            <li role="menuitem" class="">
                <button type="button" class="flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white" tabindex="-1">
                    Seeker
                </button>
            </li>
            <li role="menuitem" class="">
                <button type="button" class="flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white" tabindex="-1">
                Shelter
                </button>
            </li>
        </ul>
    </div> */}
        

