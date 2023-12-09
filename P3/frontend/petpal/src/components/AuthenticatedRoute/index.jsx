import { React, useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import NotFound from "../../pages/NotFound";

const AuthenticatedRoute = ({ children, ...rest }) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [bad, setBad] = useState(false);
  // const isAuthenticated = user ? true : false;

  useEffect(() => {
    if (!user) {
      setBad(true);
      return; // Return null while redirecting
    }
  });

  return bad ? <NotFound /> : children;
};

export default AuthenticatedRoute;
