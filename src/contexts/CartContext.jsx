import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Cria o canal de comunicação do carrinho
export const CartContext = createContext();

export function CartProvider({ children }) {
  // Inicializa o carrinho buscando do localStorage, assim não perde ao dar F5
  const [carrinho, setCarrinho] = useState(() => {
    const carrinhoSalvo = localStorage.getItem('magix_cart');
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  // Sempre que o carrinho mudar, salva no cofre do navegador
  useEffect(() => {
    localStorage.setItem('magix_cart', JSON.stringify(carrinho));
  }, [carrinho]);

  // Função para adicionar (ou somar quantidade se já existir)
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((carrinhoAtual) => {
      const itemJaExiste = carrinhoAtual.find((item) => item.id === produto.id);
      
      if (itemJaExiste) {
        // Se já tem, só aumenta a quantidade
        return carrinhoAtual.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      
      // Se não tem, adiciona com quantidade 1
      return [...carrinhoAtual, { ...produto, quantidade: 1 }];
    });
    toast.success(`"${produto.name}" foi adicionado ao seu caldeirão!`);
  };

  // Função para remover um item totalmente
  const removerDoCarrinho = (id) => {
    setCarrinho((carrinhoAtual) => carrinhoAtual.filter((item) => item.id !== id));
  };

  // Função para esvaziar tudo
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  return (
    <CartContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}>
      {children}
    </CartContext.Provider>
  );
}