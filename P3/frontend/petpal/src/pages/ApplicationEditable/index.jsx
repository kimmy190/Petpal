import React from 'react'
import { useContext, useEffect, useState } from "react";
import Chatbox from '../../components/shelter_application/Chatbox';
import Header from '../../components/shelter_application/Header';
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import EditableApplication from "../../components/EditableApplication"

const UserApplication = () => {
    const [applicationStatus, setApplicationStatus] = useState('Pending');
    const { user, token } = useContext(UserContext);

    console.log('userApplication')
    return (
        <div className="flex flex-col justify-center items-center bg-gray-50 py-4">
            <Header />
            {/* make sure shelter cannot create applications? or backend check? */}
            <EditableApplication />
        </div>
    );
};

export default UserApplication;