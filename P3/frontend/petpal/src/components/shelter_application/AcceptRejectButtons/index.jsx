import React, { useContext } from 'react';
import { UserContext } from "../../../contexts/UserContext";
import { useParams } from 'react-router-dom';


const AcceptRejectButtons = ({ onAccept, onReject }) => {
    const { user, token } = useContext(UserContext);
    const { application_id } = useParams();

    const handleAccept = async () => {
        try {
            const response = await fetch(`/applications/${application_id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: 'Accepted' }),
            });

            if (!response.ok) {
                throw new Error('Failed to Accept application');
            }

            onAccept();  // Trigger the provided callback after successful withdrawal
        } catch (error) {
            console.error('Error accepting application:', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await fetch(`/applications/${application_id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: 'Rejected' }),
            });

            if (!response.ok) {
                throw new Error('Failed to reject application');
            }

            onReject();  // Trigger the provided callback after successful withdrawal
        } catch (error) {
            console.error('Error rejecting application:', error);
        }
    };

    return (
        <div class="flex flex-col items-center md:flex-row justify-center">
            <a onClick={handleAccept} className="cursor-pointer">
                <button type="button"
                    class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 md:mb-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Accept
                    Application
                </button>
            </a>

            <a onClick={handleReject} className="cursor-pointer">
                <button type="button"
                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 md:mb-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reject
                    Application
                </button>
            </a>
        </div>
    );
};

export default AcceptRejectButtons;