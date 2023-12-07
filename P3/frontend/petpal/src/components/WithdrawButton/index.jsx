import React, { useContext } from 'react';
import { UserContext } from "../../contexts/UserContext";
import { useParams } from 'react-router-dom';

const WithdrawButton = ({ onWithdraw }) => {
    const { user, token } = useContext(UserContext);
    const { application_id } = useParams();

    const handleWithdrawal = async () => {
        try {
            const response = await fetch(`/applications/${application_id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: 'Withdrawn' }),
            });

            if (!response.ok) {
                throw new Error('Failed to withdraw application');
            }

            onWithdraw();  // Trigger the provided callback after successful withdrawal
        } catch (error) {
            console.error('Error withdrawing application:', error);
        }
    };

    return (
        <div className="flex flex-col items-center md:flex-row justify-center">
            <a onClick={handleWithdrawal} className="cursor-pointer">
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                        Withdraw Application
                    </button>
                </div>
            </a>
        </div>
    );
};

export default WithdrawButton;
