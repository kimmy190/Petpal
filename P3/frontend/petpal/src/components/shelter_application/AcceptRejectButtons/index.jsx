import React from 'react';

const AcceptRejectButtons = ({ onAccept, onReject }) => {
    return (
        <div class="flex flex-col items-center md:flex-row justify-center">
            <a onClick={onAccept} className="cursor-pointer">
                <button type="button"
                    class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 md:mb-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Accept
                    Application
                </button>
            </a>

            <a onClick={onReject} className="cursor-pointer">
                <button type="button"
                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 md:mb-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reject
                    Application
                </button>
            </a>
        </div>
    );
};

export default AcceptRejectButtons;