import React, { useEffect, useState } from 'react';
import { useCart } from '../../../CartContext/CartContext';
import './ResumenCarrito.css';
import Boton from '../../Boton/Boton';
import { useNavigate } from 'react-router-dom';

function ResumenCarrito() {
  const [usuario, setUsuario] = useState({});
  const { cart, removeFromCart, addToCart, checkout, message, clearMessage } = useCart();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const navigateLogin = () => {
    clearMessage();
    navigate('/login');
  };

  useEffect(() => {
    const obtenerUsuario = async () => {
      if (!token) return;

      try {
        const response = await fetch(`http://localhost:3001/api/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUsuario(data);
        } else {
          console.log("Error obteniendo el usuario");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    obtenerUsuario();
  }, [token]);

  const handleCheckout = async () => {
    clearMessage();
    await checkout();
  };

  return (
    <div className='custom-resumen-container'>
      <div>
        {cart.length > 0 ? (
          <div className="card p-3">
            <h4 className="mb-3">Resumen de tu carrito:</h4>
            <ul className="list-group">
              {cart.map((product) => (
                <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <img src={product.imagen} alt={product.titulo} className="img-fluid rounded product-img" />
                  <span>{product.titulo}</span>
                  <span><strong>{product.precio}€</strong></span>
                  {/* Botón "-" para reducir la cantidad */}
                  <button 
                    className="btn btn-outline-secondary btn-sm rounded-circle" 
                    onClick={() => removeFromCart(product.id)}
                    disabled={product.cantidad <= 1} // Desactiva si la cantidad es 1
                  >-</button>
                  <span className="badge bg-primary rounded-pill">{product.cantidad}</span>
                  {/* Botón "+" para aumentar la cantidad */}
                  <button 
                    className="btn btn-outline-secondary btn-sm rounded-circle" 
                    onClick={() => addToCart(product)}
                  >+</button>
                  <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(product.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
            <button className="btn btn-success mt-3" onClick={handleCheckout}>Finalizar compra</button>
            {message && <div className="alert alert-info mt-2 d-flex flex-row justify-content-around align-items-center">{message} <Boton onClick={navigateLogin}>Ir a login</Boton></div>}
          </div>
        ) : (
          <p className="alert alert-warning mt-3">El carrito está vacío</p>
        )}
      </div>
    </div>
  );
}

export default ResumenCarrito;
