import { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem('magix_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  
  const login = (token) => {
    localStorage.setItem('magix_token', token);
    setIsLoggedIn(true);
  };

  
  const logout = () => {
    localStorage.removeItem('magix_token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}