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
  const [user, setUser] = useState({ id: 1, shelter: { id: 1 }, first_name: "jack" });
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMTQ4NzI3LCJpYXQiOjE3MDIwNjIzMjcsImp0aSI6IjQ3OGM4Yjc1MTFhYTRlOGFiM2JlOGJhZWY1MDFmZjg0IiwidXNlcl9pZCI6NX0.HIGpGwDHkYb8zz_RxM9xjlPwkOeVbltBOUmfqDD-lFY"
  );

  return {
    user,
    setUser,
    token,
    setToken,
  };
};
