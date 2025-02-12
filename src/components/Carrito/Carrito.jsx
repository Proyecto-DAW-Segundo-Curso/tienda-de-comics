import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import './Carrito.css';
import { useCart } from '../../CartContext/CartContext.js';

function Carrito() {
  const { cart, removeFromCart, checkout } = useCart();

  return (

<div className="custom-container d-flex justify-content-center align-items-center">
      <div className="d-flex justify-content-between align-items-center">
        <FiShoppingCart className="custom-cart" onClick={() => console.log(cart)} />
      </div>
      <div className="custom-cart-content">
        {cart.length > 0 ? (
          <div className="card p-3">
            <h4 className="mb-3">Productos en el carrito:</h4>
            <ul className="list-group">
              {cart.map((product) => (
                <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <img src={product.imagen} alt={product.titulo} className="img-fluid rounded product-img" />
                  <span>{product.titulo}</span>
                  <span><strong>{product.precio}€</strong></span>
                  <span className="badge bg-primary rounded-pill">Cantidad: {product.cantidad}</span>
                  <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(product.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
            <button className="btn btn-success mt-3" onClick={checkout}>Finalizar compra</button>
          </div>
        ) : (
          <p className="alert alert-warning mt-3">El carrito está vacío</p>
        )}
      </div>
    </div>
  );
}

export default Carrito;
