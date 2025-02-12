import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Agregar al carrito, sumando cantidad si ya existe
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCart, { ...product, cantidad: 1 }];
    });
  };

  // Reducir cantidad o eliminar si llega a 0
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(product =>
        product.id === productId ? { ...product, cantidad: product.cantidad - 1 } : product
      ).filter(product => product.cantidad > 0);
      return updatedCart;
    });
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Enviar la compra al servidor
  const checkout = async () => {
    try {
      const response = await fetch('/api/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
      });

      if (response.ok) {
        alert('Compra realizada con éxito');
        clearCart();
      } else {
        alert('Error al procesar la compra');
      }
    } catch (error) {
      alert('Error en la conexión con el servidor');
      console.error(error);
    }
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
