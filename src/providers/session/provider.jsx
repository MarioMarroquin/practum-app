import React, { createContext, useEffect, useMemo, useState } from "react";
import jwt from "jsonwebtoken";
import { client, accessToken } from "./../../config/environment";
import cookies from "react-cookies";
import useInterval from "./../../hooks/use-interval";

const sessionContext = createContext({});

const SessionProvider = ({ children }) => {
  const [token, setToken] = useState(accessToken.get());
  const [isLogged, setIsLogged] = useState(!!cookies.load("session"));
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

  const getAccessToken = async () => {
    try {
      if (isLogged) {
        const { data } = await client.get("/access");

        accessToken.set(data.accessToken);
        setToken(data.accessToken);
      }
    } catch (err) {
      logout();
    }
  };

  useInterval(
    getAccessToken,
    1000 * 60 * 10, // 10 Minutes (5 mins less than access expiration)
    {
      skip: !isLogged,
      leading: true,
    }
  );

  useEffect(() => {
    // Listen when other tab logs out so every single tab returns to login
    const logoutListener = async (event) => {
      if (event.key === "logout") logoutWindow();
    };
    window.addEventListener("storage", logoutListener);
    return () => window.removeEventListener("storage", logoutListener);
  });

  const reloadUser = async () => {
    await getAccessToken();
  };

  return (
    <sessionContext.Provider
      value={{
        isLogged,
        setIsLogged,
        token,
        logout,
        reloadUser,
      }}
    >
      {children}
    </sessionContext.Provider>
  );
};

export { sessionContext };
export default SessionProvider;
