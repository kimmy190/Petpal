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
  const [user, setUser] = useState({ id: 1, first_name: "jack" });
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMTU3OTE5LCJpYXQiOjE3MDIwNzE1MTksImp0aSI6IjEwNzVkYTIwN2RhODRmMzJiNDY3ZmM0ZjAyZTU4NTMyIiwidXNlcl9pZCI6NX0.N_Vzs8wUcQvF6ZcG73HJF-ptw2hIJSf0VlKg5Z7xcUQ"
  );

  return {
    user,
    setUser,
    token,
    setToken,
  };
};
