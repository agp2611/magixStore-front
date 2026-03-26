import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Produtos } from './pages/Produtos';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<h2 className="text-center mt-20 text-2xl">Portal de Acesso em breve...</h2>} />
          
          {/* Colocamos o componente de Produtos na rota dele! */}
          <Route path="/produtos" element={<Produtos />} /> 
          
          <Route path="/carrinho" element={<h2 className="text-center mt-20 text-2xl">Seu Caldeirão está vazio...</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;