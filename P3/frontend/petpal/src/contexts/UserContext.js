import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";

export const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const useToken = () => {
  const cookies = new Cookies();
  const token = cookies.get("access_token");
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
        const token = cookies.get("access_token"); //localStorage.getItem('accessToken');
        // console.log("FETCH USER IN USER CONTEXT")
        if (token) {
          // If a token is present, fetch the current user
          const response = await fetch("/accounts/user/", {
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
            cookies.remove("access_token");
            // localStorage.removeItem('accessToken');
          }
        } else {
          // No token found
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false); //loading is set to false when done
      }
    };

    // Call the fetchUser function when the component mounts
    // const token = cookies.get('access_token');
    const token = cookies.get("access_token");
    updateToken(token);
    fetchUser();
  }, []);

  const signOut = () => {
    // Clear user-related data
    setUser(null);
    cookies.remove("access_token");
    setToken(null);
    // You might want to redirect the user to the login page after signing out
    // Example: window.location.href = '/login';
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, loading, signOut }}
    >
      {children}
    </UserContext.Provider>
  );
};
