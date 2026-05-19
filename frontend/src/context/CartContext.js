import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Charge le panier initial depuis le localStorage s'il existe
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('panier_gourmand');
    return localData ? JSON.parse(localData) : [];
  });

  // Sauvegarde le panier dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('panier_gourmand', JSON.stringify(cartItems));
  }, [cartItems]);

  // Ajouter au panier ou augmenter la quantité si déjà présent
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const exist = prevItems.find((item) => item.id === product.id);
      if (exist) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Modifier directement la quantité
  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + amount;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) // Supprime si la quantité tombe à 0
    );
  };

  // Supprimer un article
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Vider complètement le panier (utile après une commande)
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};