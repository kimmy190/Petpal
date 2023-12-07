import { useState } from "react";
import { createContext, useContext } from "react";

export const UserContext = createContext({
    user: null,
    token: "",
    setUser: () => {},
    setToken: () => {},
    // resetUser: () => {}, 
});


export const useUserContext = () => {
  // const [user, setUser] = useState(null);
//   const [user, setUser] = useState({ shelter: { id: 1 } });
//   const [token, setToken] = useState(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxNjM3OTU5LCJpYXQiOjE3MDE1NTE1NTksImp0aSI6IjE5NWExMTJlNGNjNDQ3M2E4NWFlZmVjZjcwMjg1Njc4IiwidXNlcl9pZCI6Nn0.gZtki0NIS7H0-qLxZgf7SKPhIeUpMgp2TiMioBTaGmw"
//   );
    // const [user, setUser] = useState({ shelter: { id: 1 } });
    // const [token, setToken] = useState(
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxNjM3OTU5LCJpYXQiOjE3MDE1NTE1NTksImp0aSI6IjE5NWExMTJlNGNjNDQ3M2E4NWFlZmVjZjcwMjg1Njc4IiwidXNlcl9pZCI6Nn0.gZtki0NIS7H0-qLxZgf7SKPhIeUpMgp2TiMioBTaGmw"
    // );
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");

    // const resetUser = () => {
    //     // Reset both user and token to their initial state
    //     setUser({});
    //     setToken("");
    // };

    return {
            user,
            setUser,
            token,
            setToken,
            // resetUser,
        };

};

export const usePrevUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    } 
    return context;
};