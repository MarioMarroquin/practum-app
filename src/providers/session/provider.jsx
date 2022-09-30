import React, { createContext, useEffect, useMemo, useState } from "react";
import jwt from "jsonwebtoken";
import { client, accessToken } from "./../../config/environment";
import cookies from "react-cookies";
import useInterval from "./../../hooks/use-interval";

const sessionContext = createContext({});

const SessionProvider = ({ children }) => {
  const [token, setToken] = useState(accessToken.get());
  const [isLogged, setIsLogged] = useState(!!cookies.load("authorization"));
  const { overallRole, firstName } = useMemo(
    () => (token ? jwt.decode(token) : {}),
    [token]
  );

  const logoutWindow = async () => {
    setToken();
    setIsLogged(false);
    accessToken.set();
  };

  const logout = async () => {
    logoutWindow();
    await client.post("/logout");
    localStorage.clear();
    localStorage.setItem("logout", Date.now()); // Force logout on every tab
  };

  useEffect(() => {
    // Listen when other tab logs out so every single tab returns to login
    const logoutListener = async (event) => {
      if (event.key === "logout") logoutWindow();
    };
    window.addEventListener("storage", logoutListener);
    return () => window.removeEventListener("storage", logoutListener);
  });

  return (
    <sessionContext.Provider
      value={{
        isLogged,
        setIsLogged,
        token,
        logout,
        setToken,
      }}
    >
      {children}
    </sessionContext.Provider>
  );
};

export { sessionContext };
export default SessionProvider;
