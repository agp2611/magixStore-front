import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit, PlusCircle, ShieldAlert, Loader2, Sparkles, Package, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export function DashboardAdmin() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');
  const produtosFiltrados = produtos.filter(produto => 
    produto.name.toLowerCase().includes(termoBusca.toLowerCase())
  );

  // Busca todos os produtos ao abrir a tela
  useEffect(() => {
    fetch('http://localhost:8081/products')
      .then(response => {
        if (!response.ok) throw new Error('Falha ao acessar os registros.');
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

  // Função para Deletar um produto
  const handleDeletar = async (id, nome) => {
    // Pede uma confirmação para não deletar sem querer
    const confirmacao = window.confirm(`Tem certeza que deseja banir a relíquia "${nome}" para sempre?`);
    if (!confirmacao) return;

    const token = localStorage.getItem('magix_token');
    
    try {
      const response = await fetch(`http://localhost:8081/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 403) throw new Error('Apenas o Conselho (Admin) pode deletar itens.');
        throw new Error('Erro ao deletar o item do banco de dados.');
      }

      // Se deu certo no Java, a gente remove o item da tela sem precisar dar F5!
      setProdutos(produtos.filter(produto => produto.id !== id));
      toast.success('Relíquia banida com sucesso!');

    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-purple-500">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-lg animate-pulse">Abrindo a Sala do Conselho...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="bg-purple-900/30 p-4 rounded-2xl border border-purple-800/50">
            <ShieldAlert className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-100">Painel do Conselho</h1>
            <p className="text-zinc-400 mt-1">Gerencie as relíquias do grimório (Admin)</p>
          </div>
        </div>


        <Link 
          to="/admin/novo-produto" 
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]"
        >
          <PlusCircle className="w-5 h-5" />
          Nova Relíquia
        </Link>
      </div>

      {/* ✨ 2. COLE A BARRA DE PESQUISA EXATAMENTE AQUI ✨ */}
      <div className="mb-6 flex justify-start">
        <div className="relative w-full md:w-full">
          <div className="absolute z-10 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar relíquia no conselho..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="w-full bg-zinc-900/40 border border-zinc-800 text-zinc-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-zinc-600 shadow-inner backdrop-blur-sm"
          />
        </div>
      </div>

      {erro ? (
        <div className="p-4 bg-red-900/30 border border-red-800/50 rounded-xl text-red-400 font-medium">
          {erro}
        </div>
      ) : (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950/50 border-b border-zinc-800 text-zinc-400 text-sm uppercase tracking-wider">
                  <th className="p-5 font-medium">Relíquia</th>
                  <th className="p-5 font-medium">Preço</th>
                  <th className="p-5 font-medium">Estoque</th>
                  <th className="p-5 font-medium text-right">Ações Mágicas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {produtosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-zinc-500">
                      O estoque está completamente vazio.
                    </td>
                  </tr>
                ) : (
                  produtosFiltrados.map((produto) => (
                    <tr key={produto.id} className="hover:bg-zinc-800/20 transition-colors group">
                      <td className="p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {produto.imageUrl ? (
                            <img src={produto.imageUrl} alt={produto.name} className="w-full h-full object-cover" />
                          ) : (
                            <Sparkles className="w-5 h-5 text-zinc-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-200 group-hover:text-purple-400 transition-colors">{produto.name}</p>
                          <p className="text-xs text-zinc-500 line-clamp-1">{produto.description || 'Sem descrição'}</p>
                        </div>
                      </td>
                      <td className="p-5 text-zinc-300 font-medium">
                        R$ {produto.price ? produto.price.toFixed(2) : '0.00'}
                      </td>
                      <td className="p-5">
                        <span className="flex items-center gap-1.5 text-sm text-zinc-400 bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-md w-fit">
                          <Package className="w-3.5 h-3.5" />
                          {produto.stock || 0}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center justify-end gap-2">
                          {/* Botão de Editar (Faremos no próximo passo!) */}
                          <Link 
                            to={`/admin/editar-produto/${produto.id}`}
                            className="p-2 text-zinc-400 hover:text-indigo-400 hover:bg-indigo-900/20 rounded-lg transition-all"
                            title="Editar Relíquia"
                          >
                            <Edit className="w-5 h-5" />
                          </Link>
                          
                          {/* Botão de Deletar */}
                          <button 
                            onClick={() => handleDeletar(produto.id, produto.name)}
                            className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all"
                            title="Banir Relíquia"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}