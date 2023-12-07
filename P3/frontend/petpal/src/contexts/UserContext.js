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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxOTc3MTg2LCJpYXQiOjE3MDE4OTA3ODYsImp0aSI6ImY3YTdmMThiNTBmYzRjOWE4NTg5ODQ0Y2MyZTAyMzJhIiwidXNlcl9pZCI6Nn0.sYf1gARmBaRR3j4BuUtCDk3tYhsY3edDedcVVNU5XxI"
  );

  return {
    user,
    setUser,
    token,
    setToken,
  };
};
