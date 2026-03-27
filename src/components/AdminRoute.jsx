import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Ajuste o caminho!
import toast from 'react-hot-toast';

export function AdminRoute({ children }) {
  const { isLoggedIn, userRole } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Se estiver logado, mas NÃO for ADMIN, ele toma um block
  if (userRole !== 'ROLE_ADMIN') {
    toast.error('Acesso restrito a Magos de Nível Superior!', { icon: '🛑', id: 'erro-admin' });
    return <Navigate to="/produtos" />; // Joga o penetra de volta pra vitrine
  }

  // Se for ADMIN, deixa passar e renderiza a tela de Admin
  return children;
}