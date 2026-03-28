import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Sparkles, Loader2, Search } from 'lucide-react';
import { CartContext } from '../contexts/CartContext';

export function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const { adicionarAoCarrinho } = useContext(CartContext);
  const [termoBusca, setTermoBusca] = useState('');
  const produtosFiltrados = produtos.filter(produto => 
    produto.name.toLowerCase().includes(termoBusca.toLowerCase())
  );

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
        <Sparkles className="w-8 h-8 text-gray-100" />
        <h1 className="text-4xl font-extrabold text-gray-100 tracking-tight">Vitrine Mágica</h1>
      </div>

      <div className="flex flex-row justify-between items-center w-full mb-8 gap-4">
        <div className="relative w-full md:w-full">
          <div className="absolute z-10 inset-y-0 left-0 pl-4 flex items-center">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            placeholder="Busque por relíquias, artefatos..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-zinc-600 shadow-inner backdrop-blur-sm"
          />
        </div>
      </div>

      {produtosFiltrados.length === 0 ? (
        <p className="text-zinc-400 text-lg text-center mt-10">O grimório está vazio no momento. Nenhuma relíquia encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtosFiltrados.map((produto) => {
            const esgotado = produto.stock === 0;

            return (
              <div 
                key={produto.id} 
                className={`bg-linear-to-bl from-indigo-950/20 via-zinc-800/30 to-fuchsia-900/20 border border-zinc-800 rounded-2xl p-5 flex flex-col group relative transition-all duration-300 ${
                  esgotado 
                    ? 'opacity-50 grayscale pointer-events-none' 
                    : 'hover:border-purple-500/50 hover:-translate-y-1 shadow-lg hover:shadow-purple-900/20'
                }`}
              >
                
                <Link to={`/produtos/${produto.id}`} className="flex flex-col flex-grow outline-none">
                  
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
                    
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    {esgotado && (
                      <div className="absolute inset-0 bg-zinc-950/60 flex items-center justify-center z-20">
                        <span className="bg-zinc-900 text-zinc-300 font-bold px-4 py-1.5 rounded-full border border-zinc-700 backdrop-blur-sm shadow-xl">
                          Relíquia Perdida
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-200 mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">
                    {produto.name}
                  </h2>
                  
                  <p className="text-zinc-400 text-sm mb-5 line-clamp-2">
                    {produto.description}
                  </p>
                </Link>
                
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className={`text-2xl font-extrabold ${esgotado ? 'text-zinc-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400'}`}>
                    R$ {produto.price ? produto.price.toFixed(2) : '0.00'}
                  </span>
                  
                  <button 
                    disabled={esgotado}
                    onClick={(e) => {
                      e.preventDefault();
                      adicionarAoCarrinho(produto);
                    }}
                    className={`p-3 rounded-xl transition-all border z-10 relative ${
                      esgotado 
                        ? 'bg-zinc-800/50 border-zinc-800 text-zinc-600 cursor-not-allowed' 
                        : 'bg-purple-900/30 hover:bg-purple-600 text-purple-300 hover:text-white border-purple-800/30 hover:border-purple-500'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}