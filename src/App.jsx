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
import { Carrinho } from './pages/Carrinho';
import { Toaster } from 'react-hot-toast';
import { AdminRoute } from './components/AdminRoute';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans">
            <Toaster 
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#18181b', // zinc-900
                  color: '#e4e4e7', // zinc-200
                  border: '1px solid #581c87', // purple-900
                },
                success: {
                  iconTheme: { primary: '#a855f7', secondary: '#fff' }, // purple-500
                },
                error: {
                  iconTheme: { primary: '#ef4444', secondary: '#fff' }, // red-500
                },
              }}
            />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/produtos/:id" element={<ProdutoDetalhes />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/carrinho" element={<Carrinho />} />
              
              {/* 🛡️ ROTAS PROTEGIDAS PELA MAGIA DE ADMIN */}
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  <DashboardAdmin />
                </AdminRoute>
              } />
              
              <Route path="/admin/novo-produto" element={
                <AdminRoute>
                  <CadastroProduto />
                </AdminRoute>
              } />
              
              <Route path="/admin/editar-produto/:id" element={
                <AdminRoute>
                  <EditarProduto />
                </AdminRoute>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;