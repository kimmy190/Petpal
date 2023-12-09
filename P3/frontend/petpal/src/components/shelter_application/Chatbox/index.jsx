import React from 'react';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";

const Chatbox = ({ }) => {
    const [isChatboxOpen, setIsChatboxOpen] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { application_id } = useParams();
    const { user, token } = useContext(UserContext);
    const [shelterName, setShelterName] = useState();
    const [userName, setUserName] = useState();

    const handleChatboxToggle = () => {
        setIsChatboxOpen(!isChatboxOpen);
    };

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSend = async () => {

        const response = await fetch(`http://localhost:8000/comments/application/${application_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            },
            body: JSON.stringify({ body: newMessage }),
        });
        if (response.ok) {
            // Fetch the updated chat history after sending the message
            fetchChatHistory();
            // Clear the input field
            setNewMessage('');
        } else {
            console.error('Error sending message:', response.statusText);
            // Handle error as needed
        }
    };

    const fetchChatHistory = async () => {

        const response = await fetch(`http://localhost:8000/comments/application/${application_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setChatHistory(data.results);
        } else {
            console.error('Error fetching chat history:', response.statusText);
            // Handle error as needed
        }
    };

    const fetchShelterName = async () => {
        try {
            const response = await fetch(`/applications/${application_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setShelterName(data.shelter.organization_name);
            } else {
                console.error('Error fetching shelter name:', response.statusText);
                setShelterName('Unknown Shelter');
            }
        } catch (error) {
            console.error('Error fetching shelter name:', error);
            setShelterName('Unknown Shelter');
        }
    };

    const fetchUserName = async () => {
        try {
            const response = await fetch(`/applications/${application_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserName(data.applicant.username);
            } else {
                console.error('Error fetching user name:', response.statusText);
                setUserName('Unknown User');
            }
        } catch (error) {
            console.error('Error fetching user name:', error);
            setUserName('Unknown User');
        }
    };


    useEffect(() => {
        if (isChatboxOpen) {
            // Fetch chat history when the chatbox is opened
            fetchChatHistory();
        }
        fetchShelterName();
        fetchUserName();

    }, [isChatboxOpen]);


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
                    {/* Header displaying the name of the other communicator */}
                    <div className="bg-blue-500 text-white p-4 rounded-t-lg">
                        <div className="flex justify-center">
                            <p className="text-lg font-semibold">
                                {/* user */}
                                {!user.shelter && (
                                    shelterName
                                )}

                                {user.shelter && (
                                    userName
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <div
                            className="bg-gray-200 rounded-b-lg"
                            style={{ display: 'flex', flexDirection: 'column-reverse', overflowY: 'scroll', maxHeight: '400px', width: '100%' }}
                        >

                            {/* Chat history */}
                            {!user.shelter && (
                                <div className="p-4">
                                    {chatHistory.slice().reverse().map((message) => (
                                        <div
                                            key={message.id}
                                            className={`message ${message.author === user.id ? 'sent' : 'received'}`}
                                            style={{
                                                backgroundColor: message.author === user.id ? '#a7e6a1' : '#ADD8E6',
                                                padding: '10px',
                                                margin: '5px',
                                                borderRadius: '12px',
                                                alignSelf: 'flex-start',
                                                width: 'fit-content',
                                                marginLeft: message.author === user.id ? 'auto' : '',
                                            }}
                                        >
                                            <p
                                                style={{
                                                    fontSize: '0.9rem',
                                                    color: message.author === user.id ? '#333' : '#666',
                                                    textAlign: message.author === user.id ? 'right' : 'left',
                                                }}
                                            >
                                                {message.body}
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: '0.8rem',
                                                    color: '#888',
                                                    textAlign: message.author === user.id ? 'right' : 'left',
                                                    marginTop: '5px',
                                                }}
                                            >
                                                {message.author === user.id ? 'You' : `${shelterName}`}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {user.shelter && (
                                <div className="p-4">
                                    {chatHistory.slice().reverse().map((message) => (
                                        <div
                                            key={message.id}
                                            className={`message ${message.author === user.shelter.user ? 'sent' : 'received'}`}
                                            style={{
                                                backgroundColor: message.author === user.shelter.user ? '#a7e6a1' : '#ADD8E6',
                                                padding: '10px',
                                                margin: '5px',
                                                borderRadius: '12px',
                                                alignSelf: 'flex-start',
                                                width: 'fit-content',
                                                marginLeft: message.author === user.shelter.user ? 'auto' : '',
                                            }}
                                        >
                                            <p
                                                style={{
                                                    fontSize: '0.9rem',
                                                    color: message.author === user.shelter.user ? '#333' : '#666',
                                                    textAlign: message.author === user.shelter.user ? 'right' : 'left',
                                                }}
                                            >
                                                {message.body}
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: '0.8rem',
                                                    color: '#888',
                                                    textAlign: message.author === user.shelter.user ? 'right' : 'left',
                                                    marginTop: '5px',
                                                }}
                                            >
                                                {message.author === user.shelter.user ? 'You' : `${userName}`}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                        {/* Input for new message */}
                        <div className="grid-cols-1 sm:grid md:grid-cols-1">
                            <div className="mt-4 flex">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={handleInputChange}
                                    className="w-3/4 p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                    placeholder="Type your message here"
                                />
                                <button className="w-1/4 bg-blue-500 text-white p-2 rounded-r-lg" onClick={handleSend}>
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Chatbox;
