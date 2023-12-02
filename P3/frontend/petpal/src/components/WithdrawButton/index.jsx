import React from 'react';

const WithdrawButton = ({ onAccept, onReject }) => {
    return (
        <div class="flex flex-col items-center md:flex-row justify-center">
            <a onClick={onAccept} className="cursor-pointer">
                <div class="flex justify-center">
                    <button type="button"
                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Withdraw
                        Application</button>
                </div>
            </a>
        </div>
    );
};

export default WithdrawButton;