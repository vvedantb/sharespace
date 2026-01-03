"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentSession, signOut as cognitoSignOut } from "@/lib/cognito";
import { User } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  signOut: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  isLoading: true,
  signOut: () => {},
  refreshAuth: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAuth = async () => {
    try {
      const session = await getCurrentSession();
      if (!session) {
        setUser(null);
        setAccessToken(null);
        return;
      }

      const token = session.getAccessToken().getJwtToken();
      setAccessToken(token);

      const response = await fetch("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
      setAccessToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  const signOut = () => {
    cognitoSignOut();
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading, signOut, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
