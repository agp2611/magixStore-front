import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home'; // <-- Importamos a página nova aqui!

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans">
        
        <Navbar />

        {/* Tiramos a tag <main> e o padding daqui para o banner da Home poder ocupar a tela toda */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* <-- Colocamos o componente aqui */}
          
          <Route path="/login" element={<h2 className="text-center mt-20 text-2xl">Portal de Acesso em breve...</h2>} />
          <Route path="/produtos" element={<h2 className="text-center mt-20 text-2xl">Vitrine de Poções em breve...</h2>} />
          <Route path="/carrinho" element={<h2 className="text-center mt-20 text-2xl">Seu Caldeirão está vazio...</h2>} />
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;