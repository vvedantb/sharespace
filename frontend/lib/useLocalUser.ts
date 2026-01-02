import { useEffect, useState } from "react";

const LOCAL_USER_KEY = "sharespace-local-user";

export function useLocalUser() {
  const [user, setUser] = useState<any>(null);

  // Load user on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_USER_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = () => {
    const mockUser = {
      id: "local-user",
      name: "Local Dev User",
      email: "dev@localhost",
    };

    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_USER_KEY);
    setUser(null);
  };

  const deleteAccount = () => {
    localStorage.removeItem(LOCAL_USER_KEY);
    setUser(null);
    alert("Account deleted (local only)");
  };

  return {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    deleteAccount,
  };
}
