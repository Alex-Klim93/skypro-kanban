import { useState, useCallback } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );

  const login = useCallback((token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    login,
    logout,
  };
}

export default useAuth;
