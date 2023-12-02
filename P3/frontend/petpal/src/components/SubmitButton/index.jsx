import React from 'react';

const SubmitButton = ({ onClick }) => {
    return (
        <div className="flex justify-center">
            <button
                type="submit"
                className="bg-black text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                onClick={onClick} // Trigger the provided onClick function when the button is clicked
            >
                Submit
            </button>
        </div>
    );
};

export default SubmitButton;
