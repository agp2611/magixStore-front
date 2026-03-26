import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Edit, Tag, AlignLeft, DollarSign, Loader2, Sparkles, ArrowLeft, Image as ImageIcon, PackageSearch } from 'lucide-react';

export function EditarProduto() {
  const { id } = useParams(); // Pega o ID da relíquia pela URL
  const navigate = useNavigate();

  // Estados do formulário
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  
  // Estados de controle da tela
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState('');

  // Busca os dados atuais da relíquia assim que a tela abre
  useEffect(() => {
    fetch(`http://localhost:8081/products/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Relíquia não encontrada no grimório.');
        return response.json();
      })
      .then(data => {
        // Preenche os campos com os dados que vieram do banco
        setNome(data.name);
        setDescricao(data.description || '');
        setPreco(data.price);
        setEstoque(data.stock || 0);
        setImagemUrl(data.imageUrl || '');
        setLoadingInitial(false);
      })
      .catch(error => {
        setErro(error.message);
        setLoadingInitial(false);
      });
  }, [id]);

  const handleSalvarEdicao = async (e) => {
    e.preventDefault();
    setErro('');
    setSaving(true);

    const token = localStorage.getItem('magix_token');

    if (!token) {
      setErro('Você precisa estar logado para alterar relíquias.');
      setSaving(false);
      return;
    }

    try {
      // ATENÇÃO: Aqui usamos PUT e passamos o ID na URL!
      const response = await fetch(`http://localhost:8081/products/${id}`, {
        method: 'PUT',
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
        if (response.status === 403) throw new Error('Apenas o Conselho (Admin) pode alterar itens.');
        throw new Error('Falha ao atualizar a relíquia no banco de dados.');
      }

      alert('Relíquia transmutada com sucesso!');
      navigate('/admin/dashboard'); // Volta pro painel

    } catch (error) {
      setErro(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loadingInitial) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-purple-500">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-lg animate-pulse">Invocando dados da relíquia...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors mb-8 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" />
        Voltar para o Painel
      </Link>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-900/10 blur-3xl rounded-full pointer-events-none"></div>

        <div className="flex items-center gap-4 mb-8 border-b border-zinc-800/80 pb-6">
          <div className="bg-purple-900/30 p-4 rounded-2xl border border-purple-800/50">
            <Edit className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-100">Transmutar Relíquia</h1>
            <p className="text-zinc-400 mt-1">Altere os atributos deste item mágico</p>
          </div>
        </div>

        {erro && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-800/50 rounded-xl text-red-400 text-sm font-medium">
            {erro}
          </div>
        )}

        <form onSubmit={handleSalvarEdicao} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="block w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

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
                  className="block w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

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
                  className="block w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

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
                className="block w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

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
                className="block w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-bold py-4 px-4 rounded-xl transition-all mt-4 text-lg"
          >
            {saving ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                Salvar Transmutação
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}