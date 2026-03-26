import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Produtos } from './pages/Produtos';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext'; 
import { ProdutoDetalhes } from './pages/ProdutoDetalhes';
import { CadastroProduto } from './pages/CadastroProduto';
import { DashboardAdmin } from './pages/DashboardAdmin';
import { EditarProduto } from './pages/EditarProduto';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/produtos/:id" element={<ProdutoDetalhes />} />
              <Route path="/admin/novo-produto" element={<CadastroProduto />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/carrinho" element={<h2 className="text-center mt-20 text-2xl">Seu Caldeirão está vazio...</h2>} />
              <Route path="/admin/dashboard" element={<DashboardAdmin />} />
              <Route path="/admin/editar-produto/:id" element={<EditarProduto />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;