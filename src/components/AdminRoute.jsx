import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Ajuste o caminho!
import toast from 'react-hot-toast';

export function AdminRoute({ children }) {
  const { isLoggedIn, userRole } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Se estiver logado, mas NÃO for ADMIN, bloqueia o acesso e mostra um aviso
  if (userRole !== 'ROLE_ADMIN') {
    toast.error('Acesso restrito a Magos de Nível Superior!', { icon: '🛑', id: 'erro-admin' });
    return <Navigate to="/produtos" />; // Manda de volta para a vitrine
  }

  // Se for ADMIN, deixa passar e renderiza a tela de Admin
  return children;
}