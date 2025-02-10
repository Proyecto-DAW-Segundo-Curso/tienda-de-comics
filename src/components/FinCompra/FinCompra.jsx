import React from 'react';
import './FinCompra.css';
import BotonComprarFin from '../BotonComprarFin/BotonComprarFin'
import BotonFinalizar from '../BotonFinalizar/BotonFinalizar'
import { useCart } from '../../CartContext/CartContext.js'; // Usar el contexto del carrito
import { useState } from 'react';


function FinCompra() {
  const [usuario, setUsuario] = useState('');
  const [comic, setComic] = useState([]);
  const [merchan, setMerchan] = useState([]);
  const [cantidad, setCantidad] = useState(0);
  
  
  const { cart, removeFromCart } = useCart(); 
   
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  async function manejarCompra(e) {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:3001/api/venta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, comic, merchan, cantidad }),
      });
    } catch{

    }
  }

  return (
    <div className='compra'>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            <img src={product.imagen} alt={product.titulo} width="50" />
            <span>{product.titulo}</span>
            <span><strong>{product.precio}€</strong></span>
            <button onClick={() => handleRemoveFromCart(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>    
      <BotonComprarFin></BotonComprarFin>
    </div>
  );
}

export default FinCompra;
