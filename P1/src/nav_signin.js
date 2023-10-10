document.write(`
<!-- Navbar -->
<nav class="border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="./main.html" class="flex items-center">
            <span class="self-center text-3xl font-bold whitespace-nowrap">Pet Pal</span>
        </a>
        <div class="flex md:order-2 items-center space-x-4">
            <a href="./login.html" class="text-black text-base hover:underline font-medium">Login</a>
            <!-- <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button> -->

            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar"
                class="flex items-center justify-between text-white bg-gray-800 hover:bg-gray-300 hover:text-black focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0">
                Sign Up
                <!-- <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg> -->
            </button>
            <!-- Dropdown menu -->
            <div id="dropdownNavbar"
                class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                    <li>
                        <a href="./seeker_signup.html" class="block px-4 py-2 hover:bg-gray-100">Seeker</a>
                    </li>
                    <li>
                        <a href="./first_shelter_signup.html"
                            class="block px-4 py-2 hover:bg-gray-100">Shelter</a>
                    </li>
                </ul>
            </div>
            <button data-collapse-toggle="navbar-cta" type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-cta" aria-expanded="false">
                <!-- hamburger icon -->
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>
        </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
            <ul
                class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-50 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                <li>
                    <a href="./main.html"
                        class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:bg-transparent md:bg-gray-100 md:p-0"
                        aria-current="page">Home</a>
                </li>
                <li>
                    <a href="#"
                        class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:hover:bg-transparent md:p-0">About</a>
                </li>
                <li>
                    <a href="./adopt_signup.html"
                        class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:hover:bg-transparent md:p-0">Adopt</a>
                </li>
                <li>
                    <a href="#"
                        class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:underline md:hover:bg-transparent md:p-0">Contact</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

`); 