import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import './Carrito.css';
import { useCart } from '../../CartContext/CartContext.js'; // Usar el contexto del carrito

function Carrito() {
  const { cart, removeFromCart } = useCart();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div className="contenedor-carrito">
      <FiShoppingCart className='carrito' onClick={() => console.log(cart)} />
      <div className="carrito-contenido">
        {cart.length > 0 ? (
          <div>
            <h3>Productos en el carrito:</h3>
            <ul>
              {cart.map((product) => (
                <li key={product.id}>
                  <img src={product.imagen} alt={product.titulo} width="50" />
                  <span>{product.titulo}</span>
                  <span>{product.precio}</span>
                  <button onClick={() => handleRemoveFromCart(product.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>El carrito está vacío</p>
        )}
      </div>
    </div>
  );
}

export default Carrito;
