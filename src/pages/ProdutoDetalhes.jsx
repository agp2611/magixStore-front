import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Loader2, Sparkles, Package } from 'lucide-react';

export function ProdutoDetalhes() {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();
  
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Busca apenas o produto com este ID específico
    fetch(`http://localhost:8081/products/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Relíquia não encontrada no grimório.');
        return response.json();
      })
      .then(data => {
        setProduto(data);
        setLoading(false);
      })
      .catch(error => {
        setErro(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-purple-500">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-lg animate-pulse">Invocando detalhes da relíquia...</p>
      </div>
    );
  }

  if (erro || !produto) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-red-400">
        <p className="text-2xl mb-2 font-bold">Feitiço perdido!</p>
        <p className="text-zinc-400">{erro}</p>
        <button onClick={() => navigate('/produtos')} className="mt-6 text-purple-400 hover:text-purple-300 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar para a Vitrine
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link to="/produtos" className="inline-flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors mb-10 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" />
        Voltar para o Grimório
      </Link>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row gap-10 items-start shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Lado Esquerdo: Imagem (Agora com suporte a imagem real ou placeholder) */}
        <div className="w-full md:w-1/2 bg-zinc-950 border border-zinc-800/80 rounded-2xl aspect-square flex flex-col items-center justify-center relative group overflow-hidden">
          {produto.imageUrl ? (
            <img 
              src={produto.imageUrl} 
              alt={produto.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <>
              <Sparkles className="w-20 h-20 text-zinc-800 mb-4 group-hover:text-purple-500/50 transition-colors duration-500" />
              <p className="text-zinc-700 text-sm font-medium uppercase tracking-widest">Imagem Oculta</p>
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
        </div>

        {/* Lado Direito: Informações */}
        <div className="w-full md:w-1/2 flex flex-col h-full z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-purple-900/30 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-800/30">
              Relíquia Autêntica
            </span>
            <span className="bg-zinc-800/50 text-zinc-400 text-xs px-3 py-1 rounded-full border border-zinc-700/50">
              Estoque: {produto.stock || 0}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-4 leading-tight">
            {produto.name}
          </h1>
          
          {/* Lógica para quando a descrição for null ou vazia */}
          <p className={`text-lg mb-8 leading-relaxed ${produto.description ? 'text-zinc-400' : 'text-zinc-600 italic'}`}>
            {produto.description || "Esta relíquia ainda não possui uma descrição detalhada em nosso grimório."}
          </p>

          <div className="mt-auto border-t border-zinc-800/80 pt-8">
            <div className="flex items-end gap-4 mb-8">
              <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                R$ {produto.price ? produto.price.toFixed(2) : '0.00'}
              </span>
            </div>

            <button className="w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_35px_rgba(147,51,234,0.5)] text-lg group">
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Adicionar ao Caldeirão
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}