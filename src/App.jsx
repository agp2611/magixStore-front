import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Produtos } from './pages/Produtos';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { AuthProvider } from './contexts/AuthContext'; 
import { ProdutoDetalhes } from './pages/ProdutoDetalhes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            
            {/* Rota mágica que aceita qualquer ID */}
            <Route path="/produtos/:id" element={<ProdutoDetalhes />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/carrinho" element={<h2 className="text-center mt-20 text-2xl">Seu Caldeirão está vazio...</h2>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;