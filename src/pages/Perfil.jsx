import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, Sparkles, AlertCircle } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export function Perfil() {
  const { isLoggedIn, userId, token, userName } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  // Proteção da Rota
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Acesso restrito! Identifique-se primeiro.", { id: 'perfil-trancado' });
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const buscarPedidos = async () => {
      if (!userId || !token) return;

      try {
        const response = await fetch(`http://localhost:8081/orders/client/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Falha ao ler os pergaminhos.');
        
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error(error);
        toast.error("As visões do passado falharam.");
      } finally {
        setCarregando(false);
      }
    };

    if (isLoggedIn) {
      buscarPedidos();
    }
  }, [userId, token, isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 min-h-[80vh]">
      <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-6">
        <div className="bg-purple-900/30 p-4 rounded-full border border-purple-800/50">
          <Package className="w-8 h-8 text-purple-400" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-100">
            Grimório de {userName}
          </h1>
          <p className="text-zinc-400 mt-1">Histórico de conjurações e relíquias adquiridas</p>
        </div>
      </div>

      {carregando ? (
        <div className="flex justify-center py-20">
          <Sparkles className="w-10 h-10 text-purple-500 animate-spin" />
        </div>
      ) : pedidos.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-12 text-center shadow-lg">
          <AlertCircle className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-300 mb-2">Nenhum feitiço conjurado</h2>
          <p className="text-zinc-500">O seu histórico de pedidos está vazio no momento.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pedidos.map((pedido, index) => (
            <div key={pedido.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg hover:border-purple-500/30 transition-colors">
              
              {/* Cabeçalho do Pedido */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-zinc-800/50 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
                    Pedido #{index + 1}
                  </h3>
                  <div className="flex items-center gap-2 text-zinc-500 text-sm mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(pedido.orderDate).toLocaleDateString('pt-BR') || 'Conjurado recentemente'}</span>
                  </div>
                </div>
                <div className="bg-purple-900/20 text-purple-300 px-4 py-1.5 rounded-full text-sm font-medium border border-purple-800/30">
                  {pedido.status || 'Concluído'}
                </div>
              </div>

              {/* Lista de Itens do Pedido */}
              <div className="space-y-4">
                {pedido.items?.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800 overflow-hidden">
                         {item.product?.imageUrl ? (
                           <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                         ) : (
                           <Sparkles className="w-5 h-5 text-zinc-600" />
                         )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-200">{item.product?.name || 'Relíquia Oculta'}</p>
                        <p className="text-zinc-500 text-sm">Quantidade: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-300">
                      R$ {item.price ? (item.price * item.quantity).toFixed(2) : '0.00'}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total do Pedido */}
              <div className="mt-6 flex justify-end items-center gap-4 pt-4 border-t border-zinc-800/50">
                <span className="text-zinc-400">Poder Total:</span>
                <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                  R$ {pedido.total ? pedido.total.toFixed(2) : '0.00'}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}