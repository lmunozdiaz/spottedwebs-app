import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = parseJwt(token);
      setUser(decodedUser);
      setLoggedIn(true);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:1726/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        const decodedUser = parseJwt(token);
        setUser(decodedUser);
        setLoggedIn(true);
        console.log(isLoggedIn);
        console.log(user);
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:1726/api/auth/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.userId, token }),
      });
      localStorage.removeItem("token");
      setUser(null);
      setLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
