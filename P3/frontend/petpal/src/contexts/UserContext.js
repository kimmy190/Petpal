import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({
  user: {},
  setUserName: () => {},
  token: "",
  setToken: "",
});

export const useUserContext = () => {
  // const [user, setUser] = useState();
  const [user, setUser] = useState({ shelter: { id: 1 } });
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxMDY2MDQ1LCJpYXQiOjE3MDA5Nzk2NDUsImp0aSI6IjA2OGM2ZmZmNzM0ZDRlYWZiNjQ0MDJhNGY4NWQxMTBmIiwidXNlcl9pZCI6Nn0.5GmlWGbipID2pur39Y-mVdDMl_6A7a5nlLiGPOdnHSA"
  );

  return {
    user,
    setUser,
    token,
    setToken,
  };
};
