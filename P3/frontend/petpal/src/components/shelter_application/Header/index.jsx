import React from 'react';

const Header = () => {
    return (<div class="flex justify-center items-center p-3">
        <a href="shelter_detail_user_view.html"
            class="relative flex justify-center text-center items-center transform transition duration-300 hover:scale-105">
            <div class="rounded-full w-6 h-6 mr-2 mb-1">
                <img src="resources/shelter/shelter_logo.png">
                </img>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 md:text-3xl lg:text-3xl">Toronto Adoption Center</h1>
            <div class="relative self-start ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>

            </div>

        </a>
    </div>);
}

export default Header;