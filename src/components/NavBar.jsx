import { Link } from 'react-router-dom';
import { ShoppingCart, User, Sparkles, LogOut, ShieldAlert } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

export function Navbar() {
  const { isLoggedIn, userRole, userName, logout } = useContext(AuthContext);
  const { carrinho } = useContext(CartContext);
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  
  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 text-gray-200 sticky top-0 z-50 shadow-lg shadow-purple-900/10">
      
      {/* ✨ 1. Aqui removemos o max-w-7xl e colocamos w-full com mais espaço lateral (px-6 lg:px-12) */}
      <div className="w-full px-6 lg:px-12 relative">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo (Esquerda) - O z-10 garante que ele fica clicável por cima de outras camadas */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-purple-500 hover:text-purple-400 transition-colors z-10">
            <Sparkles className="w-7 h-7" />
            <span>Magix</span>
          </Link>

          {/* Links Centrais */}
          {/* ✨ 2. Fixamos no centro absoluto do ecrã com 'absolute left-1/2 -translate-x-1/2' */}
          <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2 w-max">
            <Link to="/" className="hover:text-purple-400 font-medium transition-colors">A Loja</Link>
            <Link to="/produtos" className="hover:text-purple-400 font-medium transition-colors">Grimório de Produtos</Link>
          </div>

          {/* Ícones da Direita (Carrinho e Login) */}
          <div className="flex items-center gap-6 z-10">
            
            {/* Botão do Carrinho */}
            <Link to="/carrinho" className="relative hover:text-purple-400 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {totalItens > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-zinc-950">
                  {totalItens}
                </span>
              )}
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
      
                {userRole === 'ADMIN' && (
                  <Link to="/admin/dashboard" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium bg-purple-900/20 px-3 py-1.5 rounded-lg border border-purple-800/30">
                    <ShieldAlert className="w-4 h-4" />
                    Painel Admin
                  </Link>
                )}

                <Link to="/perfil" className="flex items-center gap-2 text-zinc-300 hover:text-purple-400 cursor-pointer transition-colors ml-2 border-l border-zinc-800 pl-4">
                  <User className="w-5 h-5" />
                  <span className="font-medium max-w-[150px] truncate" title={userName || 'Iniciado'}>
                    {userName || 'Iniciado'}
                  </span>
                </Link>
                
                <button 
                  onClick={logout}
                  className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-red-500/50 hover:bg-red-900/20 text-zinc-400 hover:text-red-400 px-4 py-2 rounded-xl transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 hover:bg-purple-900/30 text-gray-200 px-5 py-2.5 rounded-xl transition-colors shadow-sm hover:shadow-purple-900/20">
                <User className="w-5 h-5 text-purple-400" />
                <span className="font-medium">Entrar</span>
              </Link>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}