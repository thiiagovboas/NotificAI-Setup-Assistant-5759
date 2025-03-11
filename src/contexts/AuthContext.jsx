import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);

  const login = (userData) => {
    setUser(userData);
    // In a real app, this would handle actual authentication
  };

  const logout = () => {
    setUser(null);
    setIsConfigured(false);
  };

  const completeConfiguration = () => {
    setIsConfigured(true);
  };

  return (
    <AuthContext.Provider value={{ user, isConfigured, login, logout, completeConfiguration }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);