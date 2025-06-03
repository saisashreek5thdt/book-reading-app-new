import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Load token and user on startup
  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      const userData = await SecureStore.getItemAsync("userData");

      if (token) setAuthToken(token);
      if (userData) setUser(JSON.parse(userData));
      setCheckingAuth(false);
    };

    loadToken();
  }, []);

  // Login function
  const login = async (token, userData) => {
    await SecureStore.setItemAsync("authToken", token);
    await SecureStore.setItemAsync("userData", JSON.stringify(userData));
    setAuthToken(token);
    setUser(userData);
  };

  // Logout function
  const logout = async () => {
    await SecureStore.deleteItemAsync("authToken");
    await SecureStore.deleteItemAsync("userData");
    setAuthToken(null);
    setUser(null);
  };

  // ✅ Add this new function
  const updateUser = async (updatedUser) => {
    try {
      await SecureStore.setItemAsync("userData", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ authToken, user, login, logout, checkingAuth, updateUser }} // ✅ Include updateUser
    >
      {!checkingAuth && children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);