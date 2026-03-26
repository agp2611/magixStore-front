import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, Tag, AlignLeft, DollarSign, Loader2, Sparkles, ArrowLeft, Image as ImageIcon, PackageSearch } from 'lucide-react';
import toast from 'react-hot-toast';

export function CadastroProduto() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  
  // Nossos novos estados para o Estoque e a Imagem!
  const [estoque, setEstoque] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  
  const navigate = useNavigate();

  const handleCadastrarProduto = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    const token = localStorage.getItem('magix_token');

    if (!token) {
      setErro('Você precisa estar logado para forjar novas relíquias.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: nome,
          description: descricao || null,
          price: parseFloat(preco),
          stock: parseInt(estoque), 
          imageUrl: imagemUrl || null
        }),
      });

      if (!response.ok) {
        if (response.status === 403) throw toast.error('Seu nível de magia (permissão) é muito baixo para isso. Verifique se você é ADMIN.');
        throw toast.error('Falha ao conjurar o item no banco de dados.');
      }

      toast.success('Relíquia forjada com sucesso e adicionada à vitrine!');
      navigate('/produtos'); 

    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors mb-8 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" />
        Voltar para a Home
      </Link>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-900/10 blur-3xl rounded-full pointer-events-none"></div>

        <div className="flex items-center gap-4 mb-8 border-b border-zinc-800/80 pb-6">
          <div className="bg-purple-900/30 p-4 rounded-2xl border border-purple-800/50">
            <PlusCircle className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-100">Forja Mágica</h1>
            <p className="text-zinc-400 mt-1">Cadastre novas relíquias no grimório da loja</p>
          </div>
        </div>

        {erro && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-800/50 rounded-xl text-red-400 text-sm font-medium">
            {erro}
          </div>
        )}

        <form onSubmit={handleCadastrarProduto} className="space-y-6 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campo: Nome do Produto */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-400 mb-2 pl-1">Nome da Relíquia</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-gray-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="Ex: Varinha de Sabugueiro"
                />
              </div>
            </div>

            {/* Campo: Preço */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2 pl-1">Valor em Moedas (R$)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-gray-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="Ex: 150.00"
                />
              </div>
            </div>

            {/* Campo: Estoque */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2 pl-1">Quantidade em Estoque</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <PackageSearch className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="number"
                  min="0"
                  required
                  value={estoque}
                  onChange={(e) => setEstoque(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-gray-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="Ex: 10"
                />
              </div>
            </div>
          </div>

          {/* Campo: URL da Imagem */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2 pl-1">Link da Imagem (URL)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <ImageIcon className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="url"
                value={imagemUrl}
                onChange={(e) => setImagemUrl(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-gray-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                placeholder="https://exemplo.com/imagem.png"
              />
            </div>
          </div>

          {/* Campo: Descrição */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2 pl-1">Descrição do Poder</label>
            <div className="relative">
              <div className="absolute top-3 left-0 pl-4 pointer-events-none">
                <AlignLeft className="h-5 w-5 text-zinc-500" />
              </div>
              <textarea
                rows="4"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-gray-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                placeholder="Descreva os efeitos mágicos e a origem do item..."
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] mt-4 text-lg"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                Conjurar no Banco de Dados
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}