import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, FlaskConical, Wand2, BookOpen } from 'lucide-react';

export function Home() {
  const imagemDeFundo = 'https://plus.unsplash.com/premium_photo-1686064771021-fbd6e301a0e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGRhcmt8ZW58MHx8MHx8fDA%3D';

  return (
    <div className="relative min-h-screen w-full bg-zinc-950 overflow-hidden">
      
      {/*  CAMADA 2: A Imagem de Fundo */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-15" 
        style={{ backgroundImage: `url(${imagemDeFundo})` }}
      />

      {/*  CAMADA 3: O Gradiente de Sobreposição  */}
      {/* Isso garante que o texto fique legível e cria um clima mágico escuro */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-purple-950/30" />

      {/* CAMADA 4: O Seu Conteúdo Real */}
      {/* É fundamental ter o z-20 para ficar por cima de todas as camadas de fundo */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-1 text-center">

      {/* Hero Section (Banner Principal) */}
      <section className="w-full max-w-7xl mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 mb-6 drop-shadow-md pb-4">
          Desperte a Sua Magia
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          O maior grimório de artefatos, poções raras e itens de poder inestimável. Tudo o que você precisa para elevar suas habilidades ao nível máximo.
        </p>
        <Link 
          to="/produtos" 
          className="group flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_35px_rgba(147,51,234,0.6)]"
        >
          <Sparkles className="w-5 h-5" />
          Explorar a Vitrine
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      {/* Seção de Destaques (Cards de Categoria) */}
      <section className="w-full max-w-7xl mx-auto px-4 py-25">
        <h2 className="text-2xl font-bold text-gray-200 mb-10 text-center">Relíquias Mais Procuradas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-purple-500/50 transition-colors flex flex-col items-center text-center group cursor-pointer">
            <div className="bg-purple-900/30 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <FlaskConical className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-200 mb-2">Poções Arcanas</h3>
            <p className="text-zinc-500 text-sm">Frascos raros para cura, energia e transformações profundas.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-indigo-500/50 transition-colors flex flex-col items-center text-center group cursor-pointer">
            <div className="bg-indigo-900/30 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Wand2 className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-200 mb-2">Varinhas e Cetros</h3>
            <p className="text-zinc-500 text-sm">Canalizadores de energia feitos com madeiras milenares e núcleos de fada.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-fuchsia-500/50 transition-colors flex flex-col items-center text-center group cursor-pointer">
            <div className="bg-fuchsia-900/30 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-8 h-8 text-fuchsia-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-200 mb-2">Grimórios Antigos</h3>
            <p className="text-zinc-500 text-sm">Conhecimento proibido e feitiços esquecidos de outras eras.</p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}