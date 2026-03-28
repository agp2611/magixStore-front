import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');

  const decodificarESalvarToken = (jwtToken) => {
    try {
      const payloadBase64 = jwtToken.split('.')[1];
      const payloadDecodificado = JSON.parse(atob(payloadBase64));

      const idDoUsuario = payloadDecodificado.id; 
      const roleDoUsuario = payloadDecodificado.role; 
      const nomeDoUsuario = payloadDecodificado.name || payloadDecodificado.sub || 'Iniciado';

      setToken(jwtToken);
      setUserId(idDoUsuario);
      setUserRole(roleDoUsuario); 
      setUserName(nomeDoUsuario);
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
    setUserRole(null); 
    setUserName('');
    setIsLoggedIn(false);
  };

  return (
    // Exportando o userRole no value!
    <AuthContext.Provider value={{ isLoggedIn, token, userId, userRole, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}