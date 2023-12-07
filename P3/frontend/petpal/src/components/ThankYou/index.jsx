import React from 'react';

const greenColor = { color: 'green' };

const ThankYou = () => {
    return (
        <div>
            <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" className="w-20 h-20" style={greenColor}>
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
            </div>

            <div className="flex text-5xl justify-center p-3" style={greenColor}>
                Thank you!
            </div>

            <div className="flex text-2xl justify-center font-bold p-3" style={greenColor}>
                You can see your completed application below.
            </div>
            <div className="flex text-1xl justify-center font-bold p-3">
                <div className="flex justify-start p-2 mb-20">
                    <ul className="list-disc">
                        <h1 className="font-bold text-1xl mb-4">Next Steps:</h1>
                        <li className="font-bold mb-4 ml-8">
                            Wait 5-7 business days for us to review your application.
                        </li>
                        <li className="font-bold mb-4 ml-8">
                            If needed, withdraw your application within 3 days of submitting.
                        </li>
                        <li className="font-bold mb-4 ml-8">
                            Be prepared to pay the fees within 10 days of acceptance.
                        </li>
                        <li className="font-bold ml-8">
                            If you have any questions, contact us through the chat below.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ThankYou;