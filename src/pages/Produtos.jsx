import { useState, useEffect } from 'react';
import { ShoppingCart, Loader2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Produtos() {

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/products')
      .then(response => {
        if (!response.ok) throw new Error('O grimório está inacessível no momento.');
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
        <p className="text-lg animate-pulse">Consultando o grimório de Magix...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-red-400">
        <p className="text-2xl mb-2 font-bold">Um feitiço deu errado!</p>
        <p className="text-zinc-400">{erro}</p>
        <p className="text-sm mt-4 text-zinc-500">Verifique se o seu Spring Boot está rodando!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-10 border-b border-zinc-800 pb-4">
        <Sparkles className="w-8 h-8 text-purple-500" />
        <h1 className="text-4xl font-bold text-gray-200">Vitrine Mágica</h1>
      </div>

      {produtos.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-zinc-400 text-xl">O estoque de poções está vazio no momento.</p>
          <p className="text-zinc-500 mt-2">Use o painel de Admin para cadastrar novos itens.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Mapeia a lista de produtos que veio do Java e cria um card para cada um */}
          {/* Mapeia a lista de produtos que veio do Java e cria um card para cada um */}
          {produtos.map((produto) => (
            <div key={produto.id} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 hover:border-purple-500/50 transition-all hover:-translate-y-1 shadow-lg hover:shadow-purple-900/20 flex flex-col group relative">
              
              {/* Transformamos a Imagem, Título e Descrição em um Link gigante */}
              <Link to={`/produtos/${produto.id}`} className="flex flex-col flex-grow outline-none">
                <div className="bg-zinc-950 rounded-xl h-48 mb-5 flex items-center justify-center border border-zinc-800/50 group-hover:border-purple-900/50 transition-colors">
                  <Sparkles className="w-10 h-10 text-zinc-800 group-hover:text-purple-500 transition-colors" />
                </div>
                
                <h2 className="text-xl font-bold text-gray-200 mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">
                  {produto.name}
                </h2>
                
                <p className="text-zinc-400 text-sm mb-5 line-clamp-2">
                  {produto.description}
                </p>
              </Link>
              
              {/* O Preço e o Botão de Carrinho ficam fora do Link */}
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                  R$ {produto.price.toFixed(2)}
                </span>
                <button 
                  onClick={(e) => {
                    e.preventDefault(); // Evita que clicar no carrinho abra a página do produto acidentalmente
                    console.log("Adicionando ao caldeirão:", produto.name);
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