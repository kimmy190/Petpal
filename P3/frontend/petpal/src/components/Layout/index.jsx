import { Outlet, Link } from "react-router-dom";
// import { Dropdown, Button } from 'flowbite-react';
import LeftNav from "../LeftNav";
import React, { useEffect } from "react";
import { useUserContext, usePrevUser, UserContext} from "../../contexts/UserContext";


const Layout = () => {
    const { user, token } = usePrevUser();

    useEffect(() => {
        // Do something with updated user and token values
        console.log("Updated user:", user);
        console.log("Updated token:", token);
    }, [user, token]);
    
    
    return <UserContext.Provider value={{ user, token }}>
        
    <nav className="border-gray-200">
    <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <a href="/main" className="flex items-center">
            <span className="self-center text-3xl font-bold whitespace-nowrap">
            Pet Pal
            </span>
        </a>
        
        {/* this will be replaced when log in  */}
        <LeftNav user={user} token={token}/>
        {/* <LeftNav /> */}
        
        <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
        >
            <ul className="flex flex-col p-4 mt-4 font-medium border rounded-lg md:p-0 border-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
                <Link to="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:bg-transparent md:bg-gray-100 md:p-0"
                aria-current="page"
                >
                Home
                </Link>
            </li>
            <li>
                <Link to="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:hover:bg-transparent md:p-0"
                >
                About
                </Link>
            </li>
            <li>
                <Link to="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:hover:bg-transparent md:p-0"
                >
                Adopt
                </Link>
            </li>
            <li>
                <Link to="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:hover:bg-transparent md:p-0"
                >
                Contact
                </Link>
            </li>
            </ul>
        </div>
    </div>

    </nav>
    <Outlet/>
    </UserContext.Provider>; 
}

export default Layout;