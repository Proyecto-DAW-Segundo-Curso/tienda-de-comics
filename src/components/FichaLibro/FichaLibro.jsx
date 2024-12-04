import React from 'react';
import PortadaComic from '../PortadaComic/PortadaComic';
import './FichaLibro.css';
import BotonComprar from '../BotonComprar/BotonComprar';
import { useCart } from '../../CartContext/CartContext.js'; // Usar el contexto del carrito

function FichaLibro({ comic }) {
  const { addToCart } = useCart();  // Acceder a la función para agregar al carrito

  const { titulo, autor, editorial, genero, precio, stock, imagen } = comic;

  const handleAddToCart = () => {
    addToCart(comic);  // Agregar el cómic al carrito
  };

  return (
    <div className="ficha-libro">
      <PortadaComic src={imagen} alt={titulo} />
      <div className="info-comic">
        <h3>{titulo}</h3>
        <p><strong>Autor:</strong> {autor}</p>
        <p><strong>Editorial:</strong> {editorial}</p>
        <p><strong>Género:</strong> {genero}</p>
        <p><strong>Precio:</strong> ${precio.toFixed(2)}</p>
        <p><strong>Stock:</strong> {stock}</p>
        <BotonComprar onClick={handleAddToCart} />
      </div>
    </div>
  );
}

export default FichaLibro;
