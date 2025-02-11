import React from 'react';
import PortadaComic from '../PortadaComic/PortadaComic';
import './FichaLibro.css';
import { useCart } from '../../CartContext/CartContext.js'; // Usar el contexto del carrito
import Boton from '../Boton/Boton.jsx';

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
      </div>
      <Boton onClick={handleAddToCart}>+ Añadir</Boton>
    </div>
  );
}

export default FichaLibro;
