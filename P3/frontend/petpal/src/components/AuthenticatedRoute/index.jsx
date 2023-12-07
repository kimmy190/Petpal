import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import {useUserContext} from "../../contexts/UserContext";

const AuthenticatedRoute = ({ children, ...rest }) => {
    const { user } = useUserContext();
    const navigate = useNavigate();

    // const isAuthenticated = user ? true : false;

    if (!user) {
        navigate('/home'); // Redirect to home if not authenticated
        return null; // Return null while redirecting
    }

    return children;
};

export default AuthenticatedRoute;
