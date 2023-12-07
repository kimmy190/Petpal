import React, { useState } from 'react';


const Chatbox = () => {
    const [isChatboxOpen, setIsChatboxOpen] = useState(false);

    const handleChatboxToggle = () => {
        setIsChatboxOpen(!isChatboxOpen);
    };

    return (
        <div>
            <div className="grid-cols-1 sm:grid md:grid-cols-1 p-4">
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        style={{ height: 'fit-content' }}
                        data-te-ripple-init
                        id="liveChatButton"
                        onClick={handleChatboxToggle}
                    >
                        Open Chat
                    </button>
                </div>

                <section id="chatbox" className={isChatboxOpen ? '' : 'hidden'}>
                    <div className="container">
                        <div className="bg-gray-200 rounded-lg">
                            <div className="bg-blue-500 text-white p-4 flex justify-center mb-4 items-center" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                <div className="rounded-full w-[50px] h-[50px] mr-1 mb-1">
                                    <img src="resources/shelter/shelter_logo.png" alt="Logo"></img>
                                </div>
                                <div className="inline-block rounded px-6 pb-[6px] pt-2 font-bold" style={{ height: 'fit-content' }} data-te-ripple-init id="liveChatButton">
                                    Toronto Adoption Shelter
                                </div>
                            </div>
                            <div className="grid-cols-1 sm:grid md:grid-cols-1 p-4">
                                <div className="mt-4 flex">
                                    <input
                                        type="text"
                                        className="w-3/4 p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                        placeholder="Type your message here"
                                    />
                                    <button className="w-1/4 bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Chatbox;