import { useState } from 'react';
import { Mail, Lock, LogIn, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Em breve, aqui faremos o POST para o Spring Boot!
    console.log('Tentando logar com:', email, senha);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Efeito de brilho no fundo do card */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-600/20 blur-3xl rounded-full"></div>

        <div className="relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-purple-900/30 p-3 rounded-2xl mb-4 border border-purple-800/50">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-100">Portal de Acesso</h2>
            <p className="text-zinc-400 text-sm mt-2">Entre com suas credenciais mágicas</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Campo de Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2 pl-1">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-gray-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="fada@magix.com"
                />
              </div>
            </div>

            {/* Campo de Senha */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2 pl-1">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-gray-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Botão de Submit */}
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] mt-4"
            >
              <LogIn className="w-5 h-5" />
              Acessar Grimório
            </button>
          </form>

          <p className="text-center text-zinc-500 text-sm mt-8">
            Ainda não é um iniciado?{' '}
            <Link to="/cadastro" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}