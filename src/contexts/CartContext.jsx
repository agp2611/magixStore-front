import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Pegamos o userId decodificado lá do AuthContext!
  const { isLoggedIn, token, userId } = useContext(AuthContext);

  const carregarCarrinho = useCallback(async () => {
    if (!isLoggedIn || !token || !userId) {
      setCarrinho([]); 
      return;
    }
    
    setIsLoading(true);
    try {
      // URL com o ID do cliente
      const response = await fetch(`http://localhost:8081/cart/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Falha ao buscar caldeirão.');
      
      const cartData = await response.json();
      
      if (cartData && cartData.items) {
          const itensMapeados = cartData.items.map(item => ({
              id: item.id, 
              productId: item.product.id,
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
  }, [isLoggedIn, token, userId]);

  useEffect(() => {
    carregarCarrinho();
  }, [carregarCarrinho]);

  const adicionarAoCarrinho = async (produto) => {
    if (!isLoggedIn || !userId) {
      toast.error('O caldeirão está trancado! Faça login para adicionar itens.', { id: 'erro-login' });
      return;
    }

    try {
      // Rota com userId e productId
      const response = await fetch(`http://localhost:8081/cart/${userId}/add/${produto.id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Produto sem estoque suficiente ou erro na magia.');
      
      await carregarCarrinho();
      toast.success(`"${produto.name}" adicionado ao caldeirão!`);

    } catch (error) {
       toast.error(error.message);
    }
  };

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

  const limparCarrinho = async () => {
    try {
      // URL com o ID do cliente
      const response = await fetch(`http://localhost:8081/cart/clear/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) await carregarCarrinho();
    } catch (error) {
      console.error(error);
    }
  };

  const finalizarCompra = async () => {
    if (carrinho.length === 0 || !userId) return;
    
    try {
      // Bate no Java para transformar o carrinho atual em um Pedido (Order)
      const response = await fetch(`http://localhost:8081/orders/checkout/${userId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        if (response.status === 404) {
           throw new Error("A rota de checkout não foi encontrada no Java (Erro 404).");
        }
        throw new Error("Os espíritos do servidor negaram seu pedido (Erro 500).");
      }
      
      toast.success('✨ Magia realizada! Seu pedido foi conjurado.');
      
      // O Spring esvaziou o carrinho no banco ao criar o pedido.
      // Então chamamos carregarCarrinho para o Front-end ficar vazio também!
      await carregarCarrinho(); 
      
    } catch (error) {
      toast.error(`Falha no feitiço: ${error.message}`);
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
        limparCarrinho,
        finalizarCompra 
      }}>
      {children}
    </CartContext.Provider>
  );
}