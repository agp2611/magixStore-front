import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null); // Agora teremos o ID de volta!

  const decodificarESalvarToken = (jwtToken) => {
    try {
      const payloadBase64 = jwtToken.split('.')[1];
      const payloadDecodificado = JSON.parse(atob(payloadBase64));

      // Agora temos certeza que o Java está mandando o 'id' aqui dentro!
      const idDoUsuario = payloadDecodificado.id; 

      setToken(jwtToken);
      setUserId(idDoUsuario);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      logout();
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('magix_token');
    if (storedToken) {
      decodificarESalvarToken(storedToken);
    }
  }, []);

  const login = (jwtToken) => {
    localStorage.setItem('magix_token', jwtToken);
    decodificarESalvarToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem('magix_token');
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}