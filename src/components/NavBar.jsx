import { Link } from 'react-router-dom';
import { ShoppingCart, User, Sparkles } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 text-gray-200 sticky top-0 z-50 shadow-lg shadow-purple-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo e Home */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-purple-500 hover:text-purple-400 transition-colors">
            <Sparkles className="w-7 h-7" />
            <span>Magix</span>
          </Link>

          {/* Links Centrais */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-purple-400 font-medium transition-colors">A Loja</Link>
            <Link to="/produtos" className="hover:text-purple-400 font-medium transition-colors">Grimório de Produtos</Link>
          </div>

          {/* Ícones da Direita (Carrinho e Login) */}
          <div className="flex items-center gap-6">
            
            {/* Botão do Carrinho */}
            <Link to="/carrinho" className="relative hover:text-purple-400 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {/* Bolinha indicadora de itens */}
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            
            {/* Botão de Entrar */}
            <Link to="/login" className="flex items-center gap-4 bg-purple-900/30 hover:bg-purple-800/50 text-purple-300 px-5 py-2.5 rounded-lg border border-purple-700/50 transition-all shadow-sm">
              <User className="w-5 h-5" />
              <span className="font-semibold">Entrar</span>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}