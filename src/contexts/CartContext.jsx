import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { isLoggedIn, token } = useContext(AuthContext);

  // 1. FUNÇÃO PARA BUSCAR O CARRINHO DO BANCO DE DADOS
  const carregarCarrinho = useCallback(async () => {
    if (!isLoggedIn || !token) {
      setCarrinho([]); // Limpa se deslogar
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8081/cart', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Falha ao buscar caldeirão.');
      
      const cartData = await response.json();
      
      // Mapeia os dados do Spring para o formato que o Front espera
      if (cartData && cartData.items) {
          const itensMapeados = cartData.items.map(item => ({
              id: item.id, // ID único do item no carrinho (CartItem ID)
              productId: item.product.id, // ID real do produto
              name: item.product.name,
              price: item.product.price,
              imageUrl: item.product.imageUrl,
              description: item.product.description,
              stock: item.product.stock,
              quantidade: item.quantity
          }));
          setCarrinho(itensMapeados);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn, token]);

  // Carrega sempre que o usuário logar/deslogar
  useEffect(() => {
    carregarCarrinho();
  }, [carregarCarrinho]);

  // 2. FUNÇÃO PARA ADICIONAR (Valida Estoque via API)
  const adicionarAoCarrinho = async (produto) => {
    if (!isLoggedIn) {
      toast.error('O caldeirão está trancado! Faça login para adicionar itens.', { id: 'erro-login' });
      return;
    }

    console.log("Token que está sendo enviado:", token);
    try {
      const response = await fetch(`http://localhost:8081/cart/add/${produto.id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        // Se o Java retornou erro (ex: sem estoque), lançamos para o catch
        throw new Error('Produto sem estoque suficiente ou erro na magia.');
      }
      
      await carregarCarrinho(); // Sincroniza com o banco
      toast.success(`"${produto.name}" adicionado ao caldeirão!`);

    } catch (error) {
       toast.error(error.message || "Erro ao contatar os espíritos do banco de dados.");
    }
  };

  // 3. FUNÇÃO PARA AUMENTAR (+1)
  const aumentarQuantidade = async (cartItemId) => {
    try {
      const response = await fetch(`http://localhost:8081/cart/increase/${cartItemId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Limite de estoque atingido!');
      await carregarCarrinho();
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 4. FUNÇÃO PARA DIMINUIR (-1)
  const diminuirQuantidade = async (cartItemId) => {
    try {
      const response = await fetch(`http://localhost:8081/cart/decrease/${cartItemId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) await carregarCarrinho();
    } catch (error) {
      toast.error("Erro ao diminuir quantidade.");
    }
  };

  // 5. FUNÇÃO PARA REMOVER A LINHA TODA
  const removerDoCarrinho = async (cartItemId) => {
    try {
      const response = await fetch(`http://localhost:8081/cart/item/${cartItemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        await carregarCarrinho();
        toast.success("Relíquia removida.");
      }
    } catch (error) {
      toast.error("Erro ao remover relíquia.");
    }
  };

  // 6. FUNÇÃO PARA LIMPAR TUDO
  const limparCarrinho = async () => {
    try {
      const response = await fetch(`http://localhost:8081/cart/clear`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) await carregarCarrinho();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider 
      value={{ 
        carrinho, 
        isLoading, 
        adicionarAoCarrinho, 
        removerDoCarrinho, 
        aumentarQuantidade, 
        diminuirQuantidade, 
        limparCarrinho 
      }}>
      {children}
    </CartContext.Provider>
  );
}