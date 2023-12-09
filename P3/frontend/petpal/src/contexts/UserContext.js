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
  const [user, setUser] = useState({ id: 5, shelter: 5 });
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMTY0OTAzLCJpYXQiOjE3MDIwNzg1MDMsImp0aSI6IjM1MjY3MjJlODc2ZTQ5ODhhNDhjNWVlZmE2M2I2NjEwIiwidXNlcl9pZCI6NX0.TIKAG6QAEVKD_6jKA3rwYOyr7rmoukG2s-4swlNm3QA"
  );

  return {
    user,
    setUser,
    token,
    setToken,
  };
};
