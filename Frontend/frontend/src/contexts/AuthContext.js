// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // On mount, check localStorage for token/user
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    if (token && role) {
      setUser({ token, role, name });
    }
  }, []);

  const login = ({ token, userObj }) => {
    setUser(userObj);
    localStorage.setItem("token", token);
    localStorage.setItem("role", userObj.role);
    localStorage.setItem("name", userObj.name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
