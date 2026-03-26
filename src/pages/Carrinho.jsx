import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingCart, Sparkles, Wand2 } from 'lucide-react';
import { CartContext } from '../contexts/CartContext';
import toast from 'react-hot-toast';

export function Carrinho() {
  const { carrinho, removerDoCarrinho, atualizarQuantidade, limparCarrinho } = useContext(CartContext);

  // Calcula o valor total do caldeirão
  const valorTotal = carrinho.reduce((acc, item) => acc + (item.price * item.quantidade), 0);

  // Função para simular o fechamento do pedido
  const handleFinalizarCompra = () => {
    if (carrinho.length === 0) return;
    toast.success('✨ Magia realizada! Seu pedido foi conjurado com sucesso.');
    limparCarrinho();
  };

  if (carrinho.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="bg-zinc-900/50 border border-zinc-800 p-12 rounded-3xl text-center max-w-lg w-full shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
          
          <div className="bg-purple-900/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
            <ShoppingCart className="w-10 h-10 text-purple-400" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-100 mb-4">Seu Caldeirão está vazio</h2>
          <p className="text-zinc-400 mb-8">Parece que você ainda não adicionou nenhuma relíquia para sua jornada mágica.</p>
          
          <Link 
            to="/produtos" 
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]"
          >
            <Wand2 className="w-5 h-5" />
            Explorar o Grimório
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/produtos" className="inline-flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors mb-8 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" />
        Continuar Explorando
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <div className="bg-purple-900/30 p-3 rounded-2xl border border-purple-800/50">
          <ShoppingCart className="w-8 h-8 text-purple-400" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-100">Seu Caldeirão</h1>
          <p className="text-zinc-400 mt-1">Revise as relíquias antes de conjurar o feitiço final</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Lista de Itens (Esquerda) */}
        <div className="w-full lg:w-2/3 space-y-4">
          {carrinho.map((item) => (
            <div key={item.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 shadow-lg group hover:border-purple-500/30 transition-colors">
              
              {/* Imagem do Produto no Carrinho */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-zinc-950 rounded-xl border border-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden relative">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <Sparkles className="w-8 h-8 text-zinc-700" />
                )}
              </div>

              {/* Detalhes e Controles */}
              <div className="flex-grow flex flex-col sm:flex-row justify-between w-full gap-4">
                
                <div className="flex flex-col justify-center text-center sm:text-left">
                  <h3 className="text-xl font-bold text-gray-200 group-hover:text-purple-400 transition-colors">{item.name}</h3>
                  <p className="text-zinc-500 text-sm mt-1 line-clamp-1">{item.description || 'Relíquia sem descrição'}</p>
                  <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mt-2">
                    R$ {item.price ? item.price.toFixed(2) : '0.00'}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 border-t sm:border-t-0 border-zinc-800 pt-4 sm:pt-0">
                  
                  {/* Controle de Quantidade */}
                  <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                      className="px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-gray-200 font-medium">
                      {item.quantidade}
                    </span>
                    <button 
                      onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                      className="px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Botão Remover */}
                  <button 
                    onClick={() => removerDoCarrinho(item.id)}
                    className="text-zinc-500 hover:text-red-400 p-2 hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Remover relíquia"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Resumo do Pedido (Direita) */}
        <div className="w-full lg:w-1/3">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 lg:p-8 shadow-2xl sticky top-28">
            <h2 className="text-xl font-bold text-gray-100 mb-6 border-b border-zinc-800 pb-4">Resumo do Feitiço</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-zinc-400">
                <span>Relíquias ({carrinho.length})</span>
                <span>R$ {valorTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Taxa de Entrega Mágica</span>
                <span className="text-purple-400 font-medium">Gratuita</span>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-lg font-medium text-gray-200">Poder Total</span>
                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                  R$ {valorTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button 
              onClick={handleFinalizarCompra}
              className="w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] text-lg"
            >
              <Sparkles className="w-5 h-5" />
              Conjurar Pedido
            </button>
            
            <p className="text-center text-zinc-500 text-xs mt-4">
              Ao conjurar, você concorda com as leis mágicas de Magix.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}