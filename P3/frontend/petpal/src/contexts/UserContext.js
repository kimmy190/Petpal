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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxNDUwOTg3LCJpYXQiOjE3MDEzNjQ1ODcsImp0aSI6ImVhMmUwNjBjYWRkNzQ5NTA5MGYwYjY0NjE1NDdjMGIxIiwidXNlcl9pZCI6Nn0.dMmsbUp0cfHi6vRtBmUKImivvZxrALDuhidxY_l60Bc"
  );

  return {
    user,
    setUser,
    token,
    setToken,
  };
};
