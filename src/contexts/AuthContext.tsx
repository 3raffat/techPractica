import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getToken, clearToken, clearRole } from "../helpers/helpers";
import { useAuthQuery } from "../imports";
import { IProfileResponse } from "../interfaces";

interface AuthContextType {
  token: string | null;
  isTokenValid: boolean;
  logout: () => void;
  refreshToken: () => void;
  userName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);

  // Initialize token from storage
  useEffect(() => {
    const storedToken = getToken() ?? null;
    setToken(storedToken);
  }, []);

  // Listen for storage changes (for cross-tab sync)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = getToken() ?? null;
      setToken(storedToken);
    };

    // Listen for custom token update events (same-tab updates)
    const handleTokenUpdate = () => {
      const storedToken = getToken() ?? null;
      setToken(storedToken);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("tokenUpdated", handleTokenUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("tokenUpdated", handleTokenUpdate);
    };
  }, []);

  const refreshToken = () => {
    const storedToken = getToken() ?? null;
    setToken(storedToken);
  };

  const isTokenValid = typeof token === "string";

  // Fetch user profile when token is valid
  const { data: profileData } = useAuthQuery<IProfileResponse>({
    queryKey: [`profile-data-${token}`],
    url: "/profile/",
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    options: {
      enabled: isTokenValid,
    } as any,
  });

  const userName = profileData?.data?.user?.name;

  const logout = () => {
    clearToken();
    clearRole();
    setToken(null);
  };

  const value: AuthContextType = {
    token,
    isTokenValid,
    logout,
    refreshToken,
    userName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
