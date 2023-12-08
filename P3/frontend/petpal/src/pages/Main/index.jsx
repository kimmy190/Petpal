import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useUserContext } from '../../contexts/UserContext';


const Main = () => {
    const cookies = new Cookies();
    const token = cookies.get('access_token'); 
    const { user, loading } = useUserContext();

    const navigate = useNavigate();

    // useEffect(() => {
    //     // Do something with updated user and token values
    //     // console.log("Updated user:", user);
    //     // console.log("Updated token:", token);
    //     console.log("navigatee")
    //     navigate(); 
    // }, [token, navigate]);


    return (
        <>
        {user !== null ? 
            <h1>{user.username}</h1> : 
            <h1>why null?</h1>
        }
        </>
    
    );
}

export default Main;