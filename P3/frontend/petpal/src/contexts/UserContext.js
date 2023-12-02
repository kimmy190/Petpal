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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxNTU4NjQwLCJpYXQiOjE3MDE0NzIyNDAsImp0aSI6IjEyYTUzN2I1MTc1NzQ1NDliZjdjYzYyN2QxNzlmNThjIiwidXNlcl9pZCI6Nn0.k8LD8VfLoJ84gOL3sshpaL3q0fGiwdZsUBovedWhoJk"
  );

  return {
    user,
    setUser,
    token,
    setToken,
  };
};
