document.write(`
<!-- Navbar (You can customize it as needed) -->
    <nav class="border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="./main_after_login.html" class="flex items-center">
                <span class="self-center text-3xl font-semibold whitespace-nowrap">Pet Pal</span>
            </a>
            <div class="flex items-center md:order-2 items-center">
                <!-- Notification bell drop down -->    
                <button id="dropdownNotificationButton" data-dropdown-toggle="dropdownNotification" data-dropdown-offset-distance="26" data-dropdown-offset-skidding="-100" class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none" type="button"> 
                    <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                        <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"/>
                    </svg>
                    <div class="relative flex">
                    <div class="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3"></div>
                    </div>
                    </button>
                    
                    <!-- Notification Dropdown menu -->
                    <div id="dropdownNotification" class="hidden z-20 w-full max-w-xs sm:max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow border" aria-labelledby="dropdownNotificationButton">
                    <div class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50">
                        Notifications
                    </div>
                    <div class="divide-y divide-gray-100">
                        <a href="#" class="flex px-4 py-3 hover:bg-gray-100">

                        <div class="w-full pl-3">
                            <div class="text-gray-500 text-sm mb-1.5 ">New message from <span class="font-semibold text-gray-900">Toronto Adoption Community</span>: "Hello! DunDun is available for adoption!"</div>
                            <div class="text-xs text-blue-600">a few moments ago</div>
                        </div>
                        </a>

                        <a href="#" class="flex px-4 py-3 hover:bg-gray-100">

                        <div class="w-full pl-3">
                            <div class="text-gray-500 text-sm mb-1.5"><span class="font-semibold text-gray-900">Timmy</span> has been adopted!</div>
                            <div class="text-xs text-blue-600">10 minutes ago</div>
                        </div>
                        </a>

                        <a href="#" class="hidden md:flex md:px-4 md:py-3 hover:bg-gray-100">

                        <div class="w-full pl-3">
                            <div class="text-gray-500 text-sm mb-1.5 "><span class="font-semibold text-gray-900">Toronto Community Centre</span> has posted <span class="font-medium text-gray-900 ">2 new</span> pets!</div>
                            <div class="text-xs text-blue-600 ">44 minutes ago</div>
                        </div>
                        </a>

                        <a href="#" class="hidden md:flex md:px-4 md:py-3 hover:bg-gray-100">
                        <div class="w-full pl-3">
                            <div class="text-gray-500 text-sm mb-1.5 "><span class="font-semibold text-gray-900 ">Toronto Community Centre</span> has left a reply! <span class="font-medium text-blue-500" href="#">@sean.song</span> It costs ...</div>
                            <div class="text-xs text-blue-600 ">1 hour ago</div>
                        </div>
                        </a>

                    </div>
                    <a href="#" class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100">
                        <div class="inline-flex items-center ">
                        <svg class="w-4 h-4 mr-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                        </svg>
                            View all
                        </div>
                    </a>
                </div>
    
                <!-- End of notification bell dropdown -->

                <!-- Profile Button  -->
                <!-- <div class="relative">
                    <img class="w-10 h-10 rounded-full" src="./resources/default-profile-image.jpg" alt="">
                    <span class="top-0 left-7 absolute  w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>
                </div> -->
                
                <button type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-offset-distance="20" data-dropdown-offset-skidding="-60">
                    <span class="sr-only">Open user menu</span>
                    <!-- when no custom image , will insert this tag -->
                    <!-- <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div> -->
                    <div class="relative">
                        <img class="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" src="./resources/users/user_1.png" alt="">
                        <!-- <span class="top-0 left-7 absolute w-3.5 h-3.5 bg-red-500 border-2 border-white md:w-0 md:h-0 md:border-0 md:border-none rounded-full"></span> -->
                    </div>
                </button>
                <!-- Dropdown menu -->
                <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow border" id="user-dropdown">
                    <div class="px-4 py-3 bg-gray-50">
                        <span class="block text-sm text-gray-900 font-medium">Sean Song</span>
                        <span class="block text-sm  text-gray-500 truncate">sean.song@gmail.com</span>
                    </div>
                    <ul class="py-2" aria-labelledby="user-menu-button">
                        <li>
                        <a href="./seeker_update.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                        </li>
                        <li>
                            <a href="./list_seeker_applications.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Application</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Saved</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Notification</a>
                        </li>
                    </ul>
                    <div class="py-1">
                        <a href="./main.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                    </div>
                </div>
                <!-- hamburger -->
                <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-user" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
        </div>

        <!-- Middle section -->
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                <li>
                <a href="./main_after_login.html" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:bg-transparent md:bg-gray-100 md:p-0" aria-current="page">Home</a>
                </li>
                <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:hover:bg-transparent md:p-0">About</a>
                </li>
                <li>
                <a href="./adopt_login.html" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:hover:bg-transparent md:p-0">Adopt</a>
                </li>
                <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:hover:bg-transparent md:p-0">Contact</a>
                </li>
            </ul>
        </div>
    </div>
    </nav>

`);