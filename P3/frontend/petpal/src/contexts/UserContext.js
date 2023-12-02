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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxNjM3OTU5LCJpYXQiOjE3MDE1NTE1NTksImp0aSI6IjE5NWExMTJlNGNjNDQ3M2E4NWFlZmVjZjcwMjg1Njc4IiwidXNlcl9pZCI6Nn0.gZtki0NIS7H0-qLxZgf7SKPhIeUpMgp2TiMioBTaGmw"
  );

  return {
    user,
    setUser,
    token,
    setToken,
  };
};
