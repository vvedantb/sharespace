import { useState, useEffect } from "react";

// Hook for managing user authentication
export const useLocalUser = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email: string) => {
    setUser(email);
    localStorage.setItem("loggedInUser", email); // Persist state in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  const isLoggedIn = !!user;

  return { user, isLoggedIn, login, logout };
};
