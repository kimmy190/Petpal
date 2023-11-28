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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxMjMxNjM2LCJpYXQiOjE3MDExNDUyMzYsImp0aSI6IjQ0OGI3MTFhMzg1MDRkODhhMDgxNTdhMTRiZGY2ODk0IiwidXNlcl9pZCI6MTN9.W2Ia-Pha4fsUd5FRpXopZGVk2JAcoXScQ9UhMrzMNn0"
  );

  return {
    user,
    setUser,
    token,
    setToken,
  };
};
