import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({
  user: {},
  setUserName: () => {},
  token: "",
  setToken: "",
});

export const useUserContext = () => {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState({ shelter: { id: 1 } });
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMDc0NjQ0LCJpYXQiOjE3MDE5ODgyNDQsImp0aSI6IjIwMTFhNDU2YzBlNzQwNzg4ZDBjMjlkMTc1ZWFlYWZlIiwidXNlcl9pZCI6Nn0.2HJ0wfb0sMraQSWPTjSvchiZqsjGw1GcrwMIMVaSeCc"
  );

  return {
    user,
    setUser,
    token,
    setToken,
  };
};
