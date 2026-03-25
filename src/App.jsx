import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans">
        
        {/* A nossa Navbar entrou aqui, acima das rotas! */}
        <Navbar />

        <main className="p-4">
          <Routes>
            <Route path="/" element={
              <div className="flex flex-col items-center justify-center mt-20 text-center">
                <h1 className="text-5xl font-bold text-purple-500 mb-4 drop-shadow-lg">Bem-vindo a Magix Store</h1>
                <p className="text-zinc-400 text-lg max-w-xl">
                  Explore o nosso grimório e encontre artefatos raros, poções milenares e itens ocultos de poder inestimável.
                </p>
              </div>
            } />
            
            <Route path="/login" element={<h2 className="text-center mt-10 text-2xl">Portal de Acesso em breve...</h2>} />
            <Route path="/produtos" element={<h2 className="text-center mt-10 text-2xl">Vitrine de Poções em breve...</h2>} />
            <Route path="/carrinho" element={<h2 className="text-center mt-10 text-2xl">Seu Caldeirão está vazio...</h2>} />
          </Routes>
        </main>
        
      </div>
    </BrowserRouter>
  );
}

export default App;