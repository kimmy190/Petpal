import { useUserContext } from "../../contexts/UserContext";
import React, { useState } from 'react';

const Notification = () => {
    const {user, loading} = useUserContext();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return(
        <>
        <button
            id="dropdownNotificationButton"
            data-dropdown-toggle="dropdownNotification"
            data-dropdown-offset-distance={26}
            data-dropdown-offset-skidding={-100}
            className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none"
            type="button"
            onClick={handleDropdownToggle}
        >
            <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 14 20"
            >
            <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
            </svg>
            <div className="relative flex">
            <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3" />
            </div>
        </button>
        {/* Notification Dropdown menu */}
        <div
            id="dropdownNotification"
            // className="z-20 hidden w-full max-w-xs bg-white border divide-y divide-gray-100 rounded-lg shadow sm:max-w-sm"
            className={`z-20 ${isDropdownOpen ? 'block' : 'hidden'} w-full max-w-xs bg-white border divide-y divide-gray-100 rounded-lg shadow sm:max-w-sm`}
            aria-labelledby="dropdownNotificationButton"
        >
            <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50">
            Notifications
            </div>
            <div className="divide-y divide-gray-100">
            <a href="#" className="flex px-4 py-3 hover:bg-gray-100">
                <div className="w-full pl-3">
                <div className="text-gray-500 text-sm mb-1.5 ">
                    New message from{" "}
                    <span className="font-semibold text-gray-900">
                    Toronto Adoption Community
                    </span>
                    : "We've received your application for DunDun!"
                </div>
                <div className="text-xs text-blue-600">a few moments ago</div>
                </div>
            </a>
            <a href="#" className="flex px-4 py-3 hover:bg-gray-100">
                <div className="w-full pl-3">
                <div className="text-gray-500 text-sm mb-1.5">
                    <span className="font-semibold text-gray-900">Timmy</span> has been
                    adopted!
                </div>
                <div className="text-xs text-blue-600">10 minutes ago</div>
                </div>
            </a>
            <a href="#" className="hidden md:flex md:px-4 md:py-3 hover:bg-gray-100">
                <div className="w-full pl-3">
                <div className="text-gray-500 text-sm mb-1.5 ">
                    <span className="font-semibold text-gray-900">
                    Toronto Community Centre
                    </span>{" "}
                    has posted <span className="font-medium text-gray-900 ">2 new</span>{" "}
                    pets!
                </div>
                <div className="text-xs text-blue-600 ">44 minutes ago</div>
                </div>
            </a>
            <a href="#" className="hidden md:flex md:px-4 md:py-3 hover:bg-gray-100">
                <div className="w-full pl-3">
                <div className="text-gray-500 text-sm mb-1.5 ">
                    <span className="font-semibold text-gray-900 ">
                    Toronto Community Centre
                    </span>{" "}
                    has left a reply!{" "}
                    <span className="font-medium text-blue-500" href="#">
                    @sean.song
                    </span>{" "}
                    It costs ...
                </div>
                <div className="text-xs text-blue-600 ">1 hour ago</div>
                </div>
            </a>
            </div>
            <a
            href="#"
            className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100"
            >
            <div className="inline-flex items-center ">
                <svg
                className="w-4 h-4 mr-2 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
                >
                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                View all
            </div>
            </a>
        </div>
    </>
    );
}

export default Notification; 