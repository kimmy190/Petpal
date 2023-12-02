import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({
  user: {},
  setUserName: () => { },
  token: "",
  setToken: "",
});

export const useUserContext = () => {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState({ seeker: { id: 1 } });
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxNTY5ODkzLCJpYXQiOjE3MDE0ODM0OTMsImp0aSI6IjVjMjZkNjQzY2JkMzQ4NDg4MTZhMTY2OWNiYjczNDBiIiwidXNlcl9pZCI6NX0.YvpZvncWj4sy4Yhjgo6RmT6xDqAihmohjQ9dSHwLyWA"
  );

  return {
    user,
    setUser,
    token,
    setToken,
  };
};
