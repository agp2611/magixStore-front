import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Sparkles, Loader2 } from 'lucide-react';
import { CartContext } from '../contexts/CartContext';

export function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const { adicionarAoCarrinho } = useContext(CartContext);

  useEffect(() => {
    fetch('http://localhost:8081/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) throw new Error('Falha ao buscar o grimório de produtos.');
        return response.json();
      })
      .then(data => {
        setProdutos(data);
        setLoading(false);
      })
      .catch(error => {
        setErro(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-purple-500">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-lg animate-pulse">Consultando o grimório...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-red-400">
        <p className="text-2xl mb-2 font-bold">Feitiço quebrado!</p>
        <p className="text-zinc-400">{erro}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-10">
        <Sparkles className="w-8 h-8 text-purple-500" />
        <h1 className="text-4xl font-extrabold text-gray-100 tracking-tight">Vitrine Mágica</h1>
      </div>

      {produtos.length === 0 ? (
        <p className="text-zinc-400 text-lg text-center mt-10">O grimório está vazio no momento. Nenhuma relíquia encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtos.map((produto) => (
            <div key={produto.id} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 hover:border-purple-500/50 transition-all hover:-translate-y-1 shadow-lg hover:shadow-purple-900/20 flex flex-col group relative">
              
              <Link to={`/produtos/${produto.id}`} className="flex flex-col flex-grow outline-none">
                
                {/* AQUI ESTÁ A MÁGICA DA IMAGEM! */}
                <div className="bg-zinc-950 rounded-xl h-48 mb-5 flex items-center justify-center border border-zinc-800/50 group-hover:border-purple-900/50 transition-all overflow-hidden relative">
                  {produto.imageUrl ? (
                    <img 
                      src={produto.imageUrl} 
                      alt={produto.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <Sparkles className="w-10 h-10 text-zinc-800 group-hover:text-purple-500 transition-colors" />
                  )}
                  {/* Sobreposição de brilho ao passar o mouse */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-200 mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">
                  {produto.name}
                </h2>
                
                <p className="text-zinc-400 text-sm mb-5 line-clamp-2">
                  {produto.description}
                </p>
              </Link>
              
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                  R$ {produto.price ? produto.price.toFixed(2) : '0.00'}
                </span>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    adicionarAoCarrinho(produto);
                  }}
                  className="bg-purple-900/30 hover:bg-purple-600 text-purple-300 hover:text-white p-3 rounded-xl transition-all border border-purple-800/30 hover:border-purple-500 z-10 relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}