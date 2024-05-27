import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId_] = useState(localStorage.getItem("userId") || "");

  const setToken = (newToken) => {
    setToken_(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const setUserId = (id) => {
    setUserId_(id);
    if (id) {
      localStorage.setItem("userId", id);
    } else {
      localStorage.removeItem("userId");
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      userId,
      setUserId,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
