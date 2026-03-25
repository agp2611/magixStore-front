import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Esta div garante que o fundo escuro ocupe a tela inteira sempre */}
      <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans">

        {/* Aqui, no futuro, colocaremos o componente da Navbar (Cabeçalho) */}

        <main className="p-4">
          <Routes>
            <Route path="/" element={
              <div className="flex flex-col items-center justify-center mt-20">
                <h1 className="text-5xl font-bold text-purple-500 mb-4">Magix Store 🔮</h1>
                <p className="text-zinc-400 text-lg">Artigos mágicos e ocultos para a sua jornada.</p>
              </div>
            } />

            <Route path="/login" element={<h2>Página de Login em breve...</h2>} />
            <Route path="/produtos" element={<h2>Vitrine de Poções em breve...</h2>} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;