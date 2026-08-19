import { useEffect, useState } from "react";
import { createContext } from "react";
import api from "../../../config/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));
  const [isHydrating, setIsHydrating] = useState(false);


  const value = {
    user,
    setUser,
    loading,
    setLoading,
    isHydrating,
    setIsHydrating,
    isAuthenticated,
    setIsAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
