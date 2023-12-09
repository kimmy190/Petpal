import Cookies from 'universal-cookie';
import { useUserContext } from '../../contexts/UserContext';
import { Dropdown, DropdownItem, Avatar } from 'flowbite-react';
// import { Avatar, Link } from 'flowbite-react';
import React, { useState } from 'react';
import ProfileImage from '../ProfileImage';
import { useNavigate, Link } from "react-router-dom";
import ProfileDropDownImage from '../ProfileDropDownImage';


const ProfileDropdown = () => {
    const navigate = useNavigate(); 
    const {user, loading, signOut} = useUserContext();
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const handleUserDropdownToggle = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const handleSignOut = () => {
        signOut(); // Call the signOut function from the useUserContext hook
        navigate('/main'); // Redirect to the /main page after signing out
    };

    if(user){
    
    return (
    <>
    <button
        type="button"
        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-offset-distance={20}
        data-dropdown-offset-skidding={-60}
        onClick={handleUserDropdownToggle}
    >
        <span className="sr-only">Open user menu</span>

        <div className="relative">
        {/* <ProfileImage user={user} className="object-cover w-8 h-8 rounded-full md:w-10 md:h-10"
        /> */}
        <ProfileDropDownImage/>

        
         {/* <ProfileDropDownImage user={user}/> */}
        </div>
    </button>
    {/* Dropdown menu */}
    <div
        // className="z-50 hidden my-4 text-base list-none bg-white border divide-y divide-gray-100 rounded-lg shadow"
        // id="user-dropdown"
        className={`z-50 ${isUserDropdownOpen ? 'absolute' : 'hidden'} my-4 text-base list-none bg-white border divide-y divide-gray-100 rounded-lg shadow top-16`}
                id="user-dropdown"
    >
        <div className="px-4 py-3 bg-gray-50">
        <span className="block text-sm font-medium text-gray-900">
            {user.shelter ? user.shelter.organization_name : `${user.first_name} ${user.last_name}`}
            {/* {user.hasOwnProperty('shelter') ? user.shelter.organization_name : 
            user.first_name + " " + user.last_name} */}
        </span>
        <span className="block text-sm text-gray-500 truncate">
            {user.email}
        </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
        <li>
            <Link to="setting"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
            Settings
            </Link>
        </li>
        <li>
            <Link to="applications"
            // href="./list_seeker_applications.html"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
            My Application
            </Link>
        </li>

        {user.shelter ? 
        <li>
        <Link to={`shelter/${user.shelter.id}`}
        // href="./list_seeker_applications.html"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
        My Dashboard
        </Link>
    </li> : 
    <></>
        
    }
    
    
        </ul>
        <div className="py-1  hover:bg-gray-100">
        <button
            onClick={() => {
                handleSignOut();}}
            className="block px-4 py-2 text-sm text-gray-700"
        >
            Sign out
        </button>
        </div>
    </div>
    </>
    );
    }

}

export default ProfileDropdown; 

