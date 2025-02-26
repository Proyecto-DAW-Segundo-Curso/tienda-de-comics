import React, { createContext, useState, useContext } from 'react';
import Swal from 'sweetalert2';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState(""); // Estado para el mensaje del modal

  // Verificar el stock antes de añadir al carrito
  const checkStock = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/comic/${productId}/stock`);
      if (!response.ok) throw new Error('Error al verificar el stock');
      const { stock } = await response.json();
      return stock;
    } catch (error) {
      return 0;
    }
  };

  const clearMessage = () => {
    setMessage(""); // Limpiar el mensaje
  };

  // Agregar al carrito, sumando cantidad si ya existe
  const addToCart = async (product) => {
    const stock = await checkStock(product.id);

    if (stock <= 0) {
      setMessage("⚠️ Stock no disponible"); // Establecer mensaje para el modal
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);

      if (existingProduct) {
        if (existingProduct.cantidad + 1 > stock) {
          return prevCart;
        }
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
    const token = localStorage.getItem('token'); // Agregar esta línea para obtener el token

    if (!token) {
      setMessage("No estás autenticado. Inicia sesión para continuar.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  // Asegúrate de que el token esté incluido aquí
        },
        body: JSON.stringify(cart),
      });

      if (response.ok) {
        setMessage("Compra realizada con éxito");
        clearCart();
      } else {
        setMessage("Para finalizar la compra, debes estar logueado");
      }
    } catch (error) {
      setMessage("Error en la conexión con el servidor");
    }
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    checkout,
    message,  // Proveer el mensaje para el modal
    setMessage, // Proveer función para actualizar el mensaje
    clearMessage // Proveer función para limpiar el mensaje
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
