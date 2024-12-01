import React from 'react'
import PortadaComic from '../PortadaComic/PortadaComic';
import './FichaLibro.css';

function FichaLibro({ comic }) {
  const { titulo, autor, editorial, genero, precio, stock, imagen } = comic;

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
    </div>
  );
}

export default FichaLibro