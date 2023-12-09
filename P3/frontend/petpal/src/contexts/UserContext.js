import { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'universal-cookie';


// export const UserContext = createContext({
//     user: null,
//     token: "",
//     setUser: () => {},
//     setToken: () => {},
//     // resetUser: () => {}, 
// });
export const UserContext = createContext(); 

export const useUserContext = () => {
    
    return useContext(UserContext);
};

export const useToken = () => {
    const cookies = new Cookies();
    const token = cookies.get('access_token');
    return token;
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // set the token 
    const [token, setToken] = useState(null); 
    const cookies = new Cookies();

    const [loading, setLoading] = useState(true);

    const updateToken = (newToken) => {
        setToken(newToken);
    };
    
    // const token = cookies.get('access_token');

    useEffect(() => {
        const fetchUser = async () => {
        try {
            // Check if a token is stored (you might use localStorage or sessionStorage)
            const token = cookies.get('access_token'); //localStorage.getItem('accessToken');
            // console.log("FETCH USER IN USER CONTEXT")
            console.log(token)

            if (token) {
            // If a token is present, fetch the current user
            const response = await fetch('/accounts/user/', {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                // Handle invalid/expired token or other errors
                setUser(null);
                cookies.remove('access_token'); 
                // localStorage.removeItem('accessToken');
            }
            } else {
            // No token found
            setUser(null);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);
        } 
        finally {
            setLoading(false); //loading is set to false when done
        }
        };

        // Call the fetchUser function when the component mounts
        // const token = cookies.get('access_token');
        const token = cookies.get('access_token');
        updateToken(token); 
        fetchUser();
    }, []);

    const signOut = () => {
        // Clear user-related data
        setUser(null);
        cookies.remove('access_token');
        // You might want to redirect the user to the login page after signing out
        // Example: window.location.href = '/login';
    };

    return (
        <UserContext.Provider value={{ user, setUser, token, loading, signOut}}>
        {children}
        </UserContext.Provider>
    );
};


// export const useUserContext = () => {
//   // const [user, setUser] = useState(null);
// //   const [user, setUser] = useState({ shelter: { id: 1 } });
// //   const [token, setToken] = useState(
// //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxNjM3OTU5LCJpYXQiOjE3MDE1NTE1NTksImp0aSI6IjE5NWExMTJlNGNjNDQ3M2E4NWFlZmVjZjcwMjg1Njc4IiwidXNlcl9pZCI6Nn0.gZtki0NIS7H0-qLxZgf7SKPhIeUpMgp2TiMioBTaGmw"
// //   );
//     // const [user, setUser] = useState({ shelter: { id: 1 } });
//     // const [token, setToken] = useState(
//     //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxNjM3OTU5LCJpYXQiOjE3MDE1NTE1NTksImp0aSI6IjE5NWExMTJlNGNjNDQ3M2E4NWFlZmVjZjcwMjg1Njc4IiwidXNlcl9pZCI6Nn0.gZtki0NIS7H0-qLxZgf7SKPhIeUpMgp2TiMioBTaGmw"
//     // );
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState("");

//     // const resetUser = () => {
//     //     // Reset both user and token to their initial state
//     //     setUser({});
//     //     setToken("");
//     // };

//     return {
//             user,
//             setUser,
//             token,
//             setToken,
//             // resetUser,
//         };

// };

// export const usePrevUser = () => {
//     const context = useContext(UserContext);
//     if (!context) {
//         throw new Error('useUserContext must be used within a UserProvider');
//     } 
//     return context;
// };